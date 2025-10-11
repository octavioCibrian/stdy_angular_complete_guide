import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExcercisesService } from './service/excercises';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private formBuilder = inject(NonNullableFormBuilder);
  private exerciseService = inject(ExcercisesService);

  exerciseList$ = this.exerciseService.getExercises();
  public entryForm = this.formBuilder.group({
    description: ['', Validators.required]
  })

  newExercise() {
    if(this.entryForm.valid) {
      const newExercise = { ...this.entryForm.value};
      this.exerciseService
        .addExercises(newExercise)
        .subscribe(
          (_) => this.exerciseList$ = this.exerciseService.getExercises())

    }
  }

  protected title = 'gym_exercises';
}
