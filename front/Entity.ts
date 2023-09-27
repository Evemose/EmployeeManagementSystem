export class Entity {
    protected _name: string;

    private _id: number | string;


    get id(): number | string {
        return this._id;
    }


    protected constructor(id: number | string, name: string) {
        this._id = id;
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}