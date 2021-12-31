import { Color } from "./Colors";
import { Vector3 } from "./Vectors";

export interface SceneObjectInterface {
	name: string;
	position: Vector3;
	rotation: Vector3;
	color: Color;
	children: Array<SceneObject>;

	isLeaf: () => boolean;
	hasChildren: () => boolean;
	getChildrenCount: () => number;
	getSubTreeCount: () => number;
	getNames: () => string[];
	copyWithoutChildren: () => SceneObject;
}

export class SceneObject implements SceneObjectInterface {
	name: string;
	position: Vector3;
	rotation: Vector3;
	color: Color;
	children: Array<SceneObject>;

	constructor(name: string, position: Vector3, rotation: Vector3, color: Color, children?: Array<SceneObject>) {
		this.name = name;
		this.position = position;
		this.rotation = rotation;
		this.color = color;
		this.children = children ? children : [];
	}

	public isLeaf(): boolean {
		return this.children.length > 0;
	}

	public hasChildren(): boolean {
		return !this.isLeaf();
	}

	public getChildrenCount(): number {
		return this.children.length;
	}

	public getSubTreeCount(): number {
		let tot = this.getChildrenCount();
		this.children.forEach((child) => {
			tot += child.getSubTreeCount();
		});
		return tot;
	}

	public getNames(): string[] {
		let names = [this.name];
		for (const child of this.children) {
			names = names.concat(child.getNames());
		}
		return names;
	}

	public copyWithoutChildren(): SceneObject {
		return new SceneObject(
			this.name,
			this.position,
			this.rotation,
			this.color,
			[]
		);
	}
}

export class SceneObject2D extends SceneObject {
	width: number;
	height: number;

	constructor(
		name: string,
		position: Vector3,
		rotation: Vector3,
		color: Color,
		width: number,
		height: number,
		children?: Array<SceneObject>
	) {
		super(name, position, rotation, color, children);
		this.width = width;
		this.height = height;
	}

	public copyWithoutChildren(): SceneObject2D {
		return new SceneObject2D(
			this.name,
			this.position,
			this.rotation,
			this.color,
			this.width,
			this.height,
			[]
		);
	}
}

export class SceneObject3D extends SceneObject {
	width: number;
	height: number;
	depth: number;

	constructor(
		name: string,
		position: Vector3,
		rotation: Vector3,
		color: Color,
		width: number,
		height: number,
		depth: number,
		children?: Array<SceneObject>
	) {
		super(name, position, rotation, color, children);
		this.width = width;
		this.height = height;
		this.depth = depth;
	}

	public copyWithoutChildren(): SceneObject3D {
		return new SceneObject3D(
			this.name,
			this.position,
			this.rotation,
			this.color,
			this.width,
			this.height,
			this.depth,
			[],
		);
	}
}

export class ObjectTree {
	private root: SceneObject;

	constructor() {
		this.root = new SceneObject("root", Vector3.ZERO(), Vector3.ZERO(), Color.FromHex("#000"), []);
	}

    /**
     * Iterator over tree nodes (depth-first)
     * @param node Current object in iteration
     */
	*preOrderTraversal(node: SceneObject = this.root): IterableIterator<SceneObject> {
		yield node;
		if (node.children.length) {
			for (let child of node.children) {
				yield* this.preOrderTraversal(child);
			}
		}
	}

    //#region GETTERS
    /**
     * Returns the number of tree nodes
     * @returns Number of objects in the tree
     */
    public getObjectCount(): number {
        return this.root.getSubTreeCount();
    }
    /**
     * List of the objects in the top level (direct children of root)
     * (Used by the actual renderers)
     * @returns List of all objects in the top level
     */
	public getObjectList(): Array<SceneObject> {
		return this.root.children;
	}
    //#endregion

    //#region TREE-DATA-CONTROL
    /**
     * Checks if a node name is already used. If it used returns a modified version
     * tha is not in use to avoid duplicates. The new name has format objName_N.
     * @param objName Name of the object to check
     * @returns The new name modified to avid duplicates
     */
    public preventNameDuplicates(objName: string): string {
		let names = this.root.getNames();
		let newName = objName;
		let iteration = 1;
		while (names.includes(newName)) {
			newName = `${objName}_${iteration++}`;
		}
		return newName;
	}
    /**
     * Serches the tree to find the node named 'name'
     * @param name Name of the node to serch
     * @returns The node named 'name' if exists, undefined otherwise
     */
    public find(name: string): SceneObject | undefined {
		for (let obj of this.preOrderTraversal()) {
			if (obj.name === name) return obj;
		}
		return undefined;
	}
    //#endregion

    //#region TREE-MODIFICATION
    /**
     * Inserts obj into the tree as child of the node named parentName
     * If no parentName is given the object is inserted as child of root
     * @param obj Object to insert
     * @param parentName Name of the parent of the new object
     * @returns Wether the operation was succesfull
     */
	public insert(obj: SceneObject, parentName?: string): boolean {
		if (parentName === undefined) {
			// Prevent name duplicates before insertion
			obj.name = this.preventNameDuplicates(obj.name);
			this.root.children.push(obj);
			return true;
		} else {
			for (let node of this.preOrderTraversal()) {
				if (node.name === parentName) {
					// Prevent name duplicates before insertion
					obj.name = this.preventNameDuplicates(obj.name);
					node.children.push(obj);
					return true;
				}
			}
		}
		return false;
	}
    /**
     * Removes the node named 'name' from the tree (if there is one)
     * @param name Name of the node to be removed
     * @returns Wether the operation was succesfull
     */
	public remove(name: string): boolean {
		for (let obj of this.preOrderTraversal()) {
			const filtered = obj.children.filter((c) => c.name !== name);
			if (filtered.length !== obj.children.length) {
				obj.children = filtered;
				return true;
			}
		}
		return false;
	}
    /**
     * Moves an object already in the tree into the children of node named 'parendName'
     * (Actually removes the objects and re-inserts it into parentName's children)
     * @param objToMove Object to move (alreasy in the tree)
     * @param parentName Name of the node where to move obj into
     */
	public moveInto(objToMove: SceneObject, parentName: string) {
		this.remove(objToMove.name);
		this.insert(objToMove, parentName);
	}
    //#endregion

    //#region TREE-DUPLICATION
    /**
     * Iterator over couples: tree node, parent
     * @param node Current Object
     * @param parent Parent of current Object
     */
    private *iterateWithParent(
		node: SceneObject = this.root,
		parent?: SceneObject
	): IterableIterator<{ node: SceneObject; parent: SceneObject | undefined }> {
		yield { node, parent };
		if (node.children.length) {
			for (let child of node.children) {
				yield* this.iterateWithParent(child, node);
			}
		}
	}
    /**
     * Insert a copy of obj (without children) in the correct position
     * (as child of node named parentName or as child of root)
     * @param obj Object to copy and insert
     * @param parentName Name of the node where to insert obj
     * @returns Wether the operation was succesfull
     */
    private insertCopy(obj: SceneObject, parentName?: string) {
		if (parentName === undefined) {
			this.root.children.push(obj.copyWithoutChildren());
			return true;
		} else {
			for (let node of this.preOrderTraversal()) {
				if (node.name === parentName) {
					node.children.push(obj.copyWithoutChildren());
					return true;
				}
			}
		}
		return false;
	}
    /**
     * Creates a deep copy of the tree (used by the useObjectReducer custom hook)
     * @returns A deep copy of the tree
     */
	public copy(): ObjectTree {
		let newTree = new ObjectTree();
        for (const {node, parent} of this.iterateWithParent(this.root)) {
            if (parent && !newTree.insertCopy(node, parent.name)) {
                throw new Error(`Copy error: culd not add copy of node ${node.name} with parent ${parent?.name}`);
            }
        }
		return newTree;
	}
    //#endregion
}
