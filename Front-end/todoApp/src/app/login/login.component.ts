import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { User } from '../User';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  users : Array<User> = [];
  message:string;
  constructor(private formBuilder: FormBuilder ,private _apiService : ApiServiceService , private cookieService: CookieService , private  router: Router ) {
    this.userForm = formBuilder.group({
      username : new FormControl(null,[Validators.required]),
      password : new FormControl(null,[Validators.required])
    })
  }
   
  ngOnInit(): void {
    
  }
  
  login()
  {
   let user:User= new User(this.userForm.value.username ,  this.userForm.value.password)

   this._apiService.loginInUser(user).subscribe(
    (response) => {
      console.log(response.message)
      if(response.message == undefined)
      {
        
        this.cookieService.set('jwt',response.token)
        this.message = "";
        this.router.navigate(['home']);

      }
      else
      {
        this.message= response.message;
      }
      
      
     
    },(error)=>{console.log(error)})
  }

}
