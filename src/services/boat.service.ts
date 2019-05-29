
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { Boat } from '../interface/boat';
import { Observable } from 'rxjs';
 
@Injectable()
export class BoatService {

    private boatListRef = this.db.list<Boat>('boat-list');
 
    constructor(private db: AngularFireDatabase) { }
 
    getBoatList():Observable<any[]> {
        // return this.db.list('boat-list').valueChanges(); 
         
     return this.db.list('boat-list').valueChanges();
   
    }
 
    addBoat(boat: Boat) {
        let key = this.db.list('boat-list/').push(boat).key;
        //Guardamos la fruta y obetenemos el id que firebase pone al nudulo de nuestra fruta.
        //Al guardarse sin id nuestra fruta, ahora la actualizamos con el id que firebase nos devuelve.
        boat.key = key;
        this.db.database.ref('boat-list/'+boat.key).set(boat);
    
        // return this.boatListRef.push(boat);
    }
 
    updateBoat(boat:Boat) {
        return this.db.database.ref('boat-list/'+boat.key).set(boat);
    }
 
    removeBoat(id) {
        return this.db.database.ref('boat-list/'+id).remove();
    }
}