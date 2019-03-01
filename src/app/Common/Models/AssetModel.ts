export class AssetModel {
    constructor(obj?:any){
        if(obj!= null){
            Object.keys(obj).forEach(key => {
                this[key] = obj[key];
            });
        }
        else{

        }
    }
    AssetNumber: string;
    AssetName: string;
    QRID: string;
    BoxID: string;
    ConsignmentID: string;
    Owner: string;
    OwnerRole: string;
    MfgDate: Date;
}