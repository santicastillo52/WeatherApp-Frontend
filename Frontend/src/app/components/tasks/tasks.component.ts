import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

import { TasksService } from '../../core/services/tasks.service';
import { Tasks } from '../../models/tasks.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit, OnDestroy {
  private readonly tasksService = inject(TasksService);
  private readonly subscription = new Subscription();
  
  tasks!: Tasks[];

  ngOnInit(): void {
    this.getTasks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getTasks(): void {
    this.subscription.add(
      this.tasksService.getTasks().subscribe({
        next: (res) => {
          this.tasks = res;
        },
        error: (error) => {
          console.error('Ha ocurrido un error', error);
        },
      })
    );
  }
}
