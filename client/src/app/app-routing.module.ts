import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionItemsComponent } from './components/collection-items/collection-items.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { HomeComponent } from './components/home/home.component';
import { UploaderComponent } from './components/uploader/uploader.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'collections/items', component: CollectionItemsComponent },
  { path: 'collections/item/upload', component: UploaderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
