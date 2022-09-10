import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { CacheService } from 'src/app/services/cache.service';
import { EmmiterService } from 'src/app/services/emmiter.service';
import { HttpService } from 'src/app/services/http.service';
import { ConnectDialogComponent } from './connect/connect-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public collections: any = [];
  public showConnect: boolean = true;
  public _authSubscription: any = null;
  constructor(private httpService: HttpService, private spinner: NgxSpinnerService,
    private dialog: MatDialog, private cacheService: CacheService, private event: EmmiterService) { 
      this._authSubscription = this.event.authStateChange.subscribe((value) => {
        this.showConnect = (Boolean(value));
      });
    }

  ngOnInit(): void {
    const self = this;
    const active = self.cacheService.get('active');
    if (active === 'true') {
        self.showConnect=false;
    }

    this.fetchCollections()
  }

  fetchCollections() {
    const self = this;
    setTimeout(() => { self.spinner.show() }, 1000)
    const reqObj: any = {}
    reqObj.url = 'collection/list';
    self.httpService.get(reqObj)
      .subscribe((event: any) => {
        setTimeout(() => { self.spinner.hide() }, 1000)
        self.collections = event.data.results
      });
  }
  async openConnectDialog() {
    this.dialog.open(ConnectDialogComponent, {
      width: '400px',
      panelClass: 'connect-dialog',
      hasBackdrop: true
    });
  }
}
