import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CanvasCardProperties } from 'src/app/Helpers/canvas-card-properties';
import { CanvasDto } from 'src/app/Models/Canvas/canvas.dto';
import { CanvasService } from 'src/app/_services/canvas.service';
import { DescriptionService } from 'src/app/_services/description.service';

@Component({
  selector: 'app-canvas-card',
  templateUrl: './canvas-card.component.html',
  styleUrls: ['./canvas-card.component.css']
})
export class CanvasCardComponent implements OnInit {
  @Input() canvas:CanvasDto | undefined

  @Input() canvasCardProperties:CanvasCardProperties={
    isDescriptionButtonOn: false,
    isPublishButtonOn: false,
    isEditButtonOn: false,
    isOpenButtonOn: false
  }

 

  constructor(private canvasService:CanvasService,
    private descriptionService:DescriptionService,
    private router:Router){}


  ngOnInit(): void {

    this.setCanvasImage();

  }




  openCanvas()
  {
    if(this.canvas)
    {
      this.router.navigateByUrl("/canvas-view/"+this.canvas.id+"/"+this.canvas.title);
    }

  }

  setCanvasImage()
  {
    if(this.canvas?.imageUrl=="")
    {
      this.canvas.imageUrl="/assets/Images/emptyImageIcon.jpg"
    }
  }

  editACanvas()
  { 
    if(this.canvas)
    {
      this.router.navigateByUrl("/create-canvas-form/"+this.canvas.id);

    }
   
  }

  openDescription()
  {

    if(this.canvas)
    {
      this.descriptionService.openDescription(this.canvas.description);

    }
  }

  setPublishCanvasStatus()
  {
    if(this.canvas)
    {
      this.canvasService.setCanvasPublishStatus(this.canvas.id,!this.canvas.isPublished)
        .subscribe({
          next:isPublished=>{

            if(this.canvas)
            { 
              this.canvas.isPublished=isPublished;


            }
          }
        });

    } 
  }
  
}
