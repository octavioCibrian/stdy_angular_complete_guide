import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form'); //NOTE: This is a signal
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');
      if(savedForm) {
        console.log(savedForm);

        const loadedFormData = JSON.parse(savedForm).email;
        setTimeout(()=> {
          this.form().controls['email'].setValue(loadedFormData);
        },1)

      }

      const subscription = this.form().valueChanges?.
      pipe(debounceTime(500)).subscribe((value) => {
        window.localStorage.setItem('saved-login-form',
           JSON.stringify(value));
        console.log(value);
      });

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      });
    });
  }

  onSubmit(formData: NgForm) {
    if (!formData.valid) {
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;
    console.log(enteredEmail, enteredPassword);
    formData.form.reset();
    // NOTE: tienes metodos en el form como markAsTocuhed, o removeValidators
  }
}
