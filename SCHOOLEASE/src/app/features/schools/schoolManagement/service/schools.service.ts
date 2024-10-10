import { Injectable } from '@angular/core';
import {environment} from "../../../../../environment/environment"
import { HttpClient } from '@angular/common/http';
import { Universities } from '../model/universities';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SchoolsService {
  private apiUrl :{apiUrl:string} = environment;


  constructor(private http:HttpClient) {
    
 
   }
   public getUniversities(): Observable<Universities[]>{
       return this.http.get<Universities[]>(`${this.apiUrl}univ/getUniv`);
   }

   public addUniversities()
}
