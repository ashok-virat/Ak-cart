import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';

declare var $;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  userId: any;
  userName: any;
  authToken: any;
  datas: any;
  public p: Number = 1;
  public count: Number = 6;
  notify: boolean;
  placed: boolean;
  sellerName: any;
  orderreq: boolean;
  ordercancel: boolean;

  constructor(private router:Router,private service:ServiceService,public toastr: ToastrService,private _route:ActivatedRoute,public socketService:SocketService) { 
    this.userId=Cookie.get('userId');
    this.userName=Cookie.get('userName');
    this.authToken=Cookie.get('authToken');
    this.notify=true;
    this.placed=true;
    this.orderreq=true;
    this.ordercancel=true;
    this.getallproducts();
    this.verifyUser();
    this.getonlineUsers();
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
  

  //verify user code start
  public verifyUser=()=>{
    this.socketService.verifyUser().subscribe(
      data=>{
        this.socketService.setUser(this.userId);
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
}
//verify user code end


//get online users code start
public getonlineUsers=()=>{
  this.socketService.onlineUserList().subscribe(
    data=>{
     
    },
    err=>{
      this.toastr.error('some error occured')
    }
  )
}
//get online users code end


  public getallproducts=()=>{
    this.service.getallproduct(this.authToken).subscribe(
      data=>{
        this.datas=data.data.reverse();
          }
        )
  }

  public placeorder=(productId,adminId,productName,adminName)=>{
    let user=[];
    let admin=[];
    user.push(this.userName.split(' '));
     let names=user[0];
   admin.push(adminName.split(' '));
   let admins=admin[0];
     let data={
       adminId:adminId,
       productId:productId,
       userId:this.userId,
       userfirstName:names[0],
       userlastName:names[1],
       adminfirstName:admins[0],
       adminlastName:admins[1],
       productName:productName
     }
     this.service.placeorder(data,this.authToken).subscribe(
       data=>{
        
        if(data.error==false){
          this.toastr.success(data.message);
          this.addplaceorder(adminId);
          }
          else {
            this.toastr.error(data.message);
          }
       }
     )
  }

  public logout=()=>{
    this.toastr.success('Logout Successfully');
    this.router.navigate(['/signin']);
    Cookie.delete('authToken');
    Cookie.delete('userName');
    Cookie.delete('userId');
    
    this.socketService.disconnectedSocket();
  }


  public addplaceorder=(adminId)=>{
    let data={
      adminId:adminId,
      buyerName:this.userName
    }
    this.socketService.addplaceorder(data);
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
