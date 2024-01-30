import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private accountService:AccountService,private router:Router)
  {
    accountService.getUser().pipe(take(1)).subscribe({
      next: user=>{
        if(user==null)
        {
            console.log("print null user")
        }
      }
    })
  }
}
