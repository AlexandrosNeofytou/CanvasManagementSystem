import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AppUser } from 'src/app/Models/User/app-user';
import { AccountService } from 'src/app/_services/account.service';
import { NavbarService } from 'src/app/_services/navbar.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {

  email:string | undefined;

  constructor(private navbarService:NavbarService,
    private activeRoute:ActivatedRoute,private router:Router)
  {
    navbarService.setIsNavBarVisable(true);
    

    this.getEmailParam();

  }

  private getEmailParam()
  {
    this.activeRoute.params.pipe(take(1)).subscribe(params => {
      this.email = params['email'];
    });
  }

  navigateLogIn()
  {
    this.router.navigateByUrl("");
  }

}
