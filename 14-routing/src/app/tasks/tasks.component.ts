import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  // order = input<'asc' | 'desc'>();
  order = signal<'asc' | 'desc'>('desc');
  message = input<string>();

  private destroyRef = inject(DestroyRef);

  private tasksService = inject(TasksService);
  userTasks = computed(() => this.tasksService
  .allTasks().
  filter((task: any) => task.userId === this.userId())
  .sort((a: Task, b: Task) => {
    if(this.order() === 'desc') {
      return a.id > b.id ? -1 : 1;
    } else {
      return a.id > b.id ? 1: -1;
    }
  }))


  private activateRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    console.log(this.message());

    const subscription = this.activateRoute.queryParams.subscribe((params)=> {
      this.order.set(params['order']);
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}
