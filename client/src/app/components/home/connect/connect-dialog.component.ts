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


  async connectToWallet() {
    const self = this;
    self.loading=true;
    let walletInfo: any = {};
    const isConnected = await self.wagmi.isWalletConnected()
    if (!isConnected) {
      walletInfo = await self.wagmi.connectToWallet()
    }
    const balanceInfo = await self.wagmi.fetchBalance(walletInfo.account)
    self.event.setAccountInfo({ amount: Number(balanceInfo['formatted']).toFixed(5) })
    self.dialog.closeAll();
    const stateObj = {
      account: walletInfo.account
    }
    self.cacheService.set('walletObj', JSON.stringify(stateObj));
    self.cacheService.set('walletAddress', stateObj.account);
    self.cacheService.set('active', 'true');
    self.event.setAuth(true);
     self.loading=false
    return stateObj;

    // const reqObj = {
    //   address: walletInfo.account,
    //   chain: walletInfo.chain.id,
    //   network: 'evm',
    //   url: "account/request-message"
    // };
    // self.spinner.show();
    // self.httpService.post(reqObj)
    //   .subscribe(
    //     async (event: any) => {
    //       const message = event.data.message;
    //       const signature = await self.wagmi.signMessage({ message });
    //       let reqObj = {
    //         message,
    //         signature,
    //         url: "account/request-message"
    //       }
    //       self.httpService.post(reqObj)
    //         .subscribe(
    //           async (event: any) => {
    //             console.log('success verification', event)

    //             self.spinner.hide();
    //           }, error => {
    //             self.spinner.hide();
    //           });
    //     }, error => {
    //       self.spinner.hide();
    //     })
  }

}
