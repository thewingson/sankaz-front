import { DictEntity } from "./DictEntity";
import { Pic } from "./Pic";

export interface User {
    id:string,
    username:string,
    userType:string,
    confirmationStatus:string,
    email:string,
    city:DictEntity,
    gender:DictEntity,
    telNumber:string,
    firstName:string,
    lastName:string,
    pic:Pic
}