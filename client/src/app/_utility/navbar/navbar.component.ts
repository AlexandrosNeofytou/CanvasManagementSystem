import { Component, WritableSignal, signal } from '@angular/core';
import { NavbarService } from '../../_services/navbar.service';
import { AccountService } from '../../_services/account.service';
import { AppUser } from '../../Models/User/app-user';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  isNavbarVisable:boolean=true;

  user$:Observable<AppUser | null> | undefined

  constructor(private navbarService:NavbarService,private accountService:AccountService){

    navbarService.getIsNavBarVisable().subscribe({
      next:navbarVisability=>{
        this.isNavbarVisable=navbarVisability;

        this.loadUser();
      }
    });


  }

  loadUser()
  {
    this.user$=this.accountService.getUser();
  }


  logout()
  {
    this.accountService.logout();
  }


}
