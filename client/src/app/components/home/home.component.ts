import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { CacheService } from 'src/app/services/cache.service';
import { EmmiterService } from 'src/app/services/emmiter.service';
import { HttpService } from 'src/app/services/http.service';

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
     private cacheService: CacheService, private event: EmmiterService) { 
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
  }
}
