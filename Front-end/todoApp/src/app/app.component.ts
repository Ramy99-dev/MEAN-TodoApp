import { Component, OnInit , ElementRef } from '@angular/core';
import { Todo } from './todo'; 
import { FormControl ,FormGroup , FormBuilder , Validators } from '@angular/forms'
import { ApiServiceService } from './api-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todoApp';
  todoForm: FormGroup;
  todos : Array<Todo> = [];
  text;

  constructor( private formBuilder: FormBuilder ,private _apiService : ApiServiceService , private elem: ElementRef)
  {
    this.todoForm = formBuilder.group({
      act : new FormControl(null,[Validators.required])
    })
  }
  ngOnInit(): void {
    this._apiService.getAllTodo().subscribe(
      (response) => {
      this.todos = response;
    
      console.log(this.todos)
      },(error)=>{console.log(error)}
    )
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

}
