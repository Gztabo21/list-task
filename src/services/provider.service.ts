
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { Provider } from '../interface/provider';
import { Observable } from 'rxjs';
 
@Injectable()
export class ProviderService {

    private boatListRef = this.db.list<Provider>('Provider');
 
    constructor(private db: AngularFireDatabase) { }
 
    getProviderList():Observable<any[]> {
        // return this.db.list('boat-list').valueChanges(); 
         
       return this.db.list('Provider').valueChanges();
   
    }
 
    addProvider(provider: Provider) {
        let key = this.db.list('Provider/').push(provider).key;
        //Guardamos la fruta y obetenemos el id que firebase pone al nudulo de nuestra fruta.
        //Al guardarse sin id nuestra fruta, ahora la actualizamos con el id que firebase nos devuelve.
        provider.key = key;
        this.db.database.ref('Provider/'+provider.key).set(provider);
        // return this.boatListRef.push(provider);
    }
 
    updateProvider(provider: Provider) {
        return this.db.database.ref('Provider/'+provider.key).set(provider);
        // return this.boatListRef.update(provider.key, provider);
    }
 
    removeProvider(id) {
        return this.db.database.ref('Provider/'+id).remove();
        // return this.boatListRef.remove(provider.key);
    }
}