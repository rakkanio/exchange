import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlgoSignerService } from 'src/app/services/algo-signer.service';
import { CacheService } from 'src/app/services/cache.service';
import { EmmiterService } from 'src/app/services/emmiter.service';
import { ConnectDialogComponent } from '../home/connect/connect-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuth: boolean = false;
  public accountInfo: any = {};
  public _authSubscription: any = null;
  public _accountInfoSubscription: any = null;
  constructor(private cacheService: CacheService, private event: EmmiterService,
    private algoService: AlgoSignerService, private dialog: MatDialog) { 
    this._authSubscription = this.event.authStateChange.subscribe((value) => {
      this.isAuth = !(Boolean(value));
    });
    this._accountInfoSubscription = this.event.accountInfoChange.subscribe((value) => {
      this.accountInfo = value;
    });
  }

  async ngOnInit(): Promise<void> {
    const self=this;
    const active = self.cacheService.get('active');
    if (active === 'true') {
        self.isAuth=true;
    }else{
      self.clearInfo();
    }
    const account = this.cacheService.get('walletAddress');
    if(account!=='null'){
      const accountInfo = await self.algoService.getAccountInfo(account);
      self.event.setAccountInfo(accountInfo.data);
    }
  }
  disconnect() {
    this.clearInfo();
  }
  clearInfo(){
    this.cacheService.clearAll();
    this.event.setAuth(false);
    this.isAuth = false;
  }

  async openConnectDialog() {
    this.dialog.open(ConnectDialogComponent, {
      width: '400px',
      panelClass: 'connect-dialog',
      hasBackdrop: true
    });
  }
}
