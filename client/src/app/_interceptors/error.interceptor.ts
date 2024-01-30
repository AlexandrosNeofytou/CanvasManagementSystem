import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<string[]>> {
    return next.handle(request).pipe(catchError(error=>{

      console.log(error)

      const errors=error.error;

      const errorNames:string[]=[];

      if(errors.errors)
      {
        console.log("error1")

        throw  Object.keys(errors).forEach(x=>errorNames.push(x));
      }
      else 
      {
        Object.keys(errors).forEach(x=>errorNames.push(x));


      }
      throw errorNames;


    }));
  }
}
