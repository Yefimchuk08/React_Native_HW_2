import {IImageFile} from "@/types/common/IImageFile";

export interface ICreateCategory{
    name: string;
    description: string;
    image:IImageFile;
}