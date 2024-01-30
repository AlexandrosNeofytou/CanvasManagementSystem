import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-verified',
  templateUrl: './account-verified.component.html',
  styleUrls: ['./account-verified.component.css']
})
export class AccountVerifiedComponent {
  constructor(private router:Router) { }

  navigateToLogin(){
    this.router.navigateByUrl("");
  }
}
