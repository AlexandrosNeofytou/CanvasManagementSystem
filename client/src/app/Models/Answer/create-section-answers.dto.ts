import { CreateAnswersDto } from "./create-answers.dto";

export interface CreateSectionAnswers  extends CreateAnswersDto
{
    sectionId:number;
}