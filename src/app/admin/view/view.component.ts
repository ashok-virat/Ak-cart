import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';

declare var $;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  productId: string;
  authToken: string;
  datas: any;
  userId: string;
  cancelreq: boolean;
  notify: boolean;
  placed: boolean;
  cancelorder: boolean;
  buyerName: any;

  constructor(private router:Router,private service:ServiceService,private _route:ActivatedRoute,public toastr: ToastrService,public socketService:SocketService) {
    this.userId=Cookie.get('userId');
    this.productId=this._route.snapshot.paramMap.get('productId')
    this.authToken=Cookie.get('authToken');
    this.getsingleproduct();
    this.notify=true;
    this.cancelreq=true;
    this.placed=true;
    this.cancelorder=true;
    this.getplaceordernotify(this.userId);
    this.usercancelorderreqnotify(this.userId);
    this.usercancelordernotify(this.userId);
   }

  ngOnInit() {
    $(window).scroll(function(){
      if($(window).scrollTop()>50){
     
        $('.menu').addClass('sticky')
      
      }
      else {
       $('.stic').removeClass('sticky')
       
      }
 })

 $('.click').click(function(){
   $('.click').addClass('new')
   $('.side-nav').css('width','250px');
   $('.side-nav').css('z-index','700');
  
 })

$('.btn-close').click(function(){
     $('.side-nav').css('width','0');
     $('.click').removeClass('new')
 })

  }


  public getsingleproduct=()=>{
    let data={
      productId:this.productId
    }
    this.service.getsingleproduct(data,this.authToken).subscribe(
      data=>{
       
        this.datas=data.data;
      }
    )
  }
 
  public deleteproduct=()=>{
    let data={
      productId:this.productId
    }
    this.service.deleteproduct(data,this.authToken).subscribe(
      data=>{
      if(data.error==false){
        this.toastr.success(data.message)
        this.router.navigate(['/adminhome']);
      }
       else {
         this.toastr.error(data.message)
       }
      }
    )
  }

 public back=()=>{
   this.router.navigate(['/adminhome'])
 }

 public getplaceordernotify=(adminId)=>{
  this.socketService.addplaceordernotify(adminId).subscribe(
    data=>{
      this.notify=false;
      this.placed=false;
      this.buyerName=data.buyerName;
     
    }
  );
}
public usercancelorderreqnotify=(adminId)=>{
  this.socketService.usercancelorderreqnotify(adminId).subscribe(
    data=>{

      this.notify=false;
      this.cancelreq=false;
      this.buyerName=data.buyerName;
    }
  );
}

public usercancelordernotify=(adminId)=>{
  this.socketService.userordercancelnotify(adminId).subscribe(
    data=>{
     
      this.notify=false;
      this.cancelorder=false;
      this.buyerName=data.buyerName;
    }
  );
}

}
