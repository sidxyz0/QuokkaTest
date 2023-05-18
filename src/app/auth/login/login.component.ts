import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { creds } from '../../creds';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.initializer();
  }

  initializer() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit(): void {
    localStorage.clear()
  }

  login() {
    if (this.loginForm.invalid) {
      this.toastr.error("Please enter proper information to login")
    }
    else {
      let success:boolean = false;
      creds.forEach((obj: any) => {
        if (obj.email == this.loginForm.value.email && obj.password == this.loginForm.value.password) {
          success = true;
        }
      })
      if(!success){
        this.toastr.error("Invalid credentials")
      }
      else{
        localStorage.setItem('userCreds',JSON.stringify(this.loginForm.value))
        this.router.navigate(['/dashboard']);
      }
    }
  }

}
