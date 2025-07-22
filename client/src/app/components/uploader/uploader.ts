import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { NgMaterialsModule } from '../../ng-materials/ng-materials.module';

@Component({
  selector: 'app-uploader',
  imports: [MatCardModule, MatCard, NgMaterialsModule],
  templateUrl: './uploader.html',
  styleUrl: './uploader.scss'
})
export class Uploader {
  public files: any = [];
  public collections: any = []
  constructor() {
  }
  async onInput(event: Event) {

  }
}
