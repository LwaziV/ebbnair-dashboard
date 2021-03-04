import { ModificationNote } from "./model";

export interface IOrganization {
    _id?: String;
    first_name: String;
    last_name: String;
    email: String;
    phone_number: String;
    gender: String;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}
