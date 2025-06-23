import { Component, inject } from '@angular/core';
import { TasksService } from '../../core/services/tasks.service';
import { Tasks } from '../../models/tasks.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  private tasksService = inject(TasksService);
  tasks!: Tasks[];
  subscription = new Subscription();

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
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



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
