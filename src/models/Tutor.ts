import { IPet } from "./interfaces/IPet";
import { ITutor } from "./interfaces/ITutor";
export class Tutor implements ITutor {
    constructor(
        public id: number,
        public name: string,
        public phone: string,
        public email: string,
        public date_of_birth: string,
        public zip_code: string,
        public pets: IPet[]
    ) {}
}
