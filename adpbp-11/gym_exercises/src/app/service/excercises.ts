import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


export interface Excercise {
  id?: string;
  description: string;
}

export type ExerciseList = Array<Excercise>;
export interface ExerciseListAPI {
  hasNext: boolean;
  items: ExerciseList
}

@Injectable({
  providedIn: 'root'
})
export class ExcercisesService {
  private httpClient = inject(HttpClient)
  private url = 'http://localhost:3000/exercises';

  getExercises(): Observable<ExerciseList> {
    return this.httpClient
      .get<ExerciseListAPI>(this.url)
      .pipe(map((api)=> api?.items));
  }

  addExercises(exercises: Partial<Excercise>): Observable<Excercise> {
    return this.httpClient.post<Excercise>(this.url, exercises);
  }

}
