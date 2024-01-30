import { Component, OnInit } from '@angular/core';
import { CanvasCardProperties } from 'src/app/Helpers/canvas-card-properties';
import { CanvasSearchParams } from 'src/app/Models/Canvas/canvas-search-params';
import { CanvasDto } from 'src/app/Models/Canvas/canvas.dto';
import { PaginationHeader } from 'src/app/Models/Pagination/pagination';
import { PaginationParams } from 'src/app/Models/Pagination/pagination-params';
import { SearchOutput } from 'src/app/Models/Search/search-output';
import { CanvasService } from 'src/app/_services/canvas.service';
import { NavbarService } from 'src/app/_services/navbar.service';

@Component({
  selector: 'app-browse-canvases',
  templateUrl: './browse-canvases.component.html',
  styleUrls: ['./browse-canvases.component.css']
})
export class BrowseCanvasesComponent implements OnInit {

  pageSize:number=2;

  pageNumber:number=0;

  paginationHeader:PaginationHeader | undefined;

  canvasesDto:CanvasDto[]=[];

  private canvasSearchParams:CanvasSearchParams={
    canvasTitle: '',
    author: ''
  };

  canvasCardProperties:CanvasCardProperties;


  canvasSearchFilterNames:string []=[];

  constructor(private navBarService:NavbarService,private canvasService:CanvasService){
    
    navBarService.setIsNavBarVisable(true);

    this.canvasSearchFilterNames=Object.keys(this.canvasSearchParams);

    
    this.canvasCardProperties={
      isDescriptionButtonOn: true,
      isPublishButtonOn: false,
      isEditButtonOn: false,
      isOpenButtonOn: true


    }

  }
  ngOnInit(): void {

    this.loadPublicCanvases();
  }

  loadPublicCanvases()
  {
    const paginationParams:PaginationParams={

      pageNumber: this.pageNumber,
      pageSize: this.pageSize

    }

    this.canvasService.getPublishedCanvases(paginationParams,this.canvasSearchParams).subscribe({

      next: pagination=>{
          if(pagination.data && pagination.paginationHeader)
          {
            this.canvasesDto=pagination.data;

            this.paginationHeader=pagination.paginationHeader;

            this.pageNumber=this.paginationHeader.pageNumber;
          }
      }
    })
  }

  onPaginationPageChanged(pageNumber:number)
  {
    if(pageNumber!=this.pageNumber)
    {
      this.pageNumber=pageNumber;

      this.loadPublicCanvases();
    }
  }

  searchCanvases(searchOutput:SearchOutput)
  {
    for(let i=0; i<searchOutput.propertyNames.length; i++)
    {
      const propertyName:string=searchOutput.propertyNames[i];

      const propertyValue:string=searchOutput.searchValues[i];

      (this.canvasSearchParams as any)[propertyName]=propertyValue;


    }



    this.loadPublicCanvases()
  }

}
