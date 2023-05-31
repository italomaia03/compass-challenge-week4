import { IPet } from "./interfaces/IPet";

class Pet implements IPet {
    constructor(
        public id: number,
        public name: string,
        public species: string,
        public carry: symbol,
        public weight: number,
        public date_of_birth: string
    ) {}
}
