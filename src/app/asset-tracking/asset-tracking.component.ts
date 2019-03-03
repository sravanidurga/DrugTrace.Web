import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/Common/Services/APIService.service';
import { APIResponseModel } from 'src/app/Common/Models/APIResponseModel';

@Component({
  selector: 'app-asset-tracking',
  templateUrl: './asset-tracking.component.html',
  styleUrls: ['./asset-tracking.component.css']
})
export class AssetTrackingComponent implements OnInit {

  public assets : Array<APIResponseModel> = [];
  public assetId:string="";
  constructor(
    private toastr:ToastrService,
    private apiService:APIService
  ) {
  }

  ngOnInit() {
    //this.getAssets();   
  }

  scanAsset(){
    this.apiService.scanAsset(this.assetId).subscribe((data) => {
      console.log(data);
      var text = data.split("[")[1].split("]")[0];
     // alert(JSON.parse("["+text+"]"));
      this.assets=JSON.parse("["+text+"]");
      console.log(this.assets);

        // this.assets = data;  
    },
    (err) => {
      console.log(err);
    }
  );
  }

}
