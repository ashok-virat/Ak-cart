import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/socket.service';

declare var $;


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  userId: string;
  userName: string;
  authToken: string;
  public p: Number = 1;
  public count: Number = 6;
  file: any;
  productName: any;
  prize: any;
  category: any;
  discription: any;
  price: any;
  loader: boolean;
  datas: any;
  items: any;
  Itemlength: number;
  notify: boolean;
  buyerName: any;
  cancelreq: boolean;
  placed: boolean;
  cancelorder: boolean;

  constructor(private router:Router,private service:ServiceService,public toastr: ToastrService,public socketService:SocketService) { 
    this.userId=Cookie.get('userId');
    this.userName=Cookie.get('userName');
    this.authToken=Cookie.get('authToken');
    this.notify=true;
    this.cancelreq=true;
    this.placed=true;
    this.cancelorder=true;
    this.getmyproducts();
    this.getmycart();
    this.verifyUser();
    this.getonlineUsers();
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


  
  //image selection code start
  public imageselect(event){
    this.file=event.target.files[0];
  
    const reader = new FileReader();
  reader.onload = () => {

}
  reader.readAsDataURL(this.file)
  }
   //image selection code end
  
  public postproduct=()=>{
     
    if(!this.file){
      this.toastr.warning('Please choose some Image')
    }
    else if(!this.productName){
     this.toastr.warning('Please Enter productName')
    }
    else if(!this.price){
     this.toastr.warning('Please Enter prize')
    }
    else if(!this.discription){
      this.toastr.warning('Please Enter discription')
     }
    else if(!this.category){
     this.toastr.warning('Please Enter category')
    }
   
    else {
    let data={
     product:this.file,
     name:this.file.name,
     productName:this.productName,
     price:this.price,
     discription:this.discription,
     adminName:this.userName,
     category:this.category,
     userId:this.userId
    }
    
    this.loader=true;
    this.service.addproduct(data,this.authToken).subscribe(
      
      data=>{
        
       this.loader=false;
       if(data.error==false){
     this.file='';
     this.productName='';
     this.price='';
     this.discription='';
     this.category='';
         this.toastr.success(data.message)
        this.getmyproducts();
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

  public getmyproducts=()=>{
    let data={
      userId:this.userId
    }
    this.service.getmyproduct(data,this.authToken).subscribe(
      data=>{
        
    this.datas=data.data.reverse();
    
      }
    )
  }

  public logout=()=>{
    this.toastr.success('Logout Successfully');
    this.router.navigate(['/signin']);
    Cookie.delete('authToken');
    Cookie.delete('userName');
    Cookie.delete('userId');
    this.socketService.exitsocket();
    this.socketService.disconnectedSocket();
  }


    public getplaceordernotify=(adminId)=>{
      this.socketService.addplaceordernotify(adminId).subscribe(
        data=>{
          this.notify=false;
          this.placed=false;
          this.buyerName=data.buyerName;
         this.toastr.success(`${this.buyerName} buy some product`)
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
