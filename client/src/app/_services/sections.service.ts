import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Section } from '../Models/Canvas/section.dto';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  private baseUrl:string=environment.apiUrl;

  constructor(private httpClient:HttpClient) { }


  getSections()
  {
    const url=this.baseUrl+"Sections/get-sections";

    return this.httpClient.get<Section[]>(url);
  }
}
