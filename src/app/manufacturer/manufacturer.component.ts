import { Component, OnInit } from '@angular/core';
import { AssetModel } from 'src/app/Common/Models/AssetModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {APIService} from 'src/app/Common/Services/APIService.service'
import { APIResponseModel } from '../Common/Models/APIResponseModel';
import { ManifacturerUpdateAssetModel } from '../Common/Models/ManifacturerUpdateAssetModel';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  asset: AssetModel = new AssetModel();
  updateAssetModel: ManifacturerUpdateAssetModel = new ManifacturerUpdateAssetModel();
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
    this.assetInEdit = this.generateAssetFormGroup();
    this.updateAssetInEdit = this.generateUpdateAssetFormGroup();
    this.getAssets();
   
  }

  getAssets(){
    this.apiService.getManifacturerSaleHistory().subscribe((data) => {
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
  get assetFormGroup() { return this.assetInEdit.controls; }

  generateAssetFormGroup() {
    return new FormGroup({

      assetid: new FormControl(0),
      assetname: new FormControl("", [Validators.required]),
      qrid: new FormControl("", [Validators.required]),
      boxid: new FormControl("", [Validators.required]),
      consignmentid: new FormControl("", [Validators.required]),
      manuowner: new FormControl("", [Validators.required]),
      ownerrole: new FormControl(""),
      MfgDate: new FormControl(new Date())

    });
  }

  generateAssetEditFormGroup(data) {
    return new FormGroup({
      assetid: new FormControl(data.assetid),
      assetname: new FormControl(data.assetname, [Validators.required]),
      qrid: new FormControl(data.QRID, [Validators.required]),
      boxid: new FormControl(data.BoxID, [Validators.required]),
      consignmentid: new FormControl(data.ConsignmentID, [Validators.required]),
      manuowner: new FormControl(data.Owner, [Validators.required]),
      ownerrole: new FormControl(data.OwnerRole),
      MfgDate: new FormControl(data.MfgDate, [Validators.required])
    });
  }


  generateUpdateAssetFormGroup() {
    return new FormGroup({

      assetid: new FormControl(0),
      assetname: new FormControl("", [Validators.required]),
      manuowner: new FormControl("", [Validators.required]),
      ownerrole: new FormControl(""),
      distowner: new FormControl("", [Validators.required]),
      consignmentid : new FormControl(""),
      ownerid:new FormControl("")

    });
  }

  generateUpdateAssetEditFormGroup(data) {
    return new FormGroup({
      assetid: new FormControl(data.assetid),
      assetname: new FormControl(data.assetname, [Validators.required]),
      manuowner: new FormControl(data.manuowner, [Validators.required]),
      ownerrole: new FormControl(data.ownerrole),
      distowner: new FormControl("", [Validators.required]),
      consignmentid: new FormControl(data.consignmentid),
      ownerid: new FormControl(data.ownerid)
    });
  }

  createAsset() {
    this.submitted = true;
    if (this.assetInEdit.invalid) {
      this.toastr.error('PLEASE REVIEW THE INFORMATION YOU HAVE ENTERED');
      return;
    }
    this.prepareAssetModel();
    this.apiService.createAssetManifacturer(this.asset).subscribe((data) => {
        this.submitted = false;   
        this.toastr.success('ASSET CREATED SUCCESSFULLY');     
      },
      (err) => {
        this.submitted=false;
        console.log(err);
        this.toastr.error('ASSET CREATION FAILED');   
      }
    );
    
  }

  updateAsset(){
    this.updateAssetModel.assetid = this.updateAssetInEdit.get("assetid").value;
    this.updateAssetModel.assetname = this.updateAssetInEdit.get("assetname").value;
    this.updateAssetModel.manuowner = this.updateAssetInEdit.get("manuowner").value;
    this.updateAssetModel.ownerrole= this.updateAssetInEdit.get("ownerrole").value;
    this.updateAssetModel.distowner = this.updateAssetInEdit.get("distowner").value;
    this.updateAssetModel.consignmentid = this.updateAssetInEdit.get("consignmentid").value;
    this.apiService.updateAssetManifacturer(this.updateAssetModel).subscribe((data) => {
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

  clearAsset(){
    if(this.asset.assetid == ""){
      this.assetInEdit = this.generateAssetFormGroup();
    }
  }

  prepareAssetModel(){
   // this.asset.assetid = this.assetInEdit.get("assetid").value;
    this.asset.assetname = this.assetInEdit.get("assetname").value;
    this.asset.qrid = this.assetInEdit.get("qrid").value;
    this.asset.boxid = this.assetInEdit.get("boxid").value;
    this.asset.consignmentid = this.assetInEdit.get("consignmentid").value;
    this.asset.manuowner = this.assetInEdit.get("manuowner").value;
    //this.asset.ownerrole= this.assetInEdit.get("ownerrole").value;
    this.asset.MfgDate = this.assetInEdit.get("MfgDate").value;
  }

  generateUpdateAssetDetails(asset : APIResponseModel){
    this.updateAssetInEdit = this.generateUpdateAssetEditFormGroup(asset.Record);
  }

}
