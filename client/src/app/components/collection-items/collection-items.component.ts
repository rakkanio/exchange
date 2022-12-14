import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collection-items',
  templateUrl: './collection-items.component.html',
  styleUrls: ['./collection-items.component.scss']
})
export class CollectionItemsComponent implements OnInit {

  public items: any = [];
  public imageURL = environment.assetUrl

  constructor(private httpService: HttpService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.fetchItemList()
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
        },error=>{
          self.spinner.hide();
          console.log('Error while fetching base item', error);
        });
  }
  gotToDetails(item){
    this.router.navigate(["collections/item/details", item.id]);
  }
}
