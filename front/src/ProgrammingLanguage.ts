export class ProgrammingLanguage {
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
    private _name: string;


    constructor(name: string) {
        this._name = name;
    }
}