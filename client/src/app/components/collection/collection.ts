

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { Http } from '../../services/http.service';
import { Cache } from '../../services/cache.service';
import { environment } from '../../../environments/environment.development';
import { NgMaterialsModule } from '../../ng-materials/ng-materials.module';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-collection',
  imports: [MatCardModule, MatCard, NgMaterialsModule],
  templateUrl: './collection.html',
  styleUrl: './collection.scss'
})
export class Collection {

  public items: any = [];
  public imageURL = environment.assetUrl

  constructor(private httpService: Http, private spinner: NgxSpinnerService, private router: Router, private cacheService: Cache) { }

  ngOnInit(): void {
    // this.fetchItemList()
  }

  fetchItemList() {
    const self = this;
    const reqObj: any = {}
    reqObj.params = { collection: "skulls" }
    reqObj.url = "collection/item/list";
    self.spinner.show();
    self.httpService.get(reqObj)
      .subscribe(
        (event: any) => {
          self.spinner.hide();
          self.items = event.data.results
        }, (error) => {
          self.spinner.hide();
          console.log('Error while fetching base item', error);
        });
  }
  gotToDetails(item: any) {
    this.router.navigate(["collections/item/details", item.seqNumber]);
  }
}
