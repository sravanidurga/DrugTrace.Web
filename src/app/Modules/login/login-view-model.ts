export interface LoginViewModel{   
    UserName:String;
    Password:String;
    Results:{
        Result:number;
        UserId:string;
        RoleId:string;
        UserName:string;
        ProfileImage:string;
    }
}