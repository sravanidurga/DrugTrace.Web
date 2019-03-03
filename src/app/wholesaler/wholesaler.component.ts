import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { APIResponseModel } from '../Common/Models/APIResponseModel';
import { AssetModel } from '../Common/Models/AssetModel';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/Common/Services/APIService.service';

@Component({
  selector: 'app-wholesaler',
  templateUrl: './wholesaler.component.html',
  styleUrls: ['./wholesaler.component.css']
})
export class WholesalerComponent implements OnInit {
  updateAssetModel: AssetModel = new AssetModel();
  public assetInEdit: FormGroup;
  public updateAssetInEdit: FormGroup;
  public submitted:boolean = false;

  public assets : Array<APIResponseModel> = [];
  

  constructor(
    private toastr:ToastrService,
    private apiService:APIService
  ) {
  }

  ngOnInit() {
    this.updateAssetInEdit = this.generateUpdateAssetFormGroup();
    this.getAssets();
   
  }

  getAssets(){
    this.apiService.getWholesalerSaleHistory().subscribe((data) => {
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



  generateUpdateAssetFormGroup() {
    return new FormGroup({

      assetid: new FormControl(0),
      assetname: new FormControl("", [Validators.required]),
      manuowner: new FormControl(""),
      ownerrole: new FormControl(""),
      distowner: new FormControl(""),
      consignmentid : new FormControl(""),
      boxid: new FormControl(""),
      wholeowner:new FormControl(""),
      ownerid: new FormControl(""),
      RetailerOwner : new FormControl("",[Validators.required])

    });
  }

  generateUpdateAssetEditFormGroup(data) {
    return new FormGroup({
      assetid: new FormControl(data.assetid),
      assetname: new FormControl(data.assetname, [Validators.required]),
      manuowner: new FormControl(data.manuowner),
      ownerrole: new FormControl(data.ownerrole),
      distowner: new FormControl(data.distowner),
      consignmentid: new FormControl(data.consignmentid),
      boxid: new FormControl(data.boxid),
      wholeowner: new FormControl(data.wholeowner, [Validators.required]),
      ownerid: new FormControl(data.ownerid),
      RetailerOwner : new FormControl(data.RetailerOwner,[Validators.required])
    });
  }


  updateAsset(){
    this.updateAssetModel.assetid = this.updateAssetInEdit.get("assetid").value;
    this.updateAssetModel.assetname = this.updateAssetInEdit.get("assetname").value;
    this.updateAssetModel.manuowner = this.updateAssetInEdit.get("manuowner").value;
    this.updateAssetModel.ownerrole= this.updateAssetInEdit.get("ownerrole").value;
    this.updateAssetModel.distowner = this.updateAssetInEdit.get("distowner").value;
    this.updateAssetModel.consignmentid = this.updateAssetInEdit.get("consignmentid").value;
    this.updateAssetModel.boxid = this.updateAssetInEdit.get("boxid").value;
    this.updateAssetModel.wholeowner = this.updateAssetInEdit.get("wholeowner").value;
    this.updateAssetModel.RetailerOwner = this.updateAssetInEdit.get("RetailerOwner").value;

    this.apiService.updateAssetWholeSaler(this.updateAssetModel).subscribe((data) => {
      this.submitted = false;   
      this.toastr.success('ASSET UPDATED SUCCESSFULLY');     
    },
    (err) => {
      this.submitted=false;
      console.log(err);
      this.toastr.error('ASSET UPDATION FAILED');   
    }
  );
  }

  generateUpdateAssetDetails(asset : APIResponseModel){
    this.updateAssetInEdit = this.generateUpdateAssetEditFormGroup(asset.Record);
  }

}
