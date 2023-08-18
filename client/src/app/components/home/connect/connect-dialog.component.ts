import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { HandlerService } from 'src/app/services/handler.service';
import { CacheService } from 'src/app/services/cache.service';
import { EmmiterService } from 'src/app/services/emmiter.service';
import { WagmiService } from 'src/app/services/wagmi.service';
import { HttpService } from 'src/app/services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private handlerService: HandlerService,
    private cacheService: CacheService,
    private event: EmmiterService,
    private wagmi: WagmiService,
    private httpService: HttpService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  async connectToGemWallet() {
    const self = this;
    try {
      self.loading = true;
      await self.handlerService.walletConnectHandler(environment.WALLET_TYPE.GEM_WALLET);
      self.dialog.closeAll();
      self.loading = false;
    } catch (err: any) {
      self.loading = false;
      self.toastr.error(err, 'Error', { timeOut: environment.ALERT_DESTROY_MAX_TIME });
    }
  }

}
