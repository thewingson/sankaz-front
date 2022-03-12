import { DictEntity } from "./DictEntity";
import { Pic } from "./Pic";
import { User } from "./User";

    export interface Organization {
        id: number;
        name: string;
        managerFullName: string;
        iin: string;
        iban: string;
        email: string;
        telNumber: string;
        confirmationStatus: string;
        confirmedDate?: any;
        confirmedBy?: any;
        user: User;
        pics: Pic[];
        companyName?: string;
        description?: string;
        address?: string;
        instagramLink?: string;
        siteLink?: string;
        companyCategory: DictEntity;
        rejectMessage?: string;
    }