export class JunctionBox {
    x: number
    y: number
    z: number
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    distanceFrom(box: JunctionBox) {
        return Math.sqrt(Math.pow(this.x - box.x, 2) + Math.pow(this.y - box.y, 2) + Math.pow(this.z - box.z, 2))
    }

    toString() {
        return `(${this.x},${this.y},${this.z})`
    }
}