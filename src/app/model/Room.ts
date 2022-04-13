import { Pic } from "./Pic";

 export interface Room {
    id: number;
    roomNumber: string;
    roomCount: number;
    bedCount: number;
    price: number;
    picUrls: Pic[];
    classId:number,
    description:string;
    name:string;
    san:San;
}
type San = {
    id: string
    mainPicUrl: string
    name: string
}