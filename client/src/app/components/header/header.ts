import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConnectDialog } from '../home/connect/connect-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatDialogModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  public isAuth: boolean = false;
  public accountInfo: any = {};
  constructor(private dialog: MatDialog,) {

  }

  disconnect() {
    this.clearInfo();
  }
  async clearInfo() {
    //  await this.wagmi.disconnectWallet()
    //   this.cacheService.clearAll();
    //   this.event.setAuth(false);
    //   this.isAuth = false;
  }
  async openConnectDialog() {
    this.dialog.open(ConnectDialog, {
      width: '400px',
      panelClass: 'connect-dialog',
      hasBackdrop: true
    });
  }

}


