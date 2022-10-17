import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmmiterService {
  public isAuth: any;
  public account: any;
  public accountInfo: any;
  public upload: any;
  constructor() {
    this.isAuth = false;
    this.account = [];

  }
  public authStateChange: Subject<string> = new Subject<string>();
  public WalletConnectStateChange: Subject<string> = new Subject<string>();
  public accountInfoChange: Subject<string> = new Subject<string>();
  public uploadChange: Subject<string> = new Subject<string>();

  setAuth(flag: Boolean) {
    this.isAuth = flag === true ? false : true;
    this.authStateChange.next(this.isAuth);
  }
  setWalletConnectAccount(account: any) {
    this.account = account;
    this.WalletConnectStateChange.next(this.account);
  }
  setAccountInfo(account) {
    this.accountInfo = account;
    this.accountInfoChange.next(this.accountInfo);
  }
  setAdminRole(upload) {
    this.upload = upload;
    this.uploadChange.next(this.upload);
  }
}
