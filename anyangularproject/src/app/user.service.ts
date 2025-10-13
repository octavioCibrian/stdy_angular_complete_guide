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
  public users$ = new BehaviorSubject<User[]>([]);
  // users$ = this.users$.asObservable();

  addUser(user: User) {
    const users = this.users$.getValue();
    this.users$.next([...users, user]);
  }
}
