import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const requestWithToken=this.createRequestWithToken(request);

    return next.handle(requestWithToken);
  }

  private createRequestWithToken(request: HttpRequest<unknown>): HttpRequest<unknown> {

    let token = "";

    this.accountService.getUser().pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          token = user.token
        }

      }
    });
    
    const requestClone=request.clone({headers:request.headers.set("Authorization","Bearer "+token)});


    return requestClone;
    
  }
}
