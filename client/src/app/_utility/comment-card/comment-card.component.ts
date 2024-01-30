import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommentDto } from 'src/app/Models/Comments/comment.dto';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit {

  @Input() comment:CommentDto | undefined;
  
  @ViewChild("commentTextArea",{static:true}) commentTextArea:ElementRef | undefined; 

  hasCommentOverFlow:boolean=false;

  isCommentSectionExtended:boolean=false;

  constructor(){

  }
  ngOnInit(): void {
    this.hasCommentOverFlow=this.getHasCommentOverflow();
  }

  getHasCommentOverflow()
  {
    const commetTextArea=this.commentTextArea?.nativeElement;

    if(commetTextArea)
    {
      const hasOverFlow=commetTextArea.scrollHeight > commetTextArea.clientHeight;

      return hasOverFlow;

    }
    
    return false;
  }

  extendComment()
  {
    this.isCommentSectionExtended=true;

  }

  reduceComment()
  {
    this.isCommentSectionExtended=false;

  }
  
}
