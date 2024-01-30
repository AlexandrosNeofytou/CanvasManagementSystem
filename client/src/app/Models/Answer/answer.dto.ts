import { Question } from "../Canvas/question.dto";

export interface AnswerDto
{
    id:number;

    answerText:string;

    question:Question

    questionId:number;

    sectionId:number;
}