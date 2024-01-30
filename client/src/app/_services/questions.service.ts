import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Question } from '../Models/Canvas/question.dto';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  baseUrl:string=environment.apiUrl;

  constructor(private httpClient:HttpClient) { }


  getQuestions()
  {
    const url=this.baseUrl+"Questions/get-questions";

    return this.httpClient.get<Question[]>(url);
  }


  getQuestionsBySectionId(sectionId:number)
  {
    const url=this.baseUrl+"Questions/get-questions-by-section-id/"+sectionId;

    return this.httpClient.get<Question[]>(url);

  }
}
