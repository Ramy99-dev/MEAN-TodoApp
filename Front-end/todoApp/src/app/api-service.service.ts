import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Todo } from './todo';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient:HttpClient   ) { }
  addTodo(todo:Todo):Observable<any>{
    console.log(todo)
    return  this.httpClient.post("http://localhost:5050/add-todo",JSON.stringify(todo),{headers:this.httpHeaders})
  }
  getAllTodo(cookieValue:string):Observable<any>{
    console.log(cookieValue)
    return  this.httpClient.post("http://localhost:5050/get-alltodo",{"cookieValue":cookieValue})
  }
  deleteTodo(id:any):Observable<any>{
    
    return  this.httpClient.delete("http://localhost:5050/delete-todo/"+id)
  }

  addUser(user:User):Observable<any>{
    
    return  this.httpClient.post("http://localhost:5050/register/",user)
  }
  loginInUser(user:User):Observable<any>{
    
    return  this.httpClient.post("http://localhost:5050/login/",user,{responseType: 'json'})
  }
}
