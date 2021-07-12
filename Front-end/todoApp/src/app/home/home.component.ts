import { Component, OnInit , ElementRef } from '@angular/core';
import { Todo } from '../todo'; 
import { FormControl ,FormGroup , FormBuilder , Validators } from '@angular/forms'
import { ApiServiceService } from '../api-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todoForm: FormGroup;
  todos : Array<Todo> = [];
  text;
  user:String;
  constructor( private formBuilder: FormBuilder ,private _apiService : ApiServiceService , private elem: ElementRef,private cookieService : CookieService, private  router: Router )
  {
 
    this.todoForm = formBuilder.group({
      act : new FormControl(null,[Validators.required])
    })
  }
  ngOnInit(): void {
   if(this.cookieService.get('jwt')=='')
   {
    this.router.navigate(['login']);

   }
   else
   {
    this._apiService.getAllTodo(this.cookieService.get('jwt')).subscribe(
      (response) => {
      console.log(response)
      this.todos = response.todo;
      this.user = response.user;
      console.log(this.todos)
      },(error)=>{console.log(error)}
    )
   }
    
  }
  add()
  {
    var todo :Todo = new Todo(this.todoForm.value.act);
    this.todos.push(todo);
    this.text ="";
    this._apiService.addTodo(todo).subscribe(
      (response) => {
        
       
      },(error)=>{console.log(error)}
    )
    
  }

  delete(id , i:number)
  {
    this.todos.splice(i,1)
    this._apiService.deleteTodo(id).subscribe(
      (response) => {
       console.log(response)
       
      },(error)=>{console.log(error)}
    )
  }

  done(id , i:number)
  {
    console.log(i)
   this.elem.nativeElement.querySelectorAll('.text')[i].style.textDecoration = "line-through";
    this._apiService.deleteTodo(id).subscribe(
      (response) => {
       console.log(response)
       
      },(error)=>{console.log(error)}
    )
  }

  logout(e)
  {
    e.preventDefault()
    this.cookieService.deleteAll("jwt")
    this.router.navigate(['login']);
  }

}
