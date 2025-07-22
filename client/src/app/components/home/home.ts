import { NgxSpinnerService } from "ngx-spinner";

import { Component } from '@angular/core';
import { Http } from '../../services/http.service';
import { Cache } from "../../services/cache.service";
import { Emmiter } from "../../services/emmiter.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public collections: any = [];
  public showConnect: boolean = true;
  public _authSubscription: any = null;
  constructor(private httpService: Http, private spinner: NgxSpinnerService,
    private cacheService: Cache, private event: Emmiter) {
    this._authSubscription = this.event.authStateChange.subscribe((value) => {
      this.showConnect = (Boolean(value));
    });
  }

  ngOnInit(): void {
    const self = this;
    const active = self.cacheService.get('active');
    if (active === 'true') {
      self.showConnect = false;
    }
  }
}
