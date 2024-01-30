import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomePageModes } from '../../Enums/home-page-modes.enum';
import { ValidatorsExtensions } from '../../Extensions/ValidatorsExtension';
import {ValidationError } from '../../Models/Validations/validation-error';
import { RegisterDto } from '../../Models/User/register.dto';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from '../../Models/Errors/request-error';
import { BadRequest } from '../../Models/Errors/bad-request';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @Output() onLoginPageChange = new EventEmitter<HomePageModes>();

  registerModel: FormGroup = new FormGroup({});

  emailValidationErrors: ValidationError[] | undefined;
  passwordValidationErrors: ValidationError[] | undefined;
  usernameValidationErrors: ValidationError[] | undefined;
  confirmPasswordValidationErrors: ValidationError[] | undefined;

  usernameExistsErrorMessage:string="";
  emailExistsErrorMessage:string="";


  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {


    this.registerModel = this.createRegisterModel();

    this.createValidationErrors();

  }


  

  createValidationErrors() {
    this.emailValidationErrors = [
      { errorName: "email", errorMessage: "*Email is invalid" },
      { errorName: "required", errorMessage: "*Email is required" },
      { errorName: "emailExists", errorMessage: "*Email exists" }
    ]

    this.passwordValidationErrors = [{ errorName: "passwordStrength", errorMessage: "*Password must have 8 characters (Number,Lowecase,Uppercase)" }
      , { errorName: "required", errorMessage: "*Password is required" }]

    this.confirmPasswordValidationErrors = [{ errorName: "confirmPassword", errorMessage: "*Password miss match" },
    { errorName: "required", errorMessage: "*Confirm Password is required" }]

    this.usernameValidationErrors = [
      { errorName: "required", errorMessage: "*Username is required" },
      { errorName: "minlength", errorMessage: "*Username must have minimum 6 characters" },
      { errorName: "maxlength", errorMessage: "*Username must have maximun 10 characters" },
      { errorName: "usernameExists", errorMessage: "*Username exists" }

    ]

  }

  createRegisterModel() {
    return this.fb.group({
      email: new FormControl("", [Validators.email, Validators.required]),
      username: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      password: new FormControl("", [ValidatorsExtensions.isStrongPassword(), Validators.required]),
      confirmPassword: new FormControl("", [ValidatorsExtensions.IsSame("password"), Validators.required])
    });
  }

  navigateToLogin() {
    this.onLoginPageChange.emit(HomePageModes.Login);
  }

  register() {
    if (this.registerModel.valid) {

      const registerDto: RegisterDto = {
        username: this.registerModel.get("username")?.value,
        email: this.registerModel.get("email")?.value,
        password: this.registerModel.get("password")?.value
      }


      this.accountService.register(registerDto).subscribe({
        next: () => {
          if(registerDto.email)
          {
            this.router.navigateByUrl("/verify-email"+"/"+registerDto.email);

          }
        },

        error: error => {

          console.log(error)

          if(error.status==400)
          {
            this.setCredentialErrors(error.data.errors);
          }
        
        }
      });

    }
    else {
      this.markFromGroupTouched();
    }

  }

  markFromGroupTouched() {
    Object.values(this.registerModel.controls).forEach((control) => {
      control.markAllAsTouched();
    })
  }

  setCredentialErrors(credentialErrors:Map<string,string>)
  {
    for(let errorName of credentialErrors.keys())
    {
      if(errorName=="username")
      {
        this.usernameExistsErrorMessage="*Username exists"
      }
      else if(errorName=="email")
      {
        this.emailExistsErrorMessage="*Email exists"

      }
    }
  }

  resetUsenameExistsError()
  {
    this.usernameExistsErrorMessage="";
  }

  resetEmailExistsError()
  {
    this.emailExistsErrorMessage="";
  }

 


}
