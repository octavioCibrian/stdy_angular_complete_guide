import { Component, computed, inject, input, OnChanges, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html', styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit{
  userId = input.required<string>();
  private userService = inject(UsersService);
  private activatedRout = inject(ActivatedRoute);

  userName = computed(()=> this.userService.users.find(user => user.id === this.userId()))


  ngOnInit(): void {

  }
}
