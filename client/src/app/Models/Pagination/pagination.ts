import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PaginationParams } from "src/app/Models/Pagination/pagination-params";

export interface PaginationHeader {

    pageNumber:number;

    pageSize:number;

    itemsCount:number;

    numberOfPages:number;
}

export class Pagination<T>
{
    paginationHeader:PaginationHeader | undefined;

    data:T | undefined


   

  

}