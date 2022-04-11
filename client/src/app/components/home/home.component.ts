import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public collections: any = [];
  constructor(private httpService: HttpService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.fetchCollections()
  }

  fetchCollections() {
    const self = this;
    setTimeout(() => { self.spinner.show() }, 1000)
    const reqObj: any = {}
    reqObj.url = 'list';
    self.httpService.get(reqObj)
      .subscribe((event: any) => {
        setTimeout(() => { self.spinner.hide() }, 1000)
        self.collections = event.data.results
      });
  }
}
