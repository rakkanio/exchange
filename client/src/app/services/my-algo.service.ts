import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
declare let MyAlgoConnect: any;

@Injectable({
  providedIn: 'root'
})
export class MyAlgoService {
  private myAlgo = new MyAlgoConnect();
  constructor(private httpClient: HttpService) { }

  async connect() {
    const self = this;
    try {
      const connectResp = await self.myAlgo.connect();
      return connectResp;
    } catch (err: any) {
      throw new Error(err.message || 'Error while connecting to Algo Wallet');
    }
  }
  async signTransaction(payload: any): Promise<any> {
    let self = this;
    const reqObj = {
      uri: `/algo/account/sign-transaction`,
      body: payload
    };
    return new Promise((resolve, reject) => {
      self.httpClient.post(reqObj)
        .subscribe(async (res: any) => {
          try {
            console.log(res);
            const signedTxn = await self.myAlgo.signTransaction(new Uint8Array(Object.values(res.data.txn)));
            const sendResp = await self.sendMyWalletTransactionToAlgoClient({ signedTxn });
            resolve({ sendResp: sendResp.data, signedTxn: signedTxn, transactionId: res.data.transactionId });
          } catch (err: any) {
            reject(err.message || 'Error while making transfer');
          }
        },
          (error: any) => {
            reject(error)
          }
        )
    })
  }
  async sendMyWalletTransactionToAlgoClient(payload: any): Promise<any> {
    let self = this;
    const reqObj = {
      uri: `/algo/account/send-transaction`,
      body: payload
    };
    return new Promise((resolve, reject) => {
      self.httpClient.post(reqObj)
        .subscribe(async (res: any) => {
          try {
            resolve(res);
          } catch (err: any) {
            reject(err.message || 'Error while sending my wallet transaction');
          }
        },
          (error: any) => {
            reject(error)
          }
        )
    })
  }
}

