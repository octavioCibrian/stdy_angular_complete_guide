import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule, FormArray, AbstractControl } from "@angular/forms";



function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const control1 = control.get(controlName1)?.value;
    const control2 = control.get(controlName2)?.value;

    if(control1 === control2) {
      return null;
    }

    return { valuesNotEqual: true }

  }
}
//Esto es para crear un fabric customValidator, y usarlo en en la liunea 39


@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
})
export class SignupComponent {


  formGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', {validators: [Validators.required, Validators.minLength(6)],}),
    },
    {
      validators: [this.equalsPasswords()]
    }),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
    role: new FormControl('student'),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, Validators.requiredTrue)
  })


  onSubmit(): void {
    if(this.formGroup.valid) {

      return;
    }
  }

  onReset(): void {
    this.formGroup.reset()
  }

  equalsPasswords(){
    return (control: AbstractControl) => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if(password?.value === confirmPassword?.value)
      return null;

      return { diffPasswords : true}
    }
  }
}
