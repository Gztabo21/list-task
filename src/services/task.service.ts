
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { Task } from '../interface/task';
import { Observable } from 'rxjs';
 
@Injectable()
export class TaskService {

    private boatListRef = this.db.list<Task>('task');
 
    constructor(private db: AngularFireDatabase) { }
 
    getTaskList():Observable<any[]> {
        // return this.db.list('boat-list').valueChanges(); 
         
       return this.db.list('task').valueChanges();
   
    }
    getTaskListbyBoat(id):Observable<any[]> {
        // return this.db.list('boat-list').valueChanges(); 
         
       return this.db.list('task/').valueChanges();
   
    }
 
    addTask(task: Task) {
        let key = this.db.list('task/').push(task).key;
        task.key = key;
        this.db.database.ref('task/'+task.key).set(task);
    }
 
   
    updateTask(task: Task) {
        return this.db.database.ref('task/'+task.key).set(task);
    }
 
    removeTask(id) {
        return this.db.database.ref('task/'+id).remove();
    }
}