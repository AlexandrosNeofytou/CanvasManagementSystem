export interface CommentDto
{
    id:number;

    text:string;

    canvasId:number;

    appUserId:string;

    isHidden:boolean;

    authorName:string;

    timeCreated:Date;
}