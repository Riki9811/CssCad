export class Vector2 {
	private x: number = 0;
	private y: number = 0;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public reset(): void {
		this.x = 0;
		this.y = 0;
	}

	/**
	 * Turns the vector to a string
	 * @returns String representing the vector
	 */
	public toString(): string {
		return `(${this.x.toFixed(3)}, ${this.y.toFixed(3)})`;
	}

	static Random(): Vector2 {
		return new Vector2(Math.random(), Math.random());
	}

	static UP(): Vector2 {
		return new Vector2(0, 1);
	}
	static DOWN(): Vector2 {
		return new Vector2(0, -1);
	}
	static LEFT(): Vector2 {
		return new Vector2(-1, 0);
	}
	static RIGHT(): Vector2 {
		return new Vector2(1, 0);
	}
}

export class Vector3 {
	private x: number = 0;
	private y: number = 0;
	private z: number = 0;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public reset(): void {
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}

	/**
	 * Turns the vector to a string
	 * @returns String representing the vector
	 */
	public toString(): string {
		return `(${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)})`;
	}

	static Random(): Vector3 {
		return new Vector3(Math.random(), Math.random(), Math.random());
	}

	static UP(): Vector3 {
		return new Vector3(0, 1, 0);
	}
	static DOWN(): Vector3 {
		return new Vector3(0, -1, 0);
	}
	static LEFT(): Vector3 {
		return new Vector3(-1, 0, 0);
	}
	static RIGHT(): Vector3 {
		return new Vector3(1, 0, 0);
	}
	static FRONT(): Vector3 {
		return new Vector3(0, 0, 1);
	}
	static BACK(): Vector3 {
		return new Vector3(0, 0, -1);
	}
}
