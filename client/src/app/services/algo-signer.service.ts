import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class AlgoSignerService {

  constructor(private httpClient: HttpService) { }

  async check() {
    if (typeof window.AlgoSigner !== 'undefined') {
      return 'AlgoSigner is installed.';
    } else {
      throw new Error('AlgoSigner is NOT installed.')
    };
  }
  async connect() {
    try {
      const connectRes = await window.AlgoSigner.connect();
      return connectRes;
    } catch (err: any) {
      throw new Error(err.message || 'Error while connecting to ALgoSigner');
    }
  }
  async getAccounts() {
    try {
      const accounts = await window.AlgoSigner.accounts({ ledger: 'MainNet' });
      return accounts;
    } catch (err: any) {
      throw new Error(err.message || 'Error while fetching account details');
    }
  }
  async getAccountInfo(account: any): Promise<any> {
    let self = this;
    const reqObj = {
      url: `algo/account/info?account=${account}`,
    };
    return new Promise((resolve, reject) => {
      self.httpClient.get(reqObj)
        .subscribe(
          (data: any) => resolve(data),
          (error: any) => reject(error)
        )
    })
  }
  //Not in use, pulling params from server
  async getTransactionParams() {
    try {
      const params = await window.AlgoSigner.algod({
        ledger: "MainNet",
        path: "/v2/transactions/params"
      });
      return params
    } catch (err: any) {
      throw new Error(err.message || 'Error while fetching params from ALgoSigner');
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
        .subscribe(
          async (res: any) => {
            try {
              const txn_b64 = await window.AlgoSigner.encoding.msgpackToBase64(new Uint8Array(Object.values(res.data.txn)));
              const signedTxn = await window.AlgoSigner.signTxn([{ txn: txn_b64 }]);
              resolve({ signedTxn: signedTxn, transactionId: res.data.transactionId });
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
  async sendTxn(txn: any) {
    try {
      const res = await window.AlgoSigner.send({
        ledger: "MainNet",
        tx: txn[0].blob
      });
      return res;
    } catch (err: any) {
      console.log(err, 'send response', err);
      throw new Error(err.message || 'Error while sending transactions');
    }
  }
}
