import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Itask } from '../interface/itask';
import { TasksService } from '../services/tasks.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule, RouterLink],
})
export class Tab1Page {
  //property
  tasks!: Itask[];

  constructor(private tasksService: TasksService) {
    this.getTask();
  }

  ngOnInit(){
    console.log("entrar")
     this.getTask(); 
  }

  deleteTask(taskId: number) {
    if (confirm("Are you sure you want to delete this Task?")) {
      this.tasksService.deleteTask(taskId).subscribe((results) => {
        this.getTask();
      })
    }
  }

  getTask() {
    this.tasksService.getTasks().subscribe((results) => {
      this.tasks = results;
    });
  }
}
