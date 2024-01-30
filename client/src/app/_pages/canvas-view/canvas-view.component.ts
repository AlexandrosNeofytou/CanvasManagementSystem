import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerDto } from 'src/app/Models/Answer/answer.dto';
import { SectionAnswers } from 'src/app/Models/Answer/section-answers';
import { Section } from 'src/app/Models/Canvas/section.dto';
import { CanvasViewModes } from 'src/app/Models/CanvasView/canvas-view-modes.enum';
import { CanvasService } from 'src/app/_services/canvas.service';
import { NavbarService } from 'src/app/_services/navbar.service';
import { SectionsService } from 'src/app/_services/sections.service';

@Component({
  selector: 'app-canvas-view',
  templateUrl: './canvas-view.component.html',
  styleUrls: ['./canvas-view.component.css'],
})
export class CanvasViewComponent implements OnInit {


  CanvasViewModes=CanvasViewModes;
  
  canvasId:number=0;
  canvasName:string="Name"

  answers:AnswerDto[]=[];

  sections:Section[]=[];

  sectionAnswers:SectionAnswers[]=[];

  selectedCanvasViewMode:CanvasViewModes=CanvasViewModes.None

  
  constructor(
    private activeRoute:ActivatedRoute,
    private canvasService:CanvasService,
    private sectionService:SectionsService,
    private navBarService:NavbarService){

      navBarService.setIsNavBarVisable(true)
    }

  ngOnInit(): void {

    this.getParams();
    this.getCanvasAnswers(); 
    this.loadSections();
    
  }

  getParams()
  {

    this.activeRoute.params.subscribe(
      params=>{
        this.canvasId=Number.parseInt(params["canvasId"]);
        this.canvasName=params["canvasName"]
      }
    )

  }

  getCanvasAnswers()
  {
    this.canvasService.getCanvasOwnAnswers(this.canvasId).subscribe(
      {
        next:answers=>{this.answers=answers}
      }
    )
  }

  loadSections()
  {
    this.sectionService.getSections().subscribe({
      next:(sections)=>{
        this.sections=sections;

        this.setAnswerSections();
      }
    })
  }

  setAnswerSections()
  {
    this.sectionAnswers=[];

    this.sections.forEach((section)=>{
      const answers:AnswerDto[]=this.answers.filter((answer)=>section.id==answer.sectionId);

      const sectionAnswers:SectionAnswers={section:section,answers:answers};

      this.sectionAnswers.push(sectionAnswers);
    });

  }

  toggleCanvasViewMode(canvasViewMode:CanvasViewModes)
  { 
    if(this.selectedCanvasViewMode!=canvasViewMode)
    {
      this.selectedCanvasViewMode=canvasViewMode;

    }
    else 
    {
      this.selectedCanvasViewMode=CanvasViewModes.None;
    }
  }

  onCopyButtonClicked()
  {
    this.toggleCanvasViewMode(CanvasViewModes.CopyMode);
  }

  onPasteButtonClicked()
  {
    this.toggleCanvasViewMode(CanvasViewModes.PasteMode);

  }

  onSectionAnswersChanged(newAnswers:AnswerDto[])
  {
    this.answers=newAnswers;


    this.setAnswerSections()
  }

  onCommentsButtonClicked()
  {
  }
}
