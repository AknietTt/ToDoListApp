import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Task } from '../data/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL:string;

  constructor(private http:HttpClient) {
    this.serviceURL = "http://localhost:8080/"//  TO DO
  }
  addTask(task:Task):Observable<Task>{
    return this.http.post<Task>(this.serviceURL+"/post",task);
  }
  getAllTask():Observable<Task[]>{
    return this.http.get<Task[]>(this.serviceURL);
  }
  deleteTask(task:Task):Observable<Task>{
    return this.http.delete<Task>(this.serviceURL+'/delete/'+task.id);
  }
  editTask(task:Task):Observable<Task>{
    return this.http.put<Task>(this.serviceURL+'/update/'+task.id,task);
  }
}
