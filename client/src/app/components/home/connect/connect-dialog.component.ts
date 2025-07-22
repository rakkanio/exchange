import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment.development';
import { Handler } from '../../../services/handler.service';
import { Cache } from '../../../services/cache.service';
import { Emmiter } from '../../../services/emmiter.service';
import { Http } from '../../../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './connect-dialog.component.html',
  imports: [],
  styleUrls: ['./connect-dialog.component.scss'],
})
export class ConnectDialog {
  public loading = false;
  public account: any = '';
  constructor(
    private router: Router, private dialog: MatDialog,
    private handlerService: Handler,
    private cacheService: Cache,
    private event: Emmiter,
    // private wagmi: WagmiService,
    private httpService: Http,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  async connectToWalletConnect() {
    const self = this;
    try {
      self.loading = true;
      await self.handlerService.walletConnectHandler(environment.WALLET_TYPE.WALLET_CONNECT);
      self.dialog.closeAll();
      self.loading = false;
    } catch (err: any) {
      self.loading = false;
      // self.toastr.error(err, 'Error', { timeOut: environment.ALERT_DESTROY_MAX_TIME });
    }
  }

}
