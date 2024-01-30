import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loops } from 'src/app/Helpers/loops';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  
  codeDigits:string[]=["0","0","0","0","0"];

  isCodeWrong:boolean=false;

  private email:string="";  

  constructor(private accountService:AccountService,private activeRoute:ActivatedRoute,private router:Router) { 

    this.fetchEmail();

   
  }
  ngOnInit(): void {
  }

  private fetchEmail()
  {
    this.activeRoute.params.subscribe(params=>{
      const fetchedEmail=params['email'];

      if(fetchedEmail!=null)
      {
        this.email=fetchedEmail;
      }
    });
  }

  verifyAccount()
  {
    const code=this.codeDigits.join("");


    this.accountService.verifyAccount(this.email,code).subscribe({
      next:_=>{
        console.log("works")
        this.router.navigateByUrl("/account-verified");
      },
      error:error=>{
        
        console.log(error)
        this.isCodeWrong=true;
      }
    });
  }

  sendVerificationCode()
  {
    this.accountService.sendVerificationEmail(this.email).subscribe({
      next:_=>{
        
      },
      error:error=>{
      } 
    })
  }


}
