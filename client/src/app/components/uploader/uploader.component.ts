import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
public files:any=[];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }
  upload(event:any){
    const self=this;
    console.log(event.target.files[0],event.target.result);
    let ext = event.target.files[0].type.split('/')[1];
    let size = event.target.files[0].size;
    let reader = new FileReader();
    reader.onload = (event: any) => { // called once readAsDataURL is completed
      self.files.push({ base64: event.target.result, ext: ext,size:size });
    }
    reader.readAsDataURL(event.target.files[0]); // read file as data url
 }
 saveData( form: NgForm){
   const self=this;
   console.log(form, self.files);
   const reqObj= form.value;
   reqObj.files= self.files;
   self.httpService.post(reqObj)
   .subscribe(
    (event: any) => {
      console.log('success', event);
    },
    (err: any) => {
      console.log(err,'error')
    }

   );
 }
}
