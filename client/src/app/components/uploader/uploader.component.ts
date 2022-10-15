import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  public files: any = [];
  public collections: any = []
  constructor(private httpService: HttpService,
    private spinner: NgxSpinnerService, private notify: NotificationService) {
  }

  ngOnInit(): void {
    this.fetchCollections();
  }
  upload(event: any) {
    const self = this;
    console.log(event.target.files[0], event.target.result);
    let ext = event.target.files[0].type.split('/')[1];
    let size = event.target.files[0].size;
    let fileName = event.target.files[0].name;
    self.files=[];
    let reader = new FileReader();
    reader.onload = (event: any) => { // called once readAsDataURL is completed
      self.files.push({ base64: event.target.result, ext: ext, size: size, fileName: fileName });
    }
    reader.readAsDataURL(event.target.files[0]); // read file as data url
  }
  saveData(form: NgForm) {
    const self = this;
    self.spinner.show();
    console.log(form, self.files);
    const reqObj = form.value;
    reqObj.files = self.files;
    reqObj.url = 'collection/create';
    self.httpService.post(reqObj)
      .subscribe(
        (event: any) => {
          self.spinner.hide();
          self.notify.showSuccess("Data uploaded successfully", "Success");
          console.log('success', event);
        },error=>{
          self.spinner.hide();
          console.log('Error while uploading image', error);
        });
  }

  fetchCollections() {
    const self = this;
    self.spinner.show();
    const reqObj: any = {}
    reqObj.url = 'collection/list';
    self.httpService.get(reqObj)
      .subscribe((event: any) => {
        self.spinner.hide();
        self.collections = event.data.results;
      }, error=>{
        self.spinner.hide();
      });
  }
}
