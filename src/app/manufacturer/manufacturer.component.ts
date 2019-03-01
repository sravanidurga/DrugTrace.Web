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

  sampleAsset : AssetModel = new AssetModel({
    AssetNumber :2,
    AssetName : "Diovan",
    QRID:"e1nbf47ab7hahb313baB26fhsbh37rh",
    BoxID : "B176",
    ConsignmentID:"C884",
    Owner:"Novartis",
    MfgDate:"02/02/2019"
  });


  manifacturerUpdateAssetModel : ManifacturerUpdateAssetModel = new ManifacturerUpdateAssetModel();


  

  constructor(
    private toastr:ToastrService,
    private apiService:APIService
  ) {
  }

  ngOnInit() {
    this.assetInEdit = this.generateAssetFormGroup();
    this.updateAssetInEdit = this.generateUpdateAssetFormGroup();
    
    this.assets.push({Key:"Test","Record":this.sampleAsset})
  }

  get assetFormGroup() { return this.assetInEdit.controls; }

  generateAssetFormGroup() {
    return new FormGroup({

      AssetNumber: new FormControl(0),
      AssetName: new FormControl("", [Validators.required]),
      QRID: new FormControl("", [Validators.required]),
      BoxID: new FormControl("", [Validators.required]),
      ConsignmentID: new FormControl("", [Validators.required]),
      Owner: new FormControl("", [Validators.required]),
      OwnerRole: new FormControl(""),
      MfgDate: new FormControl(new Date())

    });
  }

  generateAssetEditFormGroup(data) {
    return new FormGroup({
      AssetNumber: new FormControl(data.AssetNumber),
      AssetName: new FormControl(data.AssetName, [Validators.required]),
      QRID: new FormControl(data.QRID, [Validators.required]),
      BoxID: new FormControl(data.BoxID, [Validators.required]),
      ConsignmentID: new FormControl(data.ConsignmentID, [Validators.required]),
      Owner: new FormControl(data.Owner, [Validators.required]),
      OwnerRole: new FormControl(data.OwnerRole),
      MfgDate: new FormControl(data.MfgDate, [Validators.required])
    });
  }


  generateUpdateAssetFormGroup() {
    return new FormGroup({

      AssetNumber: new FormControl(0),
      AssetName: new FormControl("", [Validators.required]),
      Owner: new FormControl("", [Validators.required]),
      OwnerRole: new FormControl(""),
      Distributor: new FormControl("", [Validators.required])

    });
  }

  generateUpdateAssetEditFormGroup(data) {
    return new FormGroup({
      AssetNumber: new FormControl(data.AssetNumber),
      AssetName: new FormControl(data.AssetName, [Validators.required]),
      Owner: new FormControl(data.Owner, [Validators.required]),
      OwnerRole: new FormControl(data.OwnerRole),
      Distributor: new FormControl("", [Validators.required])
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
    this.updateAssetModel.AssetNumber = this.assetInEdit.get("AssetNumber").value;
    this.updateAssetModel.AssetName = this.assetInEdit.get("AssetName").value;
    this.updateAssetModel.Owner = this.assetInEdit.get("Owner").value;
    this.updateAssetModel.OwnerRole = this.assetInEdit.get("OwnerRole").value;
    this.updateAssetModel.Distributor = this.assetInEdit.get("Distributor").value;
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
    if(this.asset.AssetNumber == ""){
      this.assetInEdit = this.generateAssetFormGroup();
    }
  }

  prepareAssetModel(){
   // this.asset.AssetNumber = this.assetInEdit.get("AssetNumber").value;
    this.asset.AssetName = this.assetInEdit.get("AssetName").value;
    this.asset.QRID = this.assetInEdit.get("QRID").value;
    this.asset.BoxID = this.assetInEdit.get("BoxID").value;
    this.asset.ConsignmentID = this.assetInEdit.get("ConsignmentID").value;
    this.asset.Owner = this.assetInEdit.get("Owner").value;
    this.asset.OwnerRole = this.assetInEdit.get("OwnerRole").value;
    this.asset.MfgDate = this.assetInEdit.get("MfgDate").value;
  }

  generateUpdateAssetDetails(asset : APIResponseModel){
    this.updateAssetInEdit = this.generateUpdateAssetEditFormGroup(asset.Record);
  }

}
