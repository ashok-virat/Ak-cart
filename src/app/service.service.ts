import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseurl: string;

  constructor(private http:HttpClient) { 
    this.baseurl='/api/v1/users';
  }

  public signup=(data):any=>{
    let params=new HttpParams()
    .set("firstName",data.firstName)
    .set("lastName",data.lastName)
    .set("email",data.email)
    .set("password",data.password)
    .set("role",data.role)
    let datas=this.http.post(`${this.baseurl}/signup`,params);
    return datas;
  }

  public signin=(data):any=>{
    let params=new HttpParams()
    .set("email",data.email)
    .set("password",data.password)
    let datas=this.http.post(`${this.baseurl}/signin`,params);
    return datas;
  }

  
  public addproduct=(data,authToken):any=>{
     let productdata=new FormData()
     productdata.append('productName',data.productName)
     productdata.append('price',data.price)
     productdata.append('userId',data.userId)
     productdata.append('category',data.category)
     productdata.append('discription',data.discription)
     productdata.append('adminName',data.adminName)
     productdata.append('product',data.product,data.name)
     let datas=this.http.post(`${this.baseurl}/addproduct/${authToken}`,productdata);
     return datas;
  }

  public getmyproduct=(data,authToken):any=>{
    let params=new HttpParams()
    .set("userId",data.userId)
    let datas=this.http.post(`${this.baseurl}/getmyproducts/${authToken}`,params);
    return datas;
  }


  
  public updateproduct=(data,authToken):any=>{
    console.log(data)
    let productdata=new FormData()
    if(data.file){
      productdata.append('productName',data.productName)
      productdata.append('price',data.price)
      productdata.append('productId',data.productId)
      productdata.append('discription',data.discription)
      productdata.append('category',data.category)
      productdata.append('product',data.file,data.name)
    }
    else if(!data.file){
      productdata.append('productName',data.productName)
      productdata.append('price',data.price)
      productdata.append('discription',data.discription)
      productdata.append('productId',data.productId)
      productdata.append('category',data.category)
      productdata.append('product',data.product)
    }

    let datas=this.http.post(`${this.baseurl}/updateproduct/${authToken}`,productdata || productdata);
    return datas;
  }
    
  public deleteproduct=(data,authToken):any=>{
       let params=new HttpParams()
       .set('productId',data.productId)
       let datas=this.http.post(`${this.baseurl}/deleteproduct/${authToken}`,params);
       return datas;
  }
 
  public getsingleproduct=(data,authToken):any=>{
    
    let params=new HttpParams()
    .set('productId',data.productId)
    let datas=this.http.post(`${this.baseurl}/getsingleproduct/${authToken}`,params);
    return datas;
  }

  
  public getallproduct=(authToken):any=>{
    let datas=this.http.get(`${this.baseurl}/getallproducts/${authToken}`);
    return datas;
  }

 public placeorder=(data,authToken):any=>{
   let params=new HttpParams()
   .set('userId',data.userId)
   .set('productId',data.productId)
   .set('productName',data.productName)
   .set('adminId',data.adminId)
   .set('userfirstName',data.userfirstName)
   .set('userlastName',data.userlastName)
   .set('adminfirstName',data.adminfirstName)
   .set('adminlastName',data.adminlastName)
   let datas=this.http.post(`${this.baseurl}/orderrequest/${authToken}`,params)
    return datas;
 }


 public getusercart=(data,authToken):any=>{
  let params=new HttpParams()
  .set('userId',data.userId)
  let datas=this.http.post(`${this.baseurl}/getusercart/${authToken}`,params);
  return datas;
 }

 public getadmincart=(data,authToken):any=>{
  let params=new HttpParams()
  .set('adminId',data.adminId)
  let datas=this.http.post(`${this.baseurl}/getadmincart/${authToken}`,params);
  return datas;
 }

 public getuserorders=(data,authToken):any=>{
  let params=new HttpParams()
  .set('userId',data.userId)
  let datas=this.http.post(`${this.baseurl}/getuserorders/${authToken}`,params);
  return datas;
 }

 public getadminorders=(data,authToken):any=>{
  let params=new HttpParams()
  .set('adminId',data.adminId)
  let datas=this.http.post(`${this.baseurl}/getadminorders/${authToken}`,params);
  return datas;
 }


 public userdeletereq=(data,authToken):any=>{
  let params=new HttpParams()
  .set('userId',data.userId)
  .set('adminId',data.adminId)
  .set('productId',data.productId)
  let datas=this.http.post(`${this.baseurl}/usercancelreq/${authToken}`,params);
  return datas;
 }

 
 public admindeletereq=(data,authToken):any=>{
  let params=new HttpParams()
  .set('userId',data.userId)
  .set('adminId',data.adminId)
  .set('productId',data.productId)
  let datas=this.http.post(`${this.baseurl}/admincancelreq/${authToken}`,params);
  return datas;
 }
 public userdeleteorder=(data,authToken):any=>{
  let params=new HttpParams()
  .set('userId',data.userId)
  .set('adminId',data.adminId)
  .set('productId',data.productId)
  let datas=this.http.post(`${this.baseurl}/usercancelorder/${authToken}`,params);
  return datas;
 }

 
 public admindeleterder=(data,authToken):any=>{
  let params=new HttpParams()
  .set('userId',data.userId)
  .set('adminId',data.adminId)
  .set('productId',data.productId)
  let datas=this.http.post(`${this.baseurl}/admincancelorder/${authToken}`,params);
  return datas;
 }


 public adminacceptreq=(data,authToken):any=>{
  let params=new HttpParams()
  .set('userId',data.userId)
  .set('productId',data.productId)
  .set('productName',data.productName)
  .set('adminId',data.adminId)
  .set('userfirstName',data.userfirstName)
  .set('userlastName',data.userlastName)
  .set('adminfirstName',data.adminfirstName)
  .set('adminlastName',data.adminlastName)
  let datas=this.http.post(`${this.baseurl}/adminacceptreq/${authToken}`,params);
  return datas;
 }

}





