import { Component, OnInit } from '@angular/core';
import { APIResponseModel } from 'src/app/Common/Models/APIResponseModel';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/Common/Services/APIService.service';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements OnInit {

  public assets : Array<APIResponseModel> = [];
  

  constructor(
    private toastr:ToastrService,
    private apiService:APIService
  ) {
  }

  ngOnInit() {
    this.getAssets();   
  }

  getAssets(){
    this.apiService.getRetailerSaleHistory().subscribe((data) => {
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
