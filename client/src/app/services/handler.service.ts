import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';
import { EmmiterService } from './emmiter.service';
import { HttpService } from './http.service';
import { GemWalletConnectService } from './gem-wallet-connect.service';
import { WalletService } from './wallet.service';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {
  public _walletConnectSubscription: any = null;
  constructor(private cacheService: CacheService,
    private event: EmmiterService,
    private gemWalletService: GemWalletConnectService,
    private router: Router, private walletService: WalletService) { }

  async walletConnectHandler(walletType: string) {
    const self = this;

    switch (walletType) {
      case environment.WALLET_TYPE.GEM_WALLET: return await self.gemWalletConnect();
      default:
        console.log('unhandled Wallet connect');
        return false;
    }
  }
  async gemWalletConnect() {
    try {
      const self = this;
      await self.gemWalletService.connect();
      const account = await self.gemWalletService.getAddress();
      const network = await self.gemWalletService.getNetwork();
      const stateObj = {
        account: account,
        walletType: environment.WALLET_TYPE.GEM_WALLET
      }
      self.cacheService.set('network', network);
      self.cacheService.set('walletObj', JSON.stringify(stateObj));
      self.cacheService.set('walletAddress', stateObj.account);
      self.cacheService.set('walletType', stateObj.walletType);
      self.cacheService.set('active', 'true');
      const { data } = await self.walletService.fetchAccountBalance(account)
      const { usdAmountObj: { balance = '0.00' }      } = data;
      self.event.setAccountInfo({ amount:balance })
      self.event.setAuth(true)
      return stateObj;
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