import { Component, OnInit , ElementRef } from '@angular/core';
import { Todo } from './todo'; 
import { FormControl ,FormGroup , FormBuilder , Validators } from '@angular/forms'
import { ApiServiceService } from './api-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'todoApp';
  

}
