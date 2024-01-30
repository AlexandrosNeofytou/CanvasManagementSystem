import { Component, WritableSignal, signal } from '@angular/core';
import { HomePageModes } from '../../Enums/home-page-modes.enum';
import { NavbarService } from '../../_services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  pageMode:WritableSignal<HomePageModes>=signal(HomePageModes.Login);


  constructor(private navbarService:NavbarService) {

    navbarService.setIsNavBarVisable(false);
  }
  changePageMode(pageMode:HomePageModes)
  {
    this.pageMode.set(pageMode);
  }

  isLoginModeOn():boolean
  {
    return this.pageMode()==HomePageModes.Login;
  }

  isRegisterModeOn():boolean
  {
    return this.pageMode()==HomePageModes.Register;

  }

}
