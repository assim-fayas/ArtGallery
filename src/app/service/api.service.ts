import { Injectable, inject } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http:HttpClient=inject(HttpClient)

private api='https://jsonplaceholder.typicode.com'





  constructor() { }


listUsers(){
  return this.http.get(`${this.api}/users`).pipe(tap(response=>{
  
      return response
    }),
   catchError((error)=>{
    return throwError(()=>error)
   }),
  
  )

  }







}
