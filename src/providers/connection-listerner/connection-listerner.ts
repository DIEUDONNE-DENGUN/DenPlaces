import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';


@Injectable()
export class ConnectionListernerProvider {
  onDevice: boolean;

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
}
