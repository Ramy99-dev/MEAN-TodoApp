import { Component, OnInit } from '@angular/core';
import { User } from '../User'; 
import { FormControl ,FormGroup , FormBuilder , Validators } from '@angular/forms'
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  users : Array<User> = [];
  constructor(private formBuilder: FormBuilder ,private _apiService : ApiServiceService ,   private  router: Router  ) {
    this.userForm = formBuilder.group({
      username : new FormControl(null,[Validators.required]),
      password : new FormControl(null,[Validators.required])
    })
  }
   
  ngOnInit(): void {
    
  }
  
  register()
  {
   let user:User= new User(this.userForm.value.username ,  this.userForm.value.password)
  
   this._apiService.addUser(user).subscribe(
    (response) => {
      
     
    },(error)=>{console.log(error)})
    this.router.navigate(['login'])
  }
  ;
}
