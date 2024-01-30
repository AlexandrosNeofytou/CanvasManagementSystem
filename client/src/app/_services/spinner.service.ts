import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private isSpinnerActiveSource=new BehaviorSubject(false);

  private isSpinnerActive$=this.isSpinnerActiveSource.asObservable();

  private spinnerActivityCounter:number=0;

  public getIsSpinnerActive()
  {
    return this.isSpinnerActive$;
  }

  public increaseSpinnerActivityCounter()
  {
    if(this.spinnerActivityCounter==0)
    {
      this.isSpinnerActiveSource.next(true);
    }

    this.spinnerActivityCounter++;
    
  }

  public descreaseSpinnerActivityCounter()
  {
    this.spinnerActivityCounter--;

    if(this.spinnerActivityCounter==0)
    {
      this.isSpinnerActiveSource.next(false);
    }
  }

}
