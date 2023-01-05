import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CacheService } from 'src/app/services/cache.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  public detailsData:any={};
  public imageURL= environment.assetUrl;
  public openseaViewURL= environment.OPENSEA.VIEW_URL+environment.OPENSEA.VIEW_ACCOUNT
  public walletAddress:string='';

  constructor(private route: ActivatedRoute, private spinner: NgxSpinnerService, private httpService: HttpService,
    private cacheService: CacheService) { }

  ngOnInit(): void {
    const self=this;
    self.walletAddress= self.cacheService.get('walletAddress')
      this.route.params.subscribe((params: Params) => {
        self.fetchDetails(params['id'] )
      })
  }
  fetchDetails(id){
    const self = this;
    const reqObj: any = {}
    reqObj.params = { collection: "skulls" }
    reqObj.url = `collection/item/details?id=${id}`;
    self.spinner.show();
    self.httpService.get(reqObj)
      .subscribe(
        (event: any) => {
          self.spinner.hide();
          self.detailsData = event.data.result
        }, error=>{
          self.spinner.hide();
        });
  }

}
