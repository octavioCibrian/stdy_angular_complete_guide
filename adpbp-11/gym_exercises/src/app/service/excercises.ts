import { Injectable } from '@angular/core';


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
export class Excercises {

}
