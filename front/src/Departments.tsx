class Department {
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
    constructor(id: number, name: string, floor: number) {
        this._id = id;
        this._name = name;
        this._floor = floor;
    }

    private _name: string;

    private _id: number;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private _floor: number;

    get floor(): number {
        return this._floor;
    }

    set floor(value: number) {
        this._floor = value;
    }
}

export default Department;