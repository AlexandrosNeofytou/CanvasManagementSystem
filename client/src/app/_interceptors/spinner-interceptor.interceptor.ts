import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { SpinnerService } from '../_services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService:SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.spinnerService.increaseSpinnerActivityCounter();

    return next.handle(request).pipe(

      // delay(2000),

      finalize(()=>{ 
        this.spinnerService.descreaseSpinnerActivityCounter()})
    );
  }
}
