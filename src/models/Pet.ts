import { IPet } from "./interfaces/IPet";

export class Pet implements IPet {
    constructor(
        public id: number,
        public name: string,
        public species: string,
        public carry: string,
        public weight: number,
        public date_of_birth: string
    ) {}
}
