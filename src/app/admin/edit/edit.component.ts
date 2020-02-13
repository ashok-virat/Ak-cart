import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';

declare var $;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  productId: string;
  authToken: string;
  imagePreview: string;
  datas: any;
  currendata: any;
  productName: any;
  price: any;
  product: any;
  discription: any;
  category: any;
  loader: boolean;
  file: any;
  buyerName: any;
  notify: boolean;
  cancelreq: boolean;
  placed: boolean;
  cancelorder: boolean;
  userId: string;

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
  public back=()=>{
    this.router.navigate(['/view',this.productId])
  }
  public getsingleproduct=()=>{
    let data={
      productId:this.productId
    }
    this.service.getsingleproduct(data,this.authToken).subscribe(
      data=>{
        
        this.datas=data.data;
        this.currendata=data["data"];    
        this.productName=this.currendata.productName;
        this.price=this.currendata.price;
        this.product=this.currendata.product;
        this.discription=this.currendata.discription;
       this.category=this.currendata.category
      }
    )
  }
 
   //image selection code end
 public imageselect(event){
  this.file=event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result.toString();
}
reader.readAsDataURL(this.file)
}
  
//image selection code end

public updateproduct=()=>{
 this.loader=true;
  if (this.file) {
    this.currendata.file = this.file;
    this.currendata.name = this.file.name;
  }
  this.currendata.productName=this.productName;
  this.currendata.price=this.price;
  this.currendata.category=this.category;
  this.currendata.discription=this.discription;
  this.currendata.productId=this.productId;
 
  this.service.updateproduct(this.currendata,this.authToken).subscribe(
    data=>{
     this.loader=false;
      if(data.error==false){
      this.toastr.success(data.message)
      this.router.navigate(['/view',this.productId])
      }
      else {
        this.toastr.error(data.message)
      }
    },
    err =>{
      this.toastr.error('some error occured');
      this.loader=false;
    }
  )
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
