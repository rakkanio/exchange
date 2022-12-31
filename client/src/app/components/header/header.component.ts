import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { CacheService } from 'src/app/services/cache.service';
import { EmmiterService } from 'src/app/services/emmiter.service';
import { WagmiService } from 'src/app/services/wagmi.service';
import { ConnectDialogComponent } from '../home/connect/connect-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuth: boolean = false;
  public accountInfo: any = {};
  public showUpload: boolean = false;
  public _authSubscription: any = null;
  public _accountInfoSubscription: any = null;
  public _uploadSubscription: any = null;
  constructor(private cacheService: CacheService,
    private event: EmmiterService,
    private dialog: MatDialog,
    private authService: AuthService,
    private wagmi: WagmiService) {
    this._authSubscription = this.event.authStateChange.subscribe((value) => {
      this.isAuth = !(Boolean(value));
    });
    this._accountInfoSubscription = this.event.accountInfoChange.subscribe((value) => {
      this.accountInfo = value;
      setTimeout(() => {
        this.accountInfo.walletAddress = this.cacheService.get('walletAddress');
      }, 10);
    });
    this._uploadSubscription = this.event.uploadChange.subscribe((value) => {
      this.showUpload =  JSON.parse(value);
    });
  }

  async ngOnInit(): Promise<void> {
    const self = this;
    const active = self.cacheService.get('active');
    if (active === 'true') {
      self.isAuth = true;
      await self.authService.isLoggedIn();
      this.accountInfo.walletAddress = this.cacheService.get('walletAddress');
      console.log(this.accountInfo.walletAddress,'sdsd');
    } else {
      self.clearInfo();
    }
  }
  disconnect() {
    this.clearInfo();
  }
  async clearInfo() {
   await this.wagmi.disconnectWallet()
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
