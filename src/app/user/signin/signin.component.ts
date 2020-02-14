import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

declare var $;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: any;
  password: any;
  loader: boolean;

  constructor(private router:Router,private service:ServiceService,public toastr: ToastrService) { }

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

  $('document').ready(function(){
    $('#box').click(function(){
      $('#password').attr('type',$(this).is(':checked') ? 'text' : 'password')
      
   })
  })
  }

  public signup=()=>{
    this.router.navigate(['/signup'])
  }

  
public signin=()=>{
  
  let data={
    email:this.email,
    password:this.password
  }
   if(!this.email){
    this.toastr.warning('Please Enter email')
  }
  else if(!this.password){
    this.toastr.warning('Please Enter password')
  }

    else {
      this.loader=true;
  this.service.signin(data).subscribe(
    data=>{
     
      this.loader=false;
      if(data.error===false) {
        Cookie.set('userId',data.data.userDetails.userId);
        Cookie.set('authToken',data.data.authToken);
        Cookie.set('userName',`${data.data.userDetails.firstName} ${data.data.userDetails.firstName}`);
          if(data.data.userDetails.role=="Admin"){
            this.router.navigate(['/adminhome'])
          }
          else {
            this.router.navigate(['/userhome'])
          }
      }
      else {
        
        this.toastr.error(data.message)
      }
    },
    err=>{
      this.toastr.error('some error occured');
      this.loader=false;
        }
  )
    }
}



  


}
