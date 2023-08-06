import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { WalletService } from './wallet.service';
declare let GemWalletApi: any;
@Injectable({
  providedIn: 'root'
})
export class GemWalletConnectService {
  constructor(private httpClient: HttpService, private walletService: WalletService) { }

  async connect() {
    const self = this;
    try {
      const connectResp = await GemWalletApi.isConnected()
      return connectResp;
    } catch (err: any) {
      throw new Error(err.message || 'Error while connecting to Gem Wallet');
    }
  }
  async getNetwork() {
    const self = this;
    try {
      const connectResp = await GemWalletApi.getNetwork()
      return connectResp;
    } catch (err: any) {
      throw new Error(err.message || 'Error while fetching Gem wallet network');
    }
  }

  async getAddress() {
    const self = this;
    try {
      const connectResp = await GemWalletApi.getAddress()
      return connectResp;
    } catch (err: any) {
      throw new Error(err.message || 'Error while fetching Gem wallet address');
    }
  }
  async sendTransaction(reqObj: any) {
    const self = this;
    try {
      const payment = {
        destination: environment.GEM_HOT_WALLET,
        currency: "USD",
        issuer: environment.GEM_WALLET_ISSUER,
        amount: String(reqObj.amount)
      };
      await self.connect()
      const response = await GemWalletApi.sendPayment(payment)
      console.log(response)
      if (response) {
        return response
      }
      throw new Error('Error while sending payment, please try after sometime.');
    } catch (err: any) {
      throw new Error(err.message || 'Error while sending payment to Gem wallet address');
    }
  }
  async getBalance(account) {
    const balance = await this.walletService.fetchAccountBalance(account)
  }
}
