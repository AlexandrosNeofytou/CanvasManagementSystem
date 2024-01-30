import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { PaginationParams } from "../Models/Pagination/pagination-params";
import { map } from "rxjs";
import { Pagination } from "../Models/Pagination/pagination";

    export function getPagination<T>(httpClient:HttpClient,url:string,httpParams:HttpParams)
    {

        const pagination=new Pagination<T>();

        return httpClient.get<T>(url,{observe:"response",params:httpParams}).pipe(

            map(response=>{
                
                if(response.body)
                {   
                    pagination.data=response.body

                }

                const paginationString=response.headers.get("Pagination")

                if(paginationString)
                {
                    pagination.paginationHeader=JSON.parse(paginationString);
                }

                return pagination;
            })
        );
    }

    export function getPaginationHeaders(pageNumber:number,pageSize:number)
    {
        let httpParams:HttpParams=new HttpParams();

        httpParams=httpParams.append("PageNumber",pageNumber);

        httpParams=httpParams.append("PageSize",pageSize);

        return httpParams;

    }