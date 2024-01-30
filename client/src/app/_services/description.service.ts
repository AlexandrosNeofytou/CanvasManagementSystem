import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {

  private descriptionText=new BehaviorSubject("");


  $descriptionText=this.descriptionText.asObservable();



  constructor() { }

  openDescription(text:string)
  {
    this.descriptionText.next(text);
  }

  closeDescription()
  {
    this.descriptionText.next("");

  }

 
}
