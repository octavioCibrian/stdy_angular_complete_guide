import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  nombre: string = '';
  edad!: number;

  constructor(private userService: UserService) {}

  onSubmit() {
    const newUser: User = { nombre: this.nombre, edad: this.edad };
    this.userService.addUser(newUser);
    this.nombre = '';
    this.edad = 0;
  }
}
