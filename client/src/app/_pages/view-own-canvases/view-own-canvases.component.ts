import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { NavbarService } from '../../_services/navbar.service';
import { Router } from '@angular/router';
import { CanvasDto } from 'src/app/Models/Canvas/canvas.dto';
import { CanvasService } from 'src/app/_services/canvas.service';
import { Pagination, PaginationHeader } from 'src/app/Models/Pagination/pagination';
import { PaginationParams } from 'src/app/Models/Pagination/pagination-params';
import { DescriptionService } from 'src/app/_services/description.service';
import { CanvasCardProperties } from 'src/app/Helpers/canvas-card-properties';

@Component({
  selector: 'app-view-own-canvases',
  templateUrl: './view-own-canvases.component.html',
  styleUrls: ['./view-own-canvases.component.css']
})
export class ViewOwnCanvasesComponent implements OnInit {

  private defualtPageSize:number=3
  private defualtPageNumber:number=1


  paginationHeader:PaginationHeader | undefined;
  
  canvases:CanvasDto[]=[];

  paginationParams:PaginationParams | undefined

  canvasCardProperties:CanvasCardProperties;

  constructor(public accountService:AccountService,
    private navbarService:NavbarService,
    private router:Router,
    private canvasasService:CanvasService,


    ){

          
    this.paginationParams={pageNumber:this.defualtPageNumber,pageSize:this.defualtPageSize}

    navbarService.setIsNavBarVisable(true);

    this.canvasCardProperties={
      isDescriptionButtonOn: true,
      isPublishButtonOn: true,
      isEditButtonOn: true,
      isOpenButtonOn: true


    }


  }
  ngOnInit(): void {
    this.loadUserCanvases();
  }


  navigateToCreateCanvasForm()
  {
    this.router.navigateByUrl("/create-canvas-form");
  }

  loadUserCanvases()
  {
    if(this.paginationParams)
    {
      this.canvasasService.getUserCanvases(this.paginationParams).subscribe({
        next:(pagination)=>{

          if(pagination.data)
          {
            this.canvases=pagination.data;

          }
          
          this.paginationHeader=pagination.paginationHeader;
          
        }
      })
    }
  
  }

  onPageChanged(pageNumber:number)
  {
    if(this.paginationParams)
    {
      this.paginationParams.pageNumber=pageNumber

      this.loadUserCanvases();
    }
  }

  

}
