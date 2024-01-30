import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CreateCommentDto } from '../Models/Comments/create-comment.dto';
import { CommentDto } from '../Models/Comments/comment.dto';
import { Pagination } from '../Models/Pagination/pagination';
import { PaginationParams } from '../Models/Pagination/pagination-params';
import { getPagination, getPaginationHeaders } from '../Helpers/pagination-helper';
import { map } from 'rxjs';
import { GetCommentsParams } from '../Models/Comments/comment-params';
import { CommentsDto } from '../Models/Comments/comments.dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl:string=environment.apiUrl;

  constructor(private httpClient:HttpClient) { }


  createComment(createCommentDto:CreateCommentDto)
  {
    const url:string=this.baseUrl+"Comments/create-comment";

    return this.httpClient.post<CommentDto>(url,createCommentDto)
  }

  getComments(canvasId:number,commentParams:GetCommentsParams)
  {
    const url:string=this.baseUrl+"Comments/get-canvas-comments/"+canvasId;

    let httpParams=new HttpParams();

    httpParams=httpParams.append("numberOfCommentsToSkip",commentParams.numberOfCommentsToSkip);

    httpParams=httpParams.append("numberOfCommentsToTake",commentParams.numberOfCommentsToTake);

    return this.httpClient.get<CommentsDto>(url,{params:httpParams});






  }
}
