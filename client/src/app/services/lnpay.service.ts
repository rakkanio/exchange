import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LnpayService {

  constructor(private httpClient: HttpService) { }
  decodeInvoice(reqObject: any) {
    let self = this;
    const reqObj = {
      uri: '/lnpay/decode',
      body: reqObject
    };
    return new Promise((resolve, reject) => {
      self.httpClient.post(reqObj)
        .subscribe(
          (data: any) => resolve(data),
          (error: any) => reject(error)
        )
    })
  }

  async updateLnPayTransactionDraft(payload: any) {
    let self = this;
    const reqObj = {
      uri: `/account/transaction/draft-update`,
      body: payload
    };
    return new Promise((resolve, reject) => {
      self.httpClient.post(reqObj)
        .subscribe((res: any) => resolve(res),
          (error: any) => reject(error)
        )
    })
  }
  async listTransactions(payload: any) {
    let self = this;
    const reqObj = {
      uri: `/account/transaction/list`,
      body: payload
    };
    return new Promise((resolve, reject) => {
      self.httpClient.get(reqObj)
        .subscribe((res: any) => resolve(res),
          (error: any) => reject(error)
        )
    })
  }
}
