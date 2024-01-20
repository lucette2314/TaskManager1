import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itask } from '../interface/itask';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getTasks(){
    return this.http.get<Itask[]>('http://localhost:3000/tasks');
  }
  deleteTask(task_id: number){
    return this.http.delete<any>(`http://localhost:3000/tasks/${task_id}`);
  }
  createTask(formData: any){
    return this.http.post<Itask>('http://localhost:3000/tasks', formData);
  }
  getTask(task_id: number){
    return this.http.get<Itask>(`http://localhost:3000/tasks/${task_id}`);
  }
  updateTask(task_id:number, formData: any){
    return this.http.patch<Itask>(`http://localhost:3000/tasks/${task_id}`, formData);
  }
}
