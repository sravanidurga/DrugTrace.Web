import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder, FormArray } from '@angular/forms';
import { Utilities as U } from 'src/app/Common/Utilities/utilities';
import { Router } from '@angular/router';
import { AuthService } from '../../Common/Services/auth.service';
import { first } from 'rxjs/internal/operators/first';
import { ToastrService } from 'ngx-toastr';
import {LoginService} from './login.service';
import { config } from "../../Common/config";
import { environment } from '../../../environments/environment.prod';
import { LoginViewModel } from './login-view-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forgotpasswordForm: FormGroup;
  showSpinner = false;
  environment=environment;
  loginForm:FormGroup;
  submitted = false;
  showLogin: boolean = true;
  loginViewModel:LoginViewModel;
  constructor(
    private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private loginService:LoginService

  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required])
  });
  this.forgotpasswordForm = this.generatePasswordFormGroup();
   }

  ngOnInit() {
    // this.generateFormGroup(this.loginObject);
  }
     // convenience getter for easy access to form fields
  get loginFormGroup() { return this.loginForm.controls; }
  get forgotPasswordFormGroup() { return this.forgotpasswordForm.controls; }
  login(){
    this.submitted = true;
    let loginDetails = this.loginForm.value;
    if (this.loginForm.invalid) {
      this.toastr.error('PLEASE REVIEW THE INFORMATION YOU HAVE ENTERED');
      return;
  }
    this.loginService.Login(loginDetails).subscribe(
      (data) =>{
         console.log(data);
       if(data.Results.Result == 1) 
       {
           this.loginViewModel = data;
            if (U.isValidObject(environment)
            && !U.isNullOrEmpty(loginDetails.userName)
            && !U.isNullOrEmpty(loginDetails.password)) {
            this.showSpinner = true;
            this.authService.login(loginDetails.userName, loginDetails.password)
                .pipe(first())
                .subscribe((data) => {
                    this.submitted = false;
                    if (data != null) {
                        this.router.navigateByUrl('/dashboard');// TODO: Implement better authorized redirection.
                    }
                }, (err) => {
                    this.showSpinner = false;
                 //this.commonService.handleError(err);
                })
        }
        // this.router.navigateByUrl('/dashboard');
       }
       else
       {
         this.toastr.error('PLEASE REVIEW THE INFORMATION YOU HAVE ENTERED');
       }
        //  this.submitted = false;
      }
    )
     
  }

  openPopup() {
    this.showLogin = false;
    this.forgotpasswordForm = this.generatePasswordFormGroup();
}
onForgotPasswordSubmit(){
  this.submitted = true;
  if (this.forgotpasswordForm.invalid) {
    this.toastr.error('PLEASE REVIEW THE INFORMATION YOU HAVE ENTERED');
    return;
}
   this.loginService.ResetPassword(this.forgotpasswordForm.value.username).subscribe(
     (data)=>{
        if(data.Results.Status == true)
        {
          this.toastr.success('PASSWORD RESET LINK SENT SUCCESSFULLY TO REGISTERED EMAIL');
          this.submitted = false;
          this.router.navigateByUrl('/login');
        }
        else
        {
          this.toastr.error('PLEASE ENTER VALID USERNAME');
        }
     }
   )
}
closeForgotPassword() {
  this.showLogin = true;
  this.forgotpasswordForm = this.generatePasswordFormGroup();
}
generatePasswordFormGroup() {
  return new FormGroup({
      username: new FormControl('', [Validators.required])
  });
}
}
