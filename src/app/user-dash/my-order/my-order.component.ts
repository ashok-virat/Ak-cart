import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';

declare var $;

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  userId: string;
  userName: string;
  authToken: string;
  items: any;
  public p: Number = 1;
  public count: Number = 10;
  Itemlength: number;
  sellerName: any;
  notify: boolean;
  placed: boolean;
  orderreq: boolean;
  ordercancel: boolean;
  constructor(private router:Router,private service:ServiceService,private _route:ActivatedRoute,public toastr: ToastrService,
    public socketService:SocketService) { 
    this.userId=Cookie.get('userId');
    this.userName=Cookie.get('userName');
    this.authToken=Cookie.get('authToken');
    this.notify=true;
    this.placed=true;
    this.orderreq=true;
    this.ordercancel=true;
    this.getmycart();
    this.orderconfirmnotify(this.userId);
    this.orderreqdeletenotify(this.userId);
    this.admindeleteordernotify(this.userId);
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

  
  public getmycart=()=>{
    let data={
      userId:this.userId
    }
    this.service.getuserorders(data,this.authToken).subscribe(
      data=>{
       
        this.items=data.data;
        
        if(this.items.length==0){
          this.Itemlength=0;
         
        }
        else if(this.items.length>0){
        this.Itemlength=this.items.length;
      
        }
      }
    )
  }

  public back=()=>{
    this.router.navigate(['/userhome']);
  }

  public deleteorder=(productId,adminId)=>{
   let data={
     productId:productId,
     adminId:adminId,
     userId:this.userId
   }
   this.service.userdeleteorder(data,this.authToken).subscribe(
     data=>{
       if(data.error==false){
         this.toastr.success(data.message);
       }
       else {
         this.toastr.error(data.message);
       }
       this.getmycart()
     }
   )
  }

  public usercancelorder=(adminId)=>{
    let data={
      adminId:adminId,
      buyerName:this.userName
    }
    this.socketService.userordercancel(data);
  }

 
  public orderconfirmnotify=(userId)=>{
    this.socketService.adminorderconfirmnotify(userId).subscribe(
      data=>{
       
        this.notify=false;
        this.placed=false;
        this.sellerName=data.sellerName;
      
      }
    );
  }


  
  public orderreqdeletenotify=(userId)=>{
    this.socketService.admincancelorderreqnotify(userId).subscribe(
      data=>{
        this.notify=false;
        this.orderreq=false;
        this.sellerName=data.sellerName;
      }
    );
  }

  public admindeleteordernotify=(userId)=>{ 
    this.socketService.adminordercancelnotify(userId).subscribe(
      data=>{
        this.notify=false;
        this.ordercancel=false;
        this.sellerName=data.sellerName;
      }
    );
  }

}
