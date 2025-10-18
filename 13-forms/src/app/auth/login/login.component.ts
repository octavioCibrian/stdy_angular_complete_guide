import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';


function emailIsUnique(control: AbstractControl) {
  if(control.value !== 'test@example.com') {
    return of(null)
  }
  return of({emailIsUnique: true})
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  private destroRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl('', {
      validators: [ Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [ Validators.required, Validators.minLength(6), this.mustContainQuestionMark()]
    })
  })

  //NOTE: Ya podemos hacer uso del form en ngOnInit desde un inicio por que ya lo inicializamos de esta forma
  ngOnInit(): void {
    const savedForm = window.localStorage.getItem('saved-logion-form');
    if(savedForm) {
      const form = JSON.parse(savedForm);
      this.form.patchValue({
        email: form.email
      })

    }

    const subscription = this.form.valueChanges
    .pipe(debounceTime(200))
    .subscribe({
      next: (value) => {
        window.localStorage.setItem('saved-logion-form', JSON.stringify(value))
      }
    })

    this.destroRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onSubmit() {
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);

  }

  mustContainQuestionMark() {
    return (control: AbstractControl) => {
      if(control.value.includes('?')){
          return null
        }

        return { doesNotContainQuestionMark: true}
    }

}


  get emailInsInvalid() {
    return  this.form.controls.email.touched &&
        this.form.controls.email.dirty &&
        this.form.controls.email.invalid;
  }

  get passwordInsInvalid() {
    return this.form.controls.password.touched &&
        this.form.controls.password.dirty &&
        this.form.controls.password.invalid;
  }


}
