import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginDto } from '../../Models/User/login.dto';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidatorsExtensions } from '../../Extensions/ValidatorsExtension';
import { AccountService } from '../../_services/account.service';
import { HomePageModes } from '../../Enums/home-page-modes.enum';
import { Router } from '@angular/router';
import { ErrorKeys } from 'src/app/Helpers/error-keys.enum';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent  {

    @Input() title:string="title";

    @Output() onRegisterPageChange:EventEmitter<HomePageModes>=new EventEmitter<HomePageModes>();

    areCredentailsInvalid:boolean=false;

    loginForm:FormGroup=new FormGroup({});

    constructor(private accountService:AccountService,private fb:FormBuilder,private router:Router) {

      this.loginForm=this.createLoginForm();

    }


    createLoginForm()
    {
      return this.fb.group({
        email:new FormControl(""),
        password:new FormControl("")
      });
    }


    login()
    { 

        this.accountService.login(this.loginForm?.value).subscribe({
          next:(user)=>{
            this.router.navigateByUrl("/view-own-canvases");

          },
          error:(error:string[])=>{
            
            const verificationError:string | undefined=error.find(x=>x==ErrorKeys.verificationError);
            
            if(verificationError)
            {
              this.router.navigateByUrl("/verify-email"+"/"+this.loginForm.controls["email"].value);
            }
            else 
            {
              this.areCredentailsInvalid=true;

            }

            
            

          }
        });

    }

    onChangeToRegisterPage()
    {
      this.onRegisterPageChange.emit(HomePageModes.Register);
    }
  }



