import {Entity} from "../Entity.ts";

class Department extends Entity {
    constructor(id: number, name: string, floor: number) {
        super(id, name);
        this._floor = floor;
    }

    protected _floor: number;

    get floor(): number {
        return this._floor;
    }

    set floor(value: number) {
        this._floor = value;
    }
}

class DepartmentPreview extends Department {

    private _employeesCount: number;

    private _keywords: string[];

    constructor(id: number, name: string, floor: number, employeesCount: number, keywords: string[]) {
        super(id, name, floor);
        this._employeesCount = employeesCount;
        this._keywords = keywords;
    }


    get employeesCount(): number {
        return this._employeesCount;
    }

    set employeesCount(value: number) {
        this._employeesCount = value;
    }

    get keywords(): string[] {
        return this._keywords;
    }

    set keywords(value: string[]) {
        this._keywords = value;
    }
}

export default Department;