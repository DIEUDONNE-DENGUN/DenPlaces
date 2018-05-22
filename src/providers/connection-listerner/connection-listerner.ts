import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ConnectionListernerProvider {
  onDevice: boolean;
  // selected_place:any=null;

  private selected_place = new BehaviorSubject<any>(null); // true is your initial value
  selectedPlaceObserve$ = this.selected_place.asObservable();

  constructor(public platform: Platform, public network: Network, ) {
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    if (this.onDevice && this.network.type) {
      return this.network.type !== "none";
    } else {
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if (this.onDevice && this.network.type) {
      return this.network.type === "none";
    } else {
      return !navigator.onLine;
    }
  }

  //update or set selected place


   setSelectedPlace(value: any) {
    this.selected_place.next(value);
    console.log('isFixed changed', value);
  }

   getSelectedPlace():any {
    return this.selected_place.getValue()
  }
}
