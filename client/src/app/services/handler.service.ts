import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';
import { EmmiterService } from './emmiter.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {
  public _walletConnectSubscription: any = null;
  constructor(private cacheService: CacheService,
    private event: EmmiterService,
    private router: Router) { }

  async walletConnectHandler(walletType: string) {
    const self = this;

    switch (walletType) {
      default:
        console.log('unhandled Wallet connect');
        return false;
    }
  }

  async walletTransfertHandler(reqObj: any): Promise<any> {
    const self = this;
    const walletType = self.cacheService.get('walletType');
    switch (walletType) {
      default:
        console.log('unhandled Wallet transfer');
        return false;
    }
  }
}