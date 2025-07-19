import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';
import { EmmiterService } from './emmiter.service';
import { HttpService } from './http.service';
import { GemWalletConnectService } from './gem-wallet-connect.service';
import { WalletService } from './wallet.service';
import { WalletConnectService } from './wallet-connect.service';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {
  public _walletConnectSubscription: any = null;
  constructor(private cacheService: CacheService,
    private event: EmmiterService,
    private walletConnectService: WalletConnectService,
    private router: Router, private walletService: WalletService) { }

  async walletConnectHandler(walletType: string) {
    const self = this;

    switch (walletType) {
      case environment.WALLET_TYPE.WALLET_CONNECT: return await self.walletConnect();
      default:
        console.log('unhandled Wallet connect');
        return false;
    }
  }
  async walletConnect() {
    try {
      const self = this;
      await self.walletConnectService.connect();
      self._walletConnectSubscription = this.event.WalletConnectStateChange.subscribe((account: any) => {
        const stateObj = {
          account: account[0],
          walletType: environment.WALLET_TYPE.WALLET_CONNECT
        }
        self.cacheService.set('walletObj', JSON.stringify(stateObj));
        self.cacheService.set('walletAddress', stateObj.account);
        self.cacheService.set('walletType', stateObj.walletType);
        self.cacheService.set('active', 'true');
        self.event.setAuth(true);
        return stateObj;
      });
    } catch (error: any) {
      console.log('Error in walletconnect connectivity')
      throw new Error(error.message || 'Error while connecting walletconnect');
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