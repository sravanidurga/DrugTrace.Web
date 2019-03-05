import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { AssetTrackingComponent } from './asset-tracking/asset-tracking.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { DistributorComponent } from './distributor/distributor.component';
import { WholesalerComponent } from './wholesaler/wholesaler.component';
import { RetailerComponent } from './retailer/retailer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIService } from './Common/Services/APIService.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RequestInterceptor } from './Common/Services/HttpInterceptor';
import { AuthGuard } from './Common/Services/authguard.service';

@NgModule({
  declarations: [
    AppComponent,
    AssetTrackingComponent,
    ManufacturerComponent,
    DistributorComponent,
    WholesalerComponent,
    RetailerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
    positionClass: 'toast-top-center',
    closeButton:true,
    preventDuplicates: true,
    timeOut: 10000
      }
    ),
    RouterModule.forRoot([

      { path: 'login', loadChildren: './Modules/login/login.module#LoginModule'},
      {
        path:'manufacturer', component:ManufacturerComponent
      },
      {
        path:'distributer', component:DistributorComponent
      },
      {
        path:'wholesaler', component:WholesalerComponent
      },
      {
        path:'retailer', component:RetailerComponent
      },
      {
        path:'track', component:AssetTrackingComponent
      },
    ])
  ],
  providers: [APIService,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
