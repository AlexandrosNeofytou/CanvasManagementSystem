import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs';
import { CanvasDto } from 'src/app/Models/Canvas/canvas.dto';
import { UpdateCanvasDto } from 'src/app/Models/Canvas/update-canvas.dto';
import { CanvasService } from 'src/app/_services/canvas.service';
import { NavbarService } from 'src/app/_services/navbar.service';

@Component({
  selector: 'app-create-canvas-form',
  templateUrl: './create-canvas-form.component.html',
  styleUrls: ['./create-canvas-form.component.css']
})
export class CreateCanvasFormComponent implements OnInit {

  canvasForm:FormGroup=new FormGroup({}); 

  private imageFile:File | null=null;

  private canvasDto:CanvasDto | undefined;
  
  private isCanvasEdited:boolean=false;

  constructor(
    private navigationService:NavbarService,
    private fb:FormBuilder,
    private canvasService:CanvasService,
    private router:Router,
    private activatedRoute:ActivatedRoute){

    navigationService.setIsNavBarVisable(true);



  }
  
  ngOnInit(): void {

    this.loadCanvasInfo();

    this.createCanvasForm();
  }

  createCanvasForm()
  {

    this.canvasForm=this.fb.group({
      title:new FormControl(this.canvasDto?.title),
      description:new FormControl(this.canvasDto?.description),
    });
  }

  createCanvas()
  {
    
    if(this.canvasDto)
    {
      this.canvasDto.title=this.canvasForm.controls["title"].value
      this.canvasDto.description=this.canvasForm.controls["description"].value;
      
      if(this.isCanvasEdited==false)
      {
        this.canvasService.createCanvas(this.canvasDto).subscribe({
          next: (canvasCreated:CanvasDto)=>{
    
            this.uploadImage(canvasCreated)

            this.router.navigateByUrl("wizard/"+canvasCreated.id);

    
          }
        });
      }
      else 
      {
          const updateCanvasDto:UpdateCanvasDto={
            id: this.canvasDto.id,
            title: this.canvasDto.title,
            description:  this.canvasDto.description
          }

          this.canvasService.updateCanvas(updateCanvasDto).subscribe({
            next:(canvasDto)=>{
              this.uploadImage(canvasDto)
              
              this.canvasService.getCanvasOwnAnswers(canvasDto.id).subscribe({
                next:answersFetched=>{

                  const navigationaExtras:NavigationExtras={
                    state:{
                      answers:answersFetched
                    }
                  }

                  this.router.navigateByUrl("wizard/"+canvasDto.id,navigationaExtras);

                }
              })



            }
          })
      }

  
    }
    
  }


  onImageUploaded(event:Event)
  {

    const inputElement=event.target as HTMLInputElement

    const files:FileList | null=inputElement.files;

    if(files && files.length>0)
    {   
        this.imageFile=files[0];

        console.log(this.imageFile.name)
    }
    
  }


  private loadCanvasInfo()
  {
    this.activatedRoute.params.subscribe(
      params=>{
        const id=params["canvasId"];

        if(id!=null)
        {
          this.canvasService.getUserCanvasById(id).pipe(take(1))
            .subscribe({

              next:canvas=>{
                if(canvas)
                {
                  this.canvasDto=canvas
                }
              }
          })

          this.isCanvasEdited=true;

        }

        else
        {
           this.canvasDto={
            id: 0,
            title:"",
            description: "",
            isPublished:false,
            imageUrl:""
          }
        }

      }
    )
  }

  private uploadImage(canvasCreated:CanvasDto)
  {
    if(this.imageFile)
    {
      this.canvasService.addImageToCanvas(canvasCreated.id,this.imageFile).subscribe({
        next:(canvas)=>{
          canvasCreated.imageUrl=canvas.imageUrl;

        }
      })

    }
  }


}
