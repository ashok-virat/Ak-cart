import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';
declare var $;

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  userId: any;
  userName: any;
  authToken: any;
  productId: any;
  datas: any;
  notify: boolean;
  placed: boolean;
  orderreq: boolean;
  ordercancel: boolean;
  sellerName: any;

  constructor(private router:Router,private service:ServiceService,public toastr: ToastrService,private _route:ActivatedRoute,
    public socketService:SocketService) { 
    this.userId=Cookie.get('userId');
    this.userName=Cookie.get('userName');
    this.authToken=Cookie.get('authToken');
    this.productId=this._route.snapshot.paramMap.get('productId');
    this.getsingleproduct();
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

  public back=()=>{
    this.router.navigate(['/userhome']);
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
