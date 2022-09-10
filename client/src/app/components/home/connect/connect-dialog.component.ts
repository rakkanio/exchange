import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { HandlerService } from 'src/app/services/handler.service';
import { AlgoSignerService } from 'src/app/services/algo-signer.service';
import { CacheService } from 'src/app/services/cache.service';
import { EmmiterService } from 'src/app/services/emmiter.service';

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './connect-dialog.component.html',
  styleUrls: ['./connect-dialog.component.scss']
})
export class ConnectDialogComponent implements OnInit {
  public loading = false;
  public account: any = '';
  constructor(private toastr: ToastrService,
    private router: Router, private dialog: MatDialog,
    private handlerService: HandlerService, private algoService: AlgoSignerService,
    private cacheService: CacheService,
    private event: EmmiterService
    ) {}

  ngOnInit(): void {
  }

  async connectToAlgoSigner() {
    const self = this;
    try {
      self.loading = true;
      await self.handlerService.walletConnectHandler(environment.WALLET_TYPE.ALGO_SIGNER);
      this.account = this.cacheService.get('walletAddress');
      const accountInfo = await self.algoService.getAccountInfo(this.account);
      self.event.setAccountInfo(accountInfo.data)
      self.dialog.closeAll();
      self.loading = false;
    } catch (err: any) {
      self.loading = false;
      self.toastr.error(err, 'Error', { timeOut: environment.ALERT_DESTROY_MAX_TIME });

    }
  }

  async connectToMyAlgo() {
    const self = this;
    try {
      self.loading = true;
      await self.handlerService.walletConnectHandler(environment.WALLET_TYPE.MY_ALGO_WALLET);
      self.dialog.closeAll();
      self.loading = false;
    } catch (err: any) {
      self.loading = false;
      self.toastr.error(err, 'Error', { timeOut: environment.ALERT_DESTROY_MAX_TIME });
    }
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
      self.toastr.error(err, 'Error', { timeOut: environment.ALERT_DESTROY_MAX_TIME });
    }
  }
}
