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
}
