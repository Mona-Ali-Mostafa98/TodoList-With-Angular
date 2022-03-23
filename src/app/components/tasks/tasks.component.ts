import { Task } from './../../models/task';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [] ; //array of tasks
  firstName:string="Mona";
  
  constructor(private _httpClient:HttpClient) { }

  ngOnInit(): void {
    this._httpClient.get(`https://api.mohamed-sadek.com/task/get`)
    .subscribe(
      (response:any)=>{
        console.log(JSON.stringify(response));
        this.tasks=response.Data;
      }
      ,
      (error:any)=>{
        alert("error");
      }
    );
    //alert("alert 2");

  }

  add(Title: string): void {
    let task = new Task();  //object from task
    task.Title = Title;
    this._httpClient.post(`https://api.mohamed-sadek.com/task/post`, task)
    .subscribe(
      (response:any)=>
      {
        this.tasks.push(task);
      },
      (error:any)=>{ alert("error")}
      );
    
    Swal.fire(
      'Task added successfuly!',
      '',
      'success'
    )
  }

  update(task: Task): void {
    task.IsDone =! task.IsDone;
    // part add using api 
    this._httpClient.put(`https://api.mohamed-sadek.com/task/put`, task)  //task object that url need to update
    .subscribe(
      (response:any)=>{
      },
      (error:any)=>{alert("error")}
    )
  }

  delete(index: number): void {
    let task=this.tasks[index];  //create object from task to get id of task to use in api
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
        // 77 - 84 delete task using api 
        this._httpClient.delete(`https://api.mohamed-sadek.com/Task/Delete?id=${task.ID}`)
        .subscribe(
          (response:any)=>{
            this.tasks.splice(index,1);
          },
          (error:any)=>{}
        );
        Swal.fire(
          'Deleted!',
          'Your Task has been deleted.',
          'success'
        )
      }
    })
  }

  getPindingTasksCount():number{
    return this.tasks.filter(task=>!task.IsDone).length;
  }
  
}
