
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
 

  private readonly _FormBuilder =inject(FormBuilder);
  private readonly _Router =inject(Router);
  private readonly _AuthService =inject(AuthenticationService);


  //  global properties
  isLoading: boolean = false;
  msgError: string = "";

  //  form initialization
 
  LoginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email,  Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
  })
// logic for submitting login form
  login() {
    if (this.LoginForm.valid) {
      // this.isLoading = true;
      this._AuthService.signIn(this.LoginForm.value).subscribe({
        next: (res: any) => {
          // console.log(res);
          if (res.message === 'success') {

            // save token
            localStorage.setItem('S&MToken', res.token);
            //  decode token
            // this._AuthService.decodeUserData();
             //  navigation to home page
            this._Router.navigate(['/home']);
          
          }
          
          // this.isLoading = false;
        },
        error: (err: any) => {

          
          
          //  
          this.msgError = err.error.error;
          this.isLoading = false;
        }
       
      })
    }
    else{
      this.LoginForm.markAllAsTouched();
    }
    
  }
}
