import { Component, computed, inject, input, OnChanges, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink, ResolveFn, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../user/user.model';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html', styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit{
  userName = input.required<User>();
  private activateRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activateRoute.data.subscribe(data=> {
      console.log(data);

    })
  }
}

export const resolveUserName:ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const userService = inject(UsersService)
  const userName = userService.users.find(user => user.id === activatedRoute.paramMap.get('userId'))
  ?.name || '';
  return userName;
}
