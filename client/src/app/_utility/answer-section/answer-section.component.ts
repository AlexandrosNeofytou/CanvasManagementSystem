import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CreateAnswerDto } from 'src/app/Models/Answer/create-answer.dto';

@Component({
  selector: 'app-answer-section',
  templateUrl: './answer-section.component.html',
  styleUrls: ['./answer-section.component.css']
})
export class AnswerSectionComponent {

  @Input() questionId:number | undefined;

  @Input() answers:CreateAnswerDto[]=[];

  @Output() onCreateAnswer=new EventEmitter();
  @Output() onRemoveAnswer=new EventEmitter<CreateAnswerDto>();

  @ViewChild("answerSection",{static:true}) answerSection:ElementRef | undefined;

  createAnswer()
  {
    this.onCreateAnswer.emit();

    this.scrollToBottonOfAnswerSection();
  }

  removeAnswer(answer:CreateAnswerDto)
  {
    this.onRemoveAnswer.emit(answer);
  }

  scrollToBottonOfAnswerSection()
  {
    if(this.answerSection)
    {

      const nativeElement = this.answerSection.nativeElement;
    
      console.log("ScrollTop before:", nativeElement.scrollTop);
      
      setTimeout(() => {
        nativeElement.scrollTop = nativeElement.scrollHeight;
        console.log("ScrollTop after:", nativeElement.scrollTop);
      }, 100);

    }
  }
}
