import { Component } from '@angular/core';
import { DescriptionService } from 'src/app/_services/description.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {

  descriptionText:string="";

  constructor(private descriptionService:DescriptionService){

    descriptionService.$descriptionText.subscribe({
      next:text=>{
        this.descriptionText=text;
      }
    })
  }

  closeDescription()
  {
    this.descriptionService.closeDescription();
  }
}
