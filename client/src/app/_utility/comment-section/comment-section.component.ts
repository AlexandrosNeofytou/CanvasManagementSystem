import { Component, Input, OnInit } from '@angular/core';
import { GetCommentsParams } from 'src/app/Models/Comments/comment-params';
import { CommentDto } from 'src/app/Models/Comments/comment.dto';
import { CreateCommentDto } from 'src/app/Models/Comments/create-comment.dto';
import { PaginationHeader } from 'src/app/Models/Pagination/pagination';
import { PaginationParams } from 'src/app/Models/Pagination/pagination-params';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {

  @Input() canvasId:number | undefined;

  commentText:string="";

  comments:CommentDto[]=[]; 

  numberOfCommentsToTake:number=3;
  
  totalNumberOfComments:number=0;

  constructor(private commentService:CommentService) {
    
  }
  ngOnInit(): void {
    this.loadComments()
  }



  submitComment()
  { 
    if(this.canvasId)
    {

      const createCommentDto:CreateCommentDto={
        text: this.commentText,
        canvasId: this.canvasId
      }

      this.commentService.createComment(createCommentDto).subscribe({
        next:comment=>{

        }
      });

      this.commentText="";


    }
  }

  loadComments()
  {

    if(this.canvasId)
    {

      
      const commentParams:GetCommentsParams={
        numberOfCommentsToSkip: this.comments.length,
        numberOfCommentsToTake: this.numberOfCommentsToTake
      }
      
      this.commentService.getComments(this.canvasId,commentParams).subscribe({
        next:commentsDto=>{
          this.totalNumberOfComments=commentsDto.totalCount;
          this.comments.push(...commentsDto.commentsDto)
        }
      })
     
    }
 
  }
}
