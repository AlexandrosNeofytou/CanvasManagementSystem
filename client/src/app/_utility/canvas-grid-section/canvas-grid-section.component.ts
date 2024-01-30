import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExtraOptions, NavigationExtras, Router } from '@angular/router';
import { StorageNames } from 'src/app/Enums/storage-names.enum';
import { AnswerDto } from 'src/app/Models/Answer/answer.dto';
import { CreateSectionAnswers } from 'src/app/Models/Answer/create-section-answers.dto';
import { SectionAnswers } from 'src/app/Models/Answer/section-answers';
import { CanvasDto } from 'src/app/Models/Canvas/canvas.dto';
import { Section } from 'src/app/Models/Canvas/section.dto';
import { CanvasViewModes } from 'src/app/Models/CanvasView/canvas-view-modes.enum';
import { CanvasService } from 'src/app/_services/canvas.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-canvas-grid-section',
  templateUrl: './canvas-grid-section.component.html',
  styleUrls: ['./canvas-grid-section.component.css']
})
export class CanvasGridSectionComponent {

  @Input() section:Section | undefined;

  @Input() answers:AnswerDto[] | undefined;

  @Input() canvasId:number | undefined;

  @Output() onAnswersChanged=new EventEmitter<AnswerDto[]>();

  isGridOptionsShown:boolean=false;

  constructor(private storageService:StorageService,
    private canvasService:CanvasService,private router:Router)
  {
   

  }

  toggleIsGridOptionsShown()
  {
    this.isGridOptionsShown=!this.isGridOptionsShown;
  }

  copySection()
  {
    if(this.answers && this.answers.length>0)
    {

      if(this.section)
      {
        const sectionStorageId:string=StorageNames.CopiedCanvasSection+this.section.id

        this.storageService.addToStorage(sectionStorageId,this.answers);
      }
     

    }

    this.toggleIsGridOptionsShown();

  }

  pasteCopiedSection()
  {

        if(this.canvasId && this.section)
        {

          const sectionStorageId:string=StorageNames.CopiedCanvasSection+this.section.id;
          
          const answersToPaste:AnswerDto[] | null=
            this.storageService.getFromStorage<AnswerDto[]>(sectionStorageId)
          
          if(answersToPaste)
          {
              const createSectionAnswersDto:CreateSectionAnswers={
                sectionId: this.section.id,
                answers: answersToPaste,
                canvasId: this.canvasId
              }

              this.canvasService.addSectionAnswersToCanvas(createSectionAnswersDto).subscribe({
                next:answers=>{
                  if(this.section && answers)
                  {
                    this.onAnswersChanged.emit(answers);

                  }
                }
              })
          }
     }  

     this.toggleIsGridOptionsShown();

  }


  editSection()
  {
   

    this.router.navigateByUrl("/wizard/"+this.canvasId,{state:{answers:this.answers,
      sectionId:this.section?.id
}})
  }


  



}
