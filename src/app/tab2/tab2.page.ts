import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { TasksService } from '../services/tasks.service';
import { Itask } from '../interface/itask';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IonItem, IonLabel, IonDatetime, IonSelect, IonSelectOption, IonList, IonButton, IonAlert, IonDatetimeButton, IonRow, IonCol} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, FormsModule, ReactiveFormsModule, CommonModule, RouterLinkActive, RouterLink, RouterOutlet,
            IonItem, IonLabel, IonDatetime, IonSelect, IonSelectOption, IonList, IonButton, IonAlert, IonDatetimeButton, IonRow, IonCol],
})
export class Tab2Page {
  
  title: string = "Add New Task";
  taskForm: FormGroup;
  isEditMode: boolean = false;
  editTaskId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    private route: ActivatedRoute,
    private router: Router) {

    //Create form group and controls
    this.taskForm = formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      task_date: ['', [Validators.required]],
      priority_level: ['', [Validators.required]],
      progress_level: ['', [Validators.required]],
    });
    this.validateEditmode();
  }

  validateEditmode() {
    let id = this.route.snapshot.paramMap.get("task-id");
   
      if(id){
        console.log("id", id)
      this.isEditMode = true;
      this.title = "Edit Task"
      this.editTaskId = parseInt (id);
      //Fetch edit student
      this.taskService.getTask(this.editTaskId).subscribe(result => {
        this.taskForm.patchValue(result); //Populate web form with database data
        console.log(result);
      })
    }
  }
  alertButtons = ['Action']
  onSubmit() {
    const formData = this.taskForm.value;
    if (this.isEditMode) {
      //Update Task
      this.taskService.updateTask(this.editTaskId, formData).subscribe((result) => {
        console.log(result);
        alert('Task was updated successfully');
        this.router.navigate(["/tabs/tab1"]);
      });
    }
    else {
      //Create Task
      this.taskService.createTask(formData).subscribe((result) => {
        console.log(result);
        alert('Task was created successfully');
        this.taskForm.reset(); //Clear web form data
      });
    }
  }
}