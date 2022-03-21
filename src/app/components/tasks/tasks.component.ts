import { Task } from './../../models/task';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [] ; //array of tasks
  firstName:string="Mona";
  
  constructor() { }
  ngOnInit(): void {
  }

  add(title: string): void {
    let task = new Task();  //object from task
    task.title = title;
    this.tasks.push(task);
    Swal.fire(
      'Task added successfuly!',
      '',
      'success'
    )
  }

  update(task: Task): void {
    task.isDone =! task.isDone;
  }

  delete(index: number): void {
    // this.tasks.splice(index, 1)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasks.splice(index, 1) //fun. to delete task
        Swal.fire(
          'Deleted!',
          'Your Task has been deleted.',
          'success'
        )
      }
    })
  }

  getPindingTasksCount():number{
    return this.tasks.filter(task=>!task.isDone).length;
  }
  
}
