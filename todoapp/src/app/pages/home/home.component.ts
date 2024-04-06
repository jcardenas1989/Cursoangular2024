import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './../../models/task.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear Componentes',
      completed: false
    },
  ]);

  changeHandler(event: Event) {
    const valorinput = event.target as HTMLInputElement;
    const newtask = valorinput.value;
    this.addTask(newtask);
    valorinput.value = "";
  }

  addTask(title: string) {
    const newtask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newtask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) =>{
      if (position === index) {
        return {
          ...task,
          completed: !task.completed
        }
      }
        return task;
      })
    })
  }
}
