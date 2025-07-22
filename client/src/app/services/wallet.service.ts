import { Injectable } from '@angular/core';

import { Http } from './http.service';
@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private httpService: Http
  ) { }

  fetchAccountBalance(account: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const self = this;
      const reqObj: any = {}
      reqObj.url = 'wallet/info';
      reqObj.params = {
        account
      }
      self.httpService.get(reqObj)
        .subscribe((result: any) => {
          resolve(result)
        }, (error: Error) => {
          reject(error)
        });
    })
  }

}
