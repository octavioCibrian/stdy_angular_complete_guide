import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  nombre: string;
  edad: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users$ = new BehaviorSubject<User[]>([
    { nombre: 'Octavio', edad: 30 },
    { nombre: 'Juan', edad: 25 },
    { nombre: 'Pedro', edad: 35 },
  ]);


  addUser(user: User) {
    const users = this.users$.getValue();
    this.users$.next([...users, user]);
  }
}
