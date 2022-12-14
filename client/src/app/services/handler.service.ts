import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlgoSignerService } from './algo-signer.service';
import { CacheService } from './cache.service';
import { EmmiterService } from './emmiter.service';
import { HttpService } from './http.service';
import { MyAlgoService } from './my-algo.service';
import { WalletConnectService } from './wallet-connect.service';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {
  public _walletConnectSubscription: any = null;
  constructor(private algoSignerService: AlgoSignerService,
    private myAlgoService: MyAlgoService,
    private walletConnectService: WalletConnectService,
    private cacheService: CacheService,
    private event: EmmiterService,
    private router: Router) { }

  async walletConnectHandler(walletType: string) {
    const self = this;

    switch (walletType) {
      case environment.WALLET_TYPE.ALGO_SIGNER: return await self.algoSignerConnect();
      case environment.WALLET_TYPE.MY_ALGO_WALLET: return await self.myAlgoWalletConnect();
      case environment.WALLET_TYPE.WALLET_CONNECT: return await self.walletConnect();
      default:
        console.log('unhandled Wallet connect');
        return false;
    }
  }
  async algoSignerConnect() {
    try {
      const self = this;
      await self.algoSignerService.check();
      await self.algoSignerService.connect();
      const account = await self.algoSignerService.getAccounts();
      if (!account.length) {
        throw { message: 'No account found on selected network' };
      }
      const stateObj = {
        account: account[0]['address'],
        walletType: environment.WALLET_TYPE.ALGO_SIGNER
      }
      self.cacheService.set('walletObj', JSON.stringify(stateObj));
      self.cacheService.set('walletAddress', stateObj.account);
      self.cacheService.set('walletType', stateObj.walletType);
      self.cacheService.set('active', 'true');
      self.event.setAuth(true);
      return stateObj;

    } catch (error: any) {
      console.log('Error in algosigner connectivity')
      throw new Error(error.message || 'Error while connecting algo signer');
    }
  }
  async myAlgoWalletConnect() {
    try {
      const self = this;
      const account = await self.myAlgoService.connect();
      if (!account.length) {
        throw { message: 'No account found on selected network' };
      }
      const stateObj = {
        account: account[0]['address'],
        walletType: environment.WALLET_TYPE.MY_ALGO_WALLET
      }
      self.cacheService.set('walletObj', JSON.stringify(stateObj));
      self.cacheService.set('walletAddress', stateObj.account);
      self.cacheService.set('walletType', stateObj.walletType);
      self.cacheService.set('active', 'true');
      self.event.setAuth(true);
      return stateObj;

    } catch (error: any) {
      console.log('Error in myalgowallet connectivity')
      throw new Error(error.message || 'Error while connecting my algo wallet');
    }
  }

  async walletConnect() {
    try {
      const self = this;
      await self.walletConnectService.connect();
      self._walletConnectSubscription = this.event.WalletConnectStateChange.subscribe((account: any) => {
        if (!account.length) {
          throw { message: 'No account found on selected network' };
        }
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
      case environment.WALLET_TYPE.ALGO_SIGNER: return await self.algoSignerTransfer(reqObj);
      case environment.WALLET_TYPE.MY_ALGO_WALLET: return await self.myAlgoWalletTransfer(reqObj);
      case environment.WALLET_TYPE.WALLET_CONNECT: return await self.walletConnectTransfer(reqObj);
      default:
        console.log('unhandled Wallet transfer');
        return false;
    }
  }
  async algoSignerTransfer(reqObj: any) {
    try {
      const self = this;
      const paramsRes = await self.algoSignerService.signTransaction(reqObj);
      const sendRes = await self.algoSignerService.sendTxn(paramsRes.signedTxn);
      const stateObj = {
        paramsRes,
        sendRes
      }
      return stateObj;

    } catch (error: any) {
      console.log('Error in algosigner transfer')
      throw new Error(error.message || 'Error while transfering with algo signer');
    }
  }
  async myAlgoWalletTransfer(reqObj: any) {
    try {
      const self = this;
      const paramsRes = await self.myAlgoService.signTransaction(reqObj);
      const stateObj = {
        paramsRes,
        sendRes: paramsRes.sendResp
      }
      return stateObj;

    } catch (error: any) {
      console.log('Error in algosigner transfer')
      throw new Error(error.message || 'Error while transfering with algo signer');
    }
  }

  async walletConnectTransfer(reqObj: any) {}
}