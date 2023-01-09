import { Locations } from "../../game/map";

export interface LocationTable {
    /**
     * 位置的hash
     */
    hash:string;

    /**
     * 位置
     */
    location:Locations

    /**
     * 在此位置的用户
     */
    id:number
}