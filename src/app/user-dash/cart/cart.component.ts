import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';

declare var $;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId: string;
  userName: string;
  authToken: string;
  datas: any;
  items: any;
  public p: Number = 1;
  public count: Number = 10;
  Itemlength: number;
  notify: boolean;
  placed: boolean;
  orderreq: boolean;
  ordercancel: boolean;
  sellerName: any;

  constructor(private router:Router,private service:ServiceService,private _route:ActivatedRoute,public toastr: ToastrService,
    public socketService:SocketService) { 
    this.userId=Cookie.get('userId');
    this.userName=Cookie.get('userName');
    this.authToken=Cookie.get('authToken');
    this.getmycart();
    this.notify=true;
    this.placed=true;
    this.orderreq=true;
    this.ordercancel=true;
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
    this.service.getusercart(data,this.authToken).subscribe(
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

  public deleteorderreq=(productId,adminId)=>{
   let data={
     productId:productId,
     adminId:adminId,
     userId:this.userId
   }
   this.service.userdeletereq(data,this.authToken).subscribe(
     data=>{
       if(data.error==false){
         this.usercancelreq(adminId);
         this.toastr.success(data.message);
       }
       else {
         this.toastr.error(data.message);
       }
       this.getmycart()
     }
   )
  }

  public usercancelreq=(adminId)=>{
    let data={
      adminId:adminId,
      buyerName:this.userName
    }
    this.socketService.usercancelorderreq(data);
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
        this.getmycart();
      }
    );
  }

  public admindeleteordernotify=(userId)=>{ 
    this.socketService.adminordercancelnotify(userId).subscribe(
      data=>{
        this.notify=false;
        this.ordercancel=false;
        this.sellerName=data.sellerName;
        this.getmycart();
      }
    );
  }

}
