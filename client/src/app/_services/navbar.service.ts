import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private isNavBarVisableSource=new BehaviorSubject(false);

  private isNavBarVisable=this.isNavBarVisableSource.asObservable();

  constructor() { }


  setIsNavBarVisable(isVisable:boolean)
  {
    this.isNavBarVisableSource.next(isVisable);
  }

  getIsNavBarVisable():Observable<boolean>
  {
    return this.isNavBarVisable;
  }

}
