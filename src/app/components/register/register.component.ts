import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FireStoreService } from '../../core/services/fire-store.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private readonly _AuthService = inject(AuthenticationService);
  private readonly _FormBuilder= inject(FormBuilder);
  private readonly _Router= inject(Router);
  private readonly _FireStoreService= inject(FireStoreService);


  msgError:string = "";

  // another better way to create form with 100 inputs
    
  registerForm: FormGroup = this._FormBuilder.group({
      

    name:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email,  Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword: [null, [Validators.required]],
    dateOfBirth:[null, [Validators.required, Validators.pattern(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]],
    gender: [null, [Validators.required, Validators.pattern(/^(male|female)$/)]],


  }, {validators: [this.confirmPassword]})


  
  // registerForm: FormGroup = new FormGroup({


  //   name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   // email must end with . then any number of characters from 3 to 6, to handle bad request errors.
  //   email: new FormControl(null, [Validators.required, Validators.email,  Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  //   rePassword: new FormControl(null),
  //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  //   // terms: new FormControl(null, [Validators.requiredTrue]),

  // }, this.confirmPassword)



  // custom validation for password confirmation
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    }
    else {
      return { mismatch: true };
    }
  }

  signUp() {
    if (this.registerForm.valid) {
      this._AuthService.signUp(this.registerForm.value).subscribe({
        next: async (res) => {
          if (res.message === 'success') {
            // add the user to our Firebase store DB
            const userData = {
              ...this.registerForm.value,          
              createdAt: new Date().toISOString(), // Assign createdAt date
              watchlist: [], // Empty watchlist for new users
              favoriteShows: [],
              posts: [],
              likes: [],
            };
            await this._FireStoreService.addUser(userData);
            this._Router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.msgError = err.error.error;
        
        },
      });
    }
  }
  

}
