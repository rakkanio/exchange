import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NgMaterialsModule } from './ng-materials/ng-materials.module';
import { CollectionsComponent } from './components/collections/collections.component';
import { CollectionItemsComponent } from './components/collection-items/collection-items.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './services/notification.service';
import { HandlerService } from './services/handler.service';
import { AlgoSignerService } from './services/algo-signer.service';
import { MyAlgoService } from './services/my-algo.service';
import { HttpService } from './services/http.service';
import { CacheService } from './services/cache.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CollectionsComponent,
    CollectionItemsComponent,
    UploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
  ],
  providers: [NotificationService,
    AlgoSignerService,
    MyAlgoService,
    HttpService,
    HandlerService,
    CacheService,
    HandlerService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
