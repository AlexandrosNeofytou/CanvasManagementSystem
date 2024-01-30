import { Section } from "./section.dto"

export interface Question
{
    id:number;

    questionName:string;

    displayOrder:number;

    section:Section;
}