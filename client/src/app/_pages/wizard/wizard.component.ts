import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CreateAnswerDto } from 'src/app/Models/Answer/create-answer.dto';
import { CreateAnswersDto } from 'src/app/Models/Answer/create-answers.dto';
import { CreateSectionAnswers } from 'src/app/Models/Answer/create-section-answers.dto';
import { Question } from 'src/app/Models/Canvas/question.dto';
import { CanvasService } from 'src/app/_services/canvas.service';
import { NavbarService } from 'src/app/_services/navbar.service';
import { QuestionsService } from 'src/app/_services/questions.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  questions:Question[]=[];

  answers:CreateAnswerDto[]=[];

  questionAnswers:CreateAnswerDto[]=[];

  currentQuestion:Question | undefined

  currentQuestionIndex=0;

  private sectionId:number=-1;

  private canvasId:number=0;

  constructor(private questiosService:QuestionsService
    ,private navbarService:NavbarService
    ,private router:Router
    ,private canvasService:CanvasService,
    private route:ActivatedRoute){

    navbarService.setIsNavBarVisable(true);
  }

  ngOnInit(): void {

    this.getParameters();
    
    this.loadQuestions();

    
   
  }

  getParameters()
  {
    this.route.paramMap.subscribe(params=>{

      const canvasId:string|null=params.get("canvasId");

      if(canvasId)
      {
        this.canvasId=Number.parseInt(canvasId);

      }
    });

    const state = history.state

    if (state) {

        if(state.answers)
        {
          this.answers = state.answers;
        }
        if(state.sectionId!=null)
        {
          this.sectionId=state.sectionId;

          console.log(this.sectionId)
        }
    }


  }

  loadQuestions()
  {

    if(this.sectionId==-1)
    {


      this.questiosService.getQuestions().subscribe({
        next:questions=>{
          this.questions=questions
  
          this.currentQuestion=questions[0];
  
              
          this.getQuestionAnswers();
        }
      })
    }
    else
    {

       this.questiosService.getQuestionsBySectionId(this.sectionId).subscribe({
        next:questions=>{
          this.questions=questions
  
          this.currentQuestion=questions[0];
          
              
          this.getQuestionAnswers();
        }
       })
    }

  }

  onPageChanged(pageNumber:number)
  {
    if(this.currentQuestionIndex!=pageNumber)
    {
      this.currentQuestion=this.questions[pageNumber-1];

      this.currentQuestionIndex=pageNumber

      this.getQuestionAnswers();
    }
  }

  getQuestionAnswers()
  {
    this.questionAnswers=this.answers.filter(x=>x.questionId==this.currentQuestion?.id);

    if(this.questionAnswers.length==0)
    {
      this.createAnswer();
    }
  }

  createAnswer()
  {
    if(this.currentQuestion)
    {

      const answer:CreateAnswerDto={
        id:-1,
        answerText:"",
        questionId:this.currentQuestion.id
      }

      this.answers.push(answer);

      this.questionAnswers.push(answer)

    }
  
  }

  removeAnswer(answer:CreateAnswerDto)
  {
    this.answers=this.answers.filter(x=>x!=answer);

    this.questionAnswers=this.questionAnswers.filter(x=>x!=answer);

  }

  submitAnswers()
  {

   
 
    if(!this.sectionId)
    {

      const createAnswersDto:CreateAnswersDto={
        answers:this.answers,
        canvasId:this.canvasId,
      }

      this.canvasService.addAnswersToCanvas(createAnswersDto).subscribe({
        next:_=>{
         
        }
      });
    }
    else
    {

      const createSectionAnswers:CreateSectionAnswers={
        sectionId: this.sectionId,
        answers: this.answers,
        canvasId: this.canvasId
      }

      this.canvasService.addSectionAnswersToCanvas(createSectionAnswers).subscribe({
        next:_=>{
         
        }
      });
    }
   
    
    this.router.navigateByUrl("view-own-canvases");

    
  }
}
