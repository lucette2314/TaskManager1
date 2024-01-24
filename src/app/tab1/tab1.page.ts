import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Itask } from '../interface/itask';
import { TasksService } from '../services/tasks.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonCard, IonCardHeader, IonButton, IonCardContent, IonCardTitle, IonItem, IonIcon} from '@ionic/angular/standalone';
import { create, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule, RouterLink, IonCard, IonCardHeader, IonButton, IonCardContent, IonCardTitle,
            IonItem, IonIcon],
})
export class Tab1Page {
  //property
  tasks!: Itask[];

  constructor(private tasksService: TasksService) {
    addIcons({create, trashOutline})
    this.getTask();
  }

  ionViewDidEnter(){
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
