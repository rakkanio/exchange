import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CacheService } from 'src/app/services/cache.service';
import { HttpService } from 'src/app/services/http.service';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collection-merged-items',
  templateUrl: './collection-merged-items.component.html',
  styleUrls: ['./collection-merged-items.component.scss']
})
export class CollectionMergedItemsComponent implements OnInit {
  public items: any = [];
  public imageURL = environment.assetUrl
  constructor(private httpService: HttpService, private spinner: NgxSpinnerService,
     private router: Router, private cacheService: CacheService, private notify: NotificationService,) { }

  ngOnInit(): void {
    this.fetchItemList()
  }
  fetchItemList() {
    const self = this;
    const reqObj: any = {}
    reqObj.params = { collection: "skulls" }
    reqObj.url = "collection/merged/item/list";
    self.spinner.show();
    self.httpService.get(reqObj)
      .subscribe(
        (event: any) => {
          self.spinner.hide();
          self.items = event.data.results
        }, error=>{
          self.spinner.hide();
        });
  }
  updateItem(item) {
    const self = this;
    self.spinner.show();

    let reqObj = {
      url : 'collection/update-item',
      id: item.id,
      payload:{
        status:'hide'
      }
    };
    self.httpService.post(reqObj)
      .subscribe(
        (event: any) => {
          self.spinner.hide();
          self.notify.showSuccess("Request updated", "Success");
          console.log('success', event);
        },error=>{
          self.spinner.hide();
          self.notify.showError(error.error || error, "Error");
          console.log('Error while updating item', error);
        });
  }

  gotToDetails(item){
    // this.cacheService.set('item', JSON.stringify(item))
    this.router.navigate(["collections/item/details",item.seqNumber ]);
  }
}
