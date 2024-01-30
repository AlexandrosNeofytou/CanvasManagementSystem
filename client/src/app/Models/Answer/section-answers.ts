import { Section } from "../Canvas/section.dto";
import { AnswerDto } from "./answer.dto";

export interface SectionAnswers
{
    section:Section;
    answers:AnswerDto[];
}