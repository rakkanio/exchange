import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  public collections: any = [
    { collectionName: 'Hydrogen', volume: 10079, percentage: '-37.5%', price: "0.45" },
    { collectionName: 'Lithium', volume: 10079, percentage: '-37.5%', price: "0.45" },
    { collectionName: 'Hydrogen', volume: 10079, percentage: '-37.5%', price: "0.45" },
    { collectionName: 'Beryllium', volume: 10079, percentage: '-37.5%', price: "0.45" },
    { collectionName: 'Boron', volume: 10079, percentage: '-37.5%', price: "0.45" },
    { collectionName: 'Carbon', volume: 10079, percentage: '-37.5%', price: "0.45" },
    { collectionName: 'Oxygen', volume: 10079, percentage: '-37.5%', price: "0.45" },
    { collectionName: 'Fluorine', volume: 10079, percentage: '-37.5%', price: "0.45" }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
