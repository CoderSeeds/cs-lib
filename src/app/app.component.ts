import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cs-lib';

  loginForm = this.formBuilder.group({
    email:  ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  constructor(private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe((value) => {
      console.log(value)
    })
  }
}
