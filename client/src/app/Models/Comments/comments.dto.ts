import { CommentDto } from "./comment.dto";

export interface CommentsDto
{
    commentsDto:CommentDto[];

    totalCount:number;
}