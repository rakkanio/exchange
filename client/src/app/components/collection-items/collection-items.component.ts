import { Component, OnInit } from '@angular/core';
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

  constructor(private httpService: HttpService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.fetchItemList()
  }

  fetchItemList() {
    const self = this;
    const reqObj: any = {}
    reqObj.params = { collection: "skulls" }
    reqObj.url = "/item/list";
    setTimeout(() => { self.spinner.show() }, 1000)
    self.httpService.get(reqObj)
      .subscribe(
        (event: any) => {
          setTimeout(() => { self.spinner.hide() }, 1000)
          self.items = event.data.results
        });
  }

}
