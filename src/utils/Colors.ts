export class Color {
	/**
	 * Channels of the color (all in range 0 - 255)
	 */
	private r: number = 0;
	private g: number = 0;
	private b: number = 0;
	private a: number = 0;

	/**
	 * Creates a black color
	 */
	public constructor();
	/**
	 * Creates a grayscale color based on the value given
	 * @param value Value of grayscale (float 0 - 1 or integer 0 - 255)
	 */
	public constructor(value: number);
	/**
	 * Creates a grayscale color based on the value given with given transparency
	 * @param value Value of grayscale (float 0 - 1 or integer 0 - 255)
	 * @param alpha Alpha channel      (float 0 - 1 or integer 0 - 255)
	 */
	public constructor(value: number, alpha: number);
	/**
	 * Creates the color based on the given RGB values with given transparency
	 * @param r Red channel   (float 0 - 1 or integer 0 - 255)
	 * @param g Green channel (float 0 - 1 or integer 0 - 255)
	 * @param b Blue channel  (float 0 - 1 or integer 0 - 255)
	 */
	public constructor(r: number, g: number, b: number);
	/**
	 * Creates the color based on the given RGB values with given transparency
	 * @param r Red channel   (float 0 - 1 or integer 0 - 255)
	 * @param g Green channel (float 0 - 1 or integer 0 - 255)
	 * @param b Blue channel  (float 0 - 1 or integer 0 - 255)
	 * @param a Alpha channel (float 0 - 1 or integer 0 - 255)
	 */
	public constructor(r: number, g: number, b: number, a: number);

	constructor(...values: number[]) {
		// If there is a negative value throw error
		if (values.some((val: number) => val < 0)) throw new Error("All channels must be positive numbers.");
		// If there is a value greater than 255 throw error
		if (values.some((val: number) => val > 255)) throw new Error("No channels can be greater than 255.");

		let allInt: boolean = values.every((val: number) => Number.isInteger(val));
		let allFloat: boolean = values.every((val: number) => !Number.isInteger(val));

		// Values must be all float or all integer
		if (!(allInt || allFloat)) throw new Error("Channels must be either all integer or all floats.");

		// Execute correct code
		if (allInt) {
			switch (values.length) {
				case 0:
					this.r = 0;
					this.g = 0;
					this.b = 0;
					this.a = 0;
					break;
				case 1:
					this.r = values[0];
					this.g = values[0];
					this.b = values[0];
					this.a = 255;
					break;
				case 2:
					this.r = values[0];
					this.g = values[0];
					this.b = values[0];
					this.a = values[1];
					break;
				case 3:
					this.r = values[0];
					this.g = values[1];
					this.b = values[2];
					this.a = 255;
					break;
				case 4:
					this.r = values[0];
					this.g = values[1];
					this.b = values[2];
					this.a = values[3];
					break;
				default:
					throw new Error("Unexpected number of values, max 4.");
			}
		} else {
			switch (values.length) {
				case 0:
					this.r = 0;
					this.g = 0;
					this.b = 0;
					this.a = 0;
					break;
				case 1:
					this.r = Math.round(values[0] * 255);
					this.g = Math.round(values[0] * 255);
					this.b = Math.round(values[0] * 255);
					this.a = 255;
					break;
				case 2:
					this.r = Math.round(values[0] * 255);
					this.g = Math.round(values[0] * 255);
					this.b = Math.round(values[0] * 255);
					this.a = Math.round(values[1] * 255);
					break;
				case 3:
					this.r = Math.round(values[0] * 255);
					this.g = Math.round(values[1] * 255);
					this.b = Math.round(values[2] * 255);
					this.a = 255;
					break;
				case 4:
					this.r = Math.round(values[0] * 255);
					this.g = Math.round(values[1] * 255);
					this.b = Math.round(values[2] * 255);
					this.a = Math.round(values[3] * 255);
					break;
				default:
					throw new Error("Unexpected number of values, max 4.");
			}
		}
	}

	//#region FROM
	/**
	 * Creates and returns an instance of Color based on the Hex input
	 * The input string must be 4 or 7 caracters long and must start with '#'
	 * @param hex Hex string
	 * @returns Color instance
	 */
	static FromHex(hex: string): Color {
		if (!hex.startsWith("#")) throw new Error("Hex input not recognised (must start with #)");

		let r = 0,
			g = 0,
			b = 0;

		if (hex.length === 4) {
			r = Number("0x" + hex[1] + hex[1]);
			g = Number("0x" + hex[2] + hex[2]);
			b = Number("0x" + hex[3] + hex[3]);
		} else if (hex.length === 7) {
			r = Number("0x" + hex[1] + hex[2]);
			g = Number("0x" + hex[3] + hex[4]);
			b = Number("0x" + hex[5] + hex[6]);
		} else {
			throw new Error("Hex input not recognised (must be 4 or 7 chars long)");
		}

		return new Color(r, g, b);
	}
	/**
	 * Creates and returns an instance of Color based on the Hex with alpha input
	 * The input string must be 5 or 9 caracters long and must start with '#'
	 * @param hex Hex string (with alpha)
	 * @returns Color instance
	 */
	static FromHexA(hex: string): Color {
		if (!hex.startsWith("#")) throw new Error("Hex input not recognised (must start with #)");

		let r = 0,
			g = 0,
			b = 0,
			a = 0;

		if (hex.length === 5) {
			r = Number("0x" + hex[1] + hex[1]);
			g = Number("0x" + hex[2] + hex[2]);
			b = Number("0x" + hex[3] + hex[3]);
			a = Number("0x" + hex[4] + hex[4]);
		} else if (hex.length === 9) {
			r = Number("0x" + hex[1] + hex[2]);
			g = Number("0x" + hex[3] + hex[4]);
			b = Number("0x" + hex[5] + hex[6]);
			a = Number("0x" + hex[7] + hex[8]);
		} else {
			throw new Error("Hex input not recognised (must be 5 or 9 chars long)");
		}

		return new Color(r, g, b, a);
	}
	/**
	 * Creates and returns an instance of Color based on the HSL input
	 * @param h Hue value        (0 to 360)
	 * @param s Saturation value (0 to 100)
	 * @param l Lightness value  (0 to 100)
	 * @returns Color instance
	 */
	static FromHsl(h: number, s: number, l: number): Color {
		// Must be fractions of 1
		s /= 100;
		l /= 100;

		let c = (1 - Math.abs(2 * l - 1)) * s,
			x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
			m = l - c / 2,
			r = 0,
			g = 0,
			b = 0;

		if (0 <= h && h < 60) {
			r = c;
			g = x;
		} else if (60 <= h && h < 120) {
			r = x;
			g = c;
		} else if (120 <= h && h < 180) {
			g = c;
			b = x;
		} else if (180 <= h && h < 240) {
			g = x;
			b = c;
		} else if (240 <= h && h < 300) {
			r = x;
			b = c;
		} else if (300 <= h && h < 360) {
			r = c;
			b = x;
		}
		r = Math.round((r + m) * 255);
		g = Math.round((g + m) * 255);
		b = Math.round((b + m) * 255);

		return new Color(r, g, b);
	}
	/**
	 * Creates and returns an instance of Color based on the HSLA input
	 * @param h Hue value        (0 to 360)
	 * @param s Saturation value (0 to 100)
	 * @param l Lightness value  (0 to 100)
	 * @param a Alpha value      (0 to 1)
	 * @returns Color instance
	 */
	static FromHsla(h: number, s: number, l: number, a: number): Color {
		let c: Color = this.FromHsl(h, s, l);
		c.a = Math.round(a * 255);
		return c;
	}
	//#endregion

	//#region TO
	/**
	 * Returns the color in rgb space represented with integers
	 * @returns [r (0-255), g (0-255), b (0-255)]
	 */
	toRgb255(): number[] {
		return [this.r, this.g, this.b];
	}
	/**
	 * Returns the color in rgb space represented with integers
	 * @returns [r (0-255), g (0-255), b (0-255), a (0-255)]
	 */
	toRgba255(): number[] {
		return [this.r, this.g, this.b, this.a];
	}
	/**
	 * Returns the color in rgb space represented with floating point numbers
	 * @returns [r (0-1), g (0-1), b (0-1)]
	 */
	toRgb(): number[] {
		return [this.r / 255, this.g / 255, this.b / 255];
	}
	/**
	 * Returns the color in rgb space represented with floating point numbers
	 * @returns [r (0-1), g (0-1), b (0-1), a (0-1)]
	 */
	toRgba(): number[] {
		return [this.r / 255, this.g / 255, this.b / 255, this.a / 255];
	}
	/**
	 * Returns the color in hex
	 * @returns hex string starting with #
	 */
	toHex(): string {
		let r2 = this.r.toString(16);
		let g2 = this.g.toString(16);
		let b2 = this.b.toString(16);

		if (r2.length === 1) r2 = "0" + r2;
		if (g2.length === 1) g2 = "0" + g2;
		if (b2.length === 1) b2 = "0" + b2;

		return "#" + r2 + g2 + b2;
	}
	/**
	 * Returns the color in hex with alpha channel
	 * @returns hex string starting with #
	 */
	toHexA(): string {
		let r2 = this.r.toString(16);
		let g2 = this.g.toString(16);
		let b2 = this.b.toString(16);
		let a2 = this.a.toString(16);

		if (r2.length === 1) r2 = "0" + r2;
		if (g2.length === 1) g2 = "0" + g2;
		if (b2.length === 1) b2 = "0" + b2;
		if (a2.length === 1) a2 = "0" + a2;

		return "#" + r2 + g2 + b2 + a2;
	}
	/**
	 * Returns the color in hsl space
	 * @returns [h (0-360), s (0-100), l (0-100)]
	 */
	toHsl(): number[] {
		// Make r, g, and b fractions of 1
		let r = this.r / 255;
		let g = this.g / 255;
		let b = this.b / 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		// Calculate hue
		// If there is no difference leave h = 0
		if (delta !== 0) {
			// Red is max
			if (cmax === r) h = ((g - b) / delta) % 6;
			// Green is max
			else if (cmax === g) h = (b - r) / delta + 2;
			// Blue is max
			else h = (r - g) / delta + 4;
		}

		h = Math.round(h * 60);

		// Make negative hues positive behind 360°
		if (h < 0) h += 360;

		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Calculate saturation
		s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		return [h, s, l];
	}
	/**
	 * Returns the color in hsl space with alpha channel
	 * @returns [h (0-360), s (0-100), l (0-100), a (0-1)]
	 */
	toHsla(): number[] {
		return [...this.toHsl(), this.a / 255];
	}
	//#endregion

	//#region GETTERS
	/**
	 * Returns the red channel of the color
	 * @returns The R value (range 0 to 1)
	 */
	getR(): number {
		return this.r / 255;
	}
	/**
	 * Returns the green channel of the color
	 * @returns The G value (range 0 to 1)
	 */
	getG(): number {
		return this.g / 255;
	}
	/**
	 * Returns the blue channel of the color
	 * @returns The B value (range 0 to 1)
	 */
	getB(): number {
		return this.b / 255;
	}
	/**
	 * Returns the alpha channel of the color
	 * @returns The A value (range 0 to 1)
	 */
	getA(): number {
		return this.a / 255;
	}
	/**
	 * Returns the red channel of the color
	 * @returns The R value (range 0 to 255)
	 */
	getR255(): number {
		return this.r;
	}
	/**
	 * Returns the green channel of the color
	 * @returns The G value (range 0 to 255)
	 */
	getG255(): number {
		return this.g;
	}
	/**
	 * Returns the blue channel of the color
	 * @returns The B value (range 0 to 255)
	 */
	getB255(): number {
		return this.b;
	}
	/**
	 * Returns the alpha channel of the color
	 * @returns The A value (range 0 to 255)
	 */
	getA255(): number {
		return this.a;
	}
	/**
	 * Returns the hue of the color
	 * @returns The H value
	 */
	getH(): number {
		// Make r, g, and b fractions of 1
		let r = this.r / 255;
		let g = this.g / 255;
		let b = this.b / 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0;
		// Calculate hue
		// If there is no difference leave h = 0
		if (delta !== 0) {
			// Red is max
			if (cmax === r) h = ((g - b) / delta) % 6;
			// Green is max
			else if (cmax === g) h = (b - r) / delta + 2;
			// Blue is max
			else h = (r - g) / delta + 4;
		}

		h = Math.round(h * 60);

		// Make negative hues positive behind 360°
		if (h < 0) h += 360;

		return h;
	}
	/**
	 * Returns the saturation of the color
	 * @returns The S value
	 */
	getS(): number {
		// Make r, g, and b fractions of 1
		let r = this.r / 255;
		let g = this.g / 255;
		let b = this.b / 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			s = 0,
			l = 0;

		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Calculate saturation
		s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Multiply s by 100
		s = +(s * 100).toFixed(1);

		return s;
	}
	/**
	 * Returns the lightness of the color
	 * @returns The L value
	 */
	getL(): number {
		// Make r, g, and b fractions of 1
		let r = this.r / 255;
		let g = this.g / 255;
		let b = this.b / 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			l = 0;

		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Multiply l and s by 100
		l = +(l * 100).toFixed(1);

		return l;
	}
	/**
	 * Calculates the relative luminance of the color (https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef)
	 * @returns Relative luminance of the color
	 */
	getRelativeLuminance(): number {
		let RsRGB = this.getR();
		let GsRGB = this.getG();
		let BsRGB = this.getB();

		let R;
		let G;
		let B;

		if (RsRGB <= 0.03928) R = RsRGB / 12.92;
		else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);

		if (GsRGB <= 0.03928) G = GsRGB / 12.92;
		else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);

		if (BsRGB <= 0.03928) B = BsRGB / 12.92;
		else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);

		return 0.2126 * R + 0.7152 * G + 0.0722 * B;
	}
	//#endregion

	//#region SETTERS
	/**
	 * Sets the value of the red channel
	 * @param r new Red value (o to 1)
	 */
	setR(r: number) {
		Color.checkRange0to1(r);
		this.r = Math.round(r * 255);
	}
	/**
	 * Sets the value of the green channel
	 * @param g new Green value (o to 1)
	 */
	setG(g: number) {
		Color.checkRange0to1(g);
		this.g = Math.round(g * 255);
	}
	/**
	 * Sets the value of the blue channel
	 * @param b new Blue value (o to 1)
	 */
	setB(b: number) {
		Color.checkRange0to1(b);
		this.b = Math.round(b * 255);
	}
	/**
	 * Sets the value of the alpha channel
	 * @param a new Alpha value (o to 1)
	 */
	setA(a: number) {
		Color.checkRange0to1(a);
		this.a = Math.round(a * 255);
	}
	/**
	 * Sets the value of the red channel
	 * @param r new Red value (o to 255)
	 */
	setR255(r: number) {
		Color.checkRange0to255(r);
		this.r = r;
	}
	/**
	 * Sets the value of the green channel
	 * @param g new Green value (o to 255)
	 */
	setG255(g: number) {
		Color.checkRange0to255(g);
		this.g = g;
	}
	/**
	 * Sets the value of the blue channel
	 * @param b new Blue value (o to 255)
	 */
	setB255(b: number) {
		Color.checkRange0to255(b);
		this.b = b;
	}
	/**
	 * Sets the value of the alpha channel
	 * @param a new Alpha value (o to 255)
	 */
	setA255(a: number) {
		Color.checkRange0to255(a);
		this.a = a;
	}
	/**
	 * Sets the color to the input hex string
	 * This operation actually overrides all the color channels except for alpha
	 * @param hex new Hex value
	 */
	setHex(hex: string) {
		let newRGB = Color.FromHex(hex).toRgb255();
		this.setR255(newRGB[0]);
		this.setG255(newRGB[1]);
		this.setB255(newRGB[2]);
	}
	/**
	 * Sets the color to the input hex string (with alpha value)
	 * This operation actually overrides all the color channels
	 * @param hexa new Hex value (eith alpha)
	 */
	setHexA(hexa: string) {
		let newRGBA = Color.FromHexA(hexa).toRgba255();
		this.setR255(newRGBA[0]);
		this.setG255(newRGBA[1]);
		this.setB255(newRGBA[2]);
		this.setA255(newRGBA[3]);
	}
	/**
	 * Sets the value of the hue channel
	 * @param h new Hue value (o to 360)
	 */
	setH(h: number) {
		Color.checkRange0to360(h);
		this.setHslVal(h, 0);
	}
	/**
	 * Sets the value of the saturation channel
	 * @param h new Saturation value (o to 100)
	 */
	setS(s: number) {
		Color.checkRange0to100(s);
		this.setHslVal(s, 1);
	}
	/**
	 * Sets the value of the lightness channel
	 * @param h new Lightness value (o to 100)
	 */
	setL(l: number) {
		Color.checkRange0to100(l);
		this.setHslVal(l, 2);
	}
	//#endregion

	//#region INCREASERS
	/**
	 * Increases the value of the red channel by deltaR
	 * @param deltaR value to increase by (can be negative to decrease)
	 */
	increaseR(deltaR: number) {
		let newR = Color.clampToRange0to1(this.getR() + deltaR);
		this.setR(newR);
	}
	/**
	 * Increases the value of the green channel by deltaG
	 * @param deltaG value to increase by (can be negative to decrease)
	 */
	increaseG(deltaG: number) {
		let newG = Color.clampToRange0to1(this.getG() + deltaG);
		this.setG(newG);
	}
	/**
	 * Increases the value of the blue channel by deltaB
	 * @param deltaB value to increase by (can be negative to decrease)
	 */
	increaseB(deltaB: number) {
		let newB = Color.clampToRange0to1(this.getB() + deltaB);
		this.setB(newB);
	}
	/**
	 * Increases the value of the alpha channel by deltaA
	 * @param deltaA value to increase by (can be negative to decrease)
	 */
	increaseA(deltaA: number) {
		let newA = Color.clampToRange0to1(this.getA() + deltaA);
		this.setA(newA);
	}
	/**
	 * Increases the value of the red channel by deltaR255
	 * @param deltaR255 value to increase by (can be negative to decrease)
	 */
	increaseR255(deltaR255: number) {
		let newR255 = Color.clampToRange0to255(this.getR255() + deltaR255);
		this.setR255(newR255);
	}
	/**
	 * Increases the value of the green channel by deltaG255
	 * @param deltaG255 value to increase by (can be negative to decrease)
	 */
	increaseG255(deltaG255: number) {
		let newG255 = Color.clampToRange0to255(this.getG255() + deltaG255);
		this.setG255(newG255);
	}
	/**
	 * Increases the value of the blue channel by deltaB255
	 * @param deltaB255 value to increase by (can be negative to decrease)
	 */
	increaseB255(deltaB255: number) {
		let newB255 = Color.clampToRange0to255(this.getB255() + deltaB255);
		this.setB255(newB255);
	}
	/**
	 * Increases the value of the alpha channel by deltaA255
	 * @param deltaA255 value to increase by (can be negative to decrease)
	 */
	increaseA255(deltaA255: number) {
		let newA255 = Color.clampToRange0to255(this.getA255() + deltaA255);
		this.setA255(newA255);
	}
	/**
	 * Increases the value of the hue channel by deltaH
	 * @param deltaH value to increase by (can be negative to decrease)
	 */
	increaseH(deltaH: number) {
		let newH = Color.clampToRange0to360(this.getH() + deltaH);
		this.setH(newH);
	}
	/**
	 * Increases the value of the saturation channel by deltaS
	 * @param deltaS value to increase by (can be negative to decrease)
	 */
	increaseS(deltaS: number) {
		let newS = Color.clampToRange0to100(this.getS() + deltaS);
		this.setS(newS);
	}
	/**
	 * Increases the value of the lightness channel by deltaL
	 * @param deltaL value to increase by (can be negative to decrease)
	 */
	increaseL(deltaL: number) {
		let newL = Color.clampToRange0to100(this.getL() + deltaL);
		this.setL(newL);
	}
	//#endregion

	//#region PRIVATE-UTILS
	/**
	 * Utility function to check range 0 to 1 of input (throws error if out of range)
	 * @param n Number to check
	 */
	private static checkRange0to1(n: number) {
		if (n < 0 || n > 1) throw new Error("Input must be in range 0 to 1");
	}
	/**
	 * Utility function to check range 0 to 255 of input (throws error if out of range)
	 * @param n Number to check
	 */
	private static checkRange0to255(n: number) {
		if (n < 0 || n > 255) throw new Error("Input must be in range 0 to 255");
	}
	/**
	 * Utility function to check range 0 to 100 of input (throws error if out of range)
	 * @param n Number to check
	 */
	private static checkRange0to100(n: number) {
		if (n < 0 || n > 100) throw new Error("Input must be in range 0 to 100");
	}
	/**
	 * Utility function to check range 0 to 360 of input (throws error if out of range)
	 * @param n Number to check
	 */
	private static checkRange0to360(n: number) {
		if (n < 0 || n > 360) throw new Error("Input must be in range 0 to 360");
	}
	/**
	 * Utility function to clamp input in range 0 to 1
	 * @param n Number to clamp
	 * @returns new n clamped in range 0 to 1
	 */
	private static clampToRange0to1(n: number): number {
		return Math.min(Math.max(n, 0), 1);
	}
	/**
	 * Utility function to clamp input in range 0 to 255
	 * @param n Number to clamp
	 * @returns new n clamped in range 0 to 255
	 */
	private static clampToRange0to255(n: number): number {
		return Math.min(Math.max(n, 0), 255);
	}
	/**
	 * Utility function to clamp input in range 0 to 100
	 * @param n Number to clamp
	 * @returns new n clamped in range 0 to 100
	 */
	private static clampToRange0to100(n: number): number {
		return Math.min(Math.max(n, 0), 100);
	}
	/**
	 * Utility function to clamp input in range 0 to 360
	 * @param n Number to clamp
	 * @returns new n clamped in range 0 to 360
	 */
	private static clampToRange0to360(n: number): number {
		return Math.min(Math.max(n, 0), 360);
	}
	/**
	 * Utility function to set one of the HSL channels
	 * @param val Value to set
	 * @param valIndex 0 = H, 1 = S, 2 = L
	 */
	private setHslVal(val: number, valIndex: number) {
		let hsl = this.toHsl();
		hsl[valIndex] = val;
		let newRGB = Color.FromHsla(hsl[0], hsl[1], hsl[2], hsl[3]).toRgb255();
		this.setR255(newRGB[0]);
		this.setG255(newRGB[1]);
		this.setB255(newRGB[2]);
	}
	//#endregion

	//#region PUBLIC-UTILS
	/**
	 * Checks wether it's better to use white or black text
	 * to write on top of this color. Then returns the best option.
	 * @returns Either black or white color
	 */
	public toContrastingBlackWhite(): Color {
		let myLum = this.getRelativeLuminance();

		let blackContrast = (myLum + 0.05) / 0.05;
		let whiteContrast = (1 + 0.05) / (myLum + 0.05);

		if (blackContrast > whiteContrast) return new Color(0);
		else return new Color(255);
	}
	/**
	 * Calculates the contrast ratio between this
     * color and the one given in input.
	 * @returns Contrast ratio
	 */
	public contrastRatio(color: Color): number {
        let thisLum = this.getRelativeLuminance();
        let colorLum = color.getRelativeLuminance();

        if (colorLum < thisLum) return (thisLum + 0.05) / (colorLum + 0.05);
        return (colorLum + 0.05) / (thisLum + 0.05);
	}
	/**
	 * Creates and returns the inverse of the color
	 * @returns Inverted color
	 */
	public toInverted(): Color {
		return new Color(255 - this.r, 255 - this.g, 255 - this.b, this.a);
	}
	/**
	 * Turns the color to a string
	 * @returns String representing color
	 */
	public toString(): string {
		if (this.a === 255) {
			return `rgb(${this.r}, ${this.g}, ${this.b})`;
		}
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
	}
	/**
	 * Generates random color (with alpha 255)
	 * @returns Random color
	 */
	static Random(): Color {
		return new Color(Math.random(), Math.random(), Math.random());
	}
	//#endregion
}
