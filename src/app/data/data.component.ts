import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../service/crud.service";
import {Task} from "./task";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit{

  taskObject :Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService:CrudService) {
  }

  ngOnInit() :void{
    this.editTaskValue='';
    this.addTaskValue = '';
    this.taskObject = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  addTask(){
    this.taskObject.desc = this.addTaskValue
    this.crudService.addTask(this.taskObject).subscribe(res=> {
        this.ngOnInit();
        this.addTaskValue = '';
      },err=>{
        alert(err);
      }
    )
  }

  private getAllTask() {
    this.crudService.getAllTask().subscribe(res=>{
      this.taskArr = res;
    },err=>{
      alert("Unable to get list of tasks");
    })
  }
  editTask(){
    this.taskObject.desc = this.editTaskValue;
    this.crudService.editTask(this.taskObject).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert(err);
    })
  }
  deleteTask(etask:Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("Failed to delete task");
    })
  }
  call (etask: Task)  {
    this.taskObject = etask;
    this.addTaskValue = etask.desc;
  }
}
