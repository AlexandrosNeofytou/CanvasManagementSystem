export interface CanvasDto
{
    id:number;

    title:string;

    description:string;

    authorUsername?:string;

    dateModified?:Date;

    isPublished:boolean;

    imageUrl:string;
}