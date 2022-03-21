import { Task } from './../../models/task';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [] //array of tasks

  constructor() { }
  ngOnInit(): void {
  }

  add(title: string): void {
    let task = new Task();  //object from task
    task.title = title;
    this.tasks.push(task);
  }

  update(task: Task): void {
    task.isDone != task.isDone;
  }

  delete(index: number): void {
    this.tasks.splice(index, 1)
  }
  
}
