import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { CollectionItemsComponent } from './components/collection-items/collection-items.component';
import { CollectionMergedItemsComponent } from './components/collection-merged-items/collection-merged-items.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { ConnectDialogComponent } from './components/home/connect/connect-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { UploaderComponent } from './components/uploader/uploader.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'collections/items', component: CollectionItemsComponent },
  { path: 'collections/mergeditem', component: CollectionMergedItemsComponent },
  { path: 'collections/item/upload', component: UploaderComponent }
];

@NgModule({
  declarations:[
    ConnectDialogComponent
  ],
  imports: [
    NgxLoadingModule.forRoot({}),
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
