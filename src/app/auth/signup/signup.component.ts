import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  signUpRequestPayload: SignupRequestPayload;
  constructor(private authService : AuthService,private router:Router,private toastr :ToastrService ) { 
    this.signUpRequestPayload={
      email:'',
      username:'',
      password:''
    }
  }

  ngOnInit(): void {
    this.signUpForm=new FormGroup({
      username:new FormControl('', Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required),
    })
  }
  signup():void{
    this.signUpRequestPayload.email=this.signUpForm.get('email')?.value
    this.signUpRequestPayload.username=this.signUpForm.get('username')?.value
    this.signUpRequestPayload.password=this.signUpForm.get('password')?.value
    this.authService.signup(this.signUpRequestPayload) .subscribe(() => {
      this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
    }, () => {
      this.toastr.error('Registration Failed! Please try again');
    });
  }

}
