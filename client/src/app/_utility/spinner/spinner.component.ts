import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/_services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  isSpinnerActive:boolean=false;

  constructor(private spinnerService:SpinnerService)
  {
    this.setSpinnerActivity();
  }

  setSpinnerActivity()
  {
    this.spinnerService.getIsSpinnerActive().subscribe({
      next:(isSpinnerActive)=>{
        this.isSpinnerActive=isSpinnerActive;
      }
    })
  }
}
