import {Entity} from "./Entity.ts";

export class ProgrammingLanguage extends Entity {

    constructor(name: string) {
        super(name, name);
    }
}