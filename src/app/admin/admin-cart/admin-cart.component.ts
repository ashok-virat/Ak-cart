import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';

declare var $;

@Component({
  selector: 'app-admin-cart',
  templateUrl: './admin-cart.component.html',
  styleUrls: ['./admin-cart.component.css']
})
export class AdminCartComponent implements OnInit {
  userId: string;
  userName: string;
  authToken: string;
  items: any;
  public p: Number = 1;
  public count: Number = 10;
  Itemlength: number;
  notify: boolean;
  cancelreq: boolean;
  placed: boolean;
  cancelorder: boolean;
  buyerName: any;

  constructor(private router:Router,private service:ServiceService,private _route:ActivatedRoute,public toastr: ToastrService,public socketService:SocketService) { 
    this.userId=Cookie.get('userId');
    this.userName=Cookie.get('userName');
    this.authToken=Cookie.get('authToken');
    this.getmycart();
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

  
  public getmycart=()=>{
    let data={
      adminId:this.userId
    }
    this.service.getadmincart(data,this.authToken).subscribe(
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

  public deleteorderreq=(productId,userId)=>{
   let data={
     productId:productId,
     adminId:this.userId,
     userId:userId
   }
   this.service.admindeletereq(data,this.authToken).subscribe(
     data=>{
       if(data.error==false){
         this.deleteorder(userId)
         this.toastr.success(data.message);
       }
       else {
         this.toastr.error(data.message);
       }
       this.getmycart()
     }
   )
  }

  
  public acceptorderreq=(productId,userId,productName,userfirstName,userlastName)=>{
    let user=[];
    user.push(this.userName.split(' '));
     let names=user[0];
   
     let data={
       adminId:this.userId,
       productId:productId,
       userId:userId,
       adminfirstName:names[0],
       adminlastName:names[1],
       productName:productName,
       userfirstName:userfirstName,
       userlastName:userlastName
     }
    this.service.adminacceptreq(data,this.authToken).subscribe(
      data=>{
        if(data.error==false){
          this.confirmorder(userId)
          this.toastr.success(data.message);
        }
        else {
          this.toastr.error(data.message);
        }
        this.getmycart()
      }
    )
   }
 
   public confirmorder=(userId)=>{
     
    let data={
      userId:userId,
      sellerName:this.userName
    }
    
    this.socketService.adminorderconfirm(data);
  }


  public deleteorder=(userId)=>{ 
    let data={
      userId:userId,
      sellerName:this.userName
    }
    this.socketService.admincancelorderreq(data);
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
