import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CanvasDto } from '../Models/Canvas/canvas.dto';
import { AccountService } from './account.service';
import { getPagination, getPaginationHeaders } from '../Helpers/pagination-helper';
import { PaginationParams } from '../Models/Pagination/pagination-params';
import { Pagination, PaginationHeader } from '../Models/Pagination/pagination';
import { Observable, map, of } from 'rxjs';
import { CreateAnswersDto } from '../Models/Answer/create-answers.dto';
import { AnswerDto } from '../Models/Answer/answer.dto';
import { CanvasSearchParams } from '../Models/Canvas/canvas-search-params';
import { CreateSectionAnswers } from '../Models/Answer/create-section-answers.dto';
import { UpdateCanvasDto } from '../Models/Canvas/update-canvas.dto';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  private baseUrl=environment.apiUrl;

  constructor(private httpClient:HttpClient,private accountService:AccountService) { }

  private paginations:Pagination<CanvasDto[]>[] =[];

  private numberOfCanvasPaginationPages=0;

  private numberOfCanvasPaginationItems=0;


  createCanvas(canvasDto:CanvasDto)
  {
    const url:string=this.baseUrl+"Canvas/create-canvas"

    return this.httpClient.post<CanvasDto>(url,canvasDto)
    .pipe(map(canvas=>{

      if(this.paginations && this.paginations.length>0)
      {
        const lastPagination:Pagination<CanvasDto[]>= this.paginations[this.paginations.length-1];
        
        if(lastPagination.data && lastPagination.paginationHeader)
        {
          this.numberOfCanvasPaginationItems++;

          if(lastPagination.data.length<lastPagination.paginationHeader.pageSize)
          {
            lastPagination.data.push(canvas);
          }
          else
          {
            const pagination:Pagination<CanvasDto[]>=new Pagination();

            this.numberOfCanvasPaginationPages++;
            
            pagination.data=[];

            pagination.data.push(canvas);

            pagination.paginationHeader={
              pageNumber:lastPagination.paginationHeader.pageNumber+1,
              pageSize:lastPagination.paginationHeader.pageSize,
              numberOfPages:this.numberOfCanvasPaginationPages,
              itemsCount:this.numberOfCanvasPaginationItems
            }

       

          }
        }
      }
      return canvas;
    }));
    
  }

  getUserCanvases(paginationParams:PaginationParams)
  {

    const existingPaginationWithParams=this.paginations
    .find((x)=>x.paginationHeader?.pageNumber==paginationParams.pageNumber &&
      x.paginationHeader?.pageSize==paginationParams.pageSize )

    if(!existingPaginationWithParams)
    {

      
      const url:string=this.baseUrl+"Canvas/get-user-canvases";

      const params=getPaginationHeaders(paginationParams.pageNumber,paginationParams.pageSize);

      return getPagination<CanvasDto[]>(this.httpClient,url,params).pipe(
        map(pagination=>{
          
          if(pagination.data && pagination.data.length>0 && pagination.paginationHeader)
          {

            this.numberOfCanvasPaginationPages=pagination.paginationHeader.numberOfPages;
            this.numberOfCanvasPaginationItems=pagination.paginationHeader.itemsCount;

            this.paginations.push(pagination);

          }
 
          return pagination;
        })
      );
    }
    else
    {

      
      if(existingPaginationWithParams.paginationHeader)
      {
        existingPaginationWithParams.paginationHeader.itemsCount=this.numberOfCanvasPaginationItems;

        existingPaginationWithParams.paginationHeader.numberOfPages=this.numberOfCanvasPaginationPages;


      }

      return of(existingPaginationWithParams);

    }
     

  }

  addAnswersToCanvas(createAnswersDto:CreateAnswersDto)
  {
    const url:string=this.baseUrl+"Canvas/add-answers-to-canvas"

    return this.httpClient.post(url,createAnswersDto);
  }

  getCanvasOwnAnswers(canvasId:number)
  {
    const url:string=this.baseUrl+"Canvas/get-own-canvas-answers/"+canvasId;

    return this.httpClient.get<AnswerDto[]>(url);
  }

  getPublishedCanvases(paginationParams:PaginationParams,canvasSearchParams:CanvasSearchParams)
  {
    const url:string=this.baseUrl+"Canvas/get-published-canvases";

    let params:HttpParams=getPaginationHeaders(paginationParams.pageNumber,paginationParams.pageSize);

    params=params.append("CanvasTitle",canvasSearchParams.canvasTitle);

    params=params.append("Author",canvasSearchParams.author);

    
    return getPagination<CanvasDto[]>(this.httpClient,url,params);

    

    

  }

  setCanvasPublishStatus(canvasId:number,isPublished:boolean)
  {
     const url:string=this.baseUrl+"Canvas/set-canvas-publicity/"+canvasId;

     return this.httpClient.put<boolean>(url,{publishedStatus:isPublished});
  }

  addSectionAnswersToCanvas(createSectionAnswers:CreateSectionAnswers)
  {
      const url:string=this.baseUrl+"Canvas/add-section-answers-to-canvas";

      return this.httpClient.post<AnswerDto[]>(url,createSectionAnswers);
  }

  addImageToCanvas(canvasId:number,image:File)
  {
    const url:string=this.baseUrl+"Canvas/add-image-to-canvas/"+canvasId;

    const formData=new FormData()
    formData.append("image",image);

    return this.httpClient.put<CanvasDto>(url,formData); 
  }


  getUserCanvasById(id:number):Observable<CanvasDto | undefined>
  {
      var canvasDto:CanvasDto | undefined=undefined;

      this.paginations.forEach((pagination)=>{
        canvasDto=pagination.data?.find((canvas)=>{
          return canvas.id==id
        }) 
      })

      return of(canvasDto);
  }

  updateCanvas(updateCanvas:UpdateCanvasDto)
  {
      const url:string=this.baseUrl+"Canvas/update-canvas/";

      return this.httpClient.put<CanvasDto>(url,updateCanvas)
  }
}
