import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LoginDto } from '../Models/User/login.dto';
import { HttpClient } from '@angular/common/http';
import { RegisterDto } from '../Models/User/register.dto';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { AppUser } from '../Models/User/app-user';
import { VerifyEmailDto } from '../Models/EmailVerification/verify_email.dto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl=environment.apiUrl;
  
  private userSource=new BehaviorSubject<AppUser | null>(null);

  private appUser$=this.userSource.asObservable();

  constructor(private httpClient:HttpClient) { 

    this.setUserFromStorage();

    
  }


  login(loginDto:LoginDto)
  {
    const url:string=this.baseUrl+"Account/login"

    return this.httpClient.post<AppUser>(url,loginDto).pipe(
      map(user=>{

        this.setAppUser(user);

        return user;
      })
    );
  }

  logout()
  {
    localStorage.removeItem("user");

    this.userSource.next(null);
  }

  register(RegisterDto:RegisterDto)
  {
    const url:string=this.baseUrl+"Account/Register";

    return this.httpClient.post(url,RegisterDto);
  }

  setAppUser(appUser:AppUser)
  {
    this.userSource.next(appUser);

    localStorage.setItem("user",JSON.stringify(appUser));
  }

  setUserFromStorage()
  {
    const userString:string | null =localStorage.getItem("user");
    
    if(userString)
    {
      const user:AppUser=JSON.parse(userString);

      this.userSource.next(user);
    }
  }

  verifyAccount(email:string,code:string)
  {
    const url=this.baseUrl+"Account/verify-user-email";

    const verifyEmailDto:VerifyEmailDto={email:email,token:code};

    return this.httpClient.post(url,verifyEmailDto);  


  }

  sendVerificationEmail(email:string)
  {
    const url=this.baseUrl+"Account/send-verification-email";

    return this.httpClient.post(url,{email:email});  
  }

  getUser():Observable<AppUser | null>
  {
    return this.appUser$;
  }

}
