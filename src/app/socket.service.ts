import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  baseUrl: string;
  socket: any;

  constructor() { 
    this.baseUrl='http://35.154.25.2:4001';
    this.socket=io(this.baseUrl);
  }
  
  
      //verify and setuser code is called
      public verifyUser:any=()=>{
        let ak=Observable.create((observer)=>
        {
          this.socket.on('verifyUser',(data)=>{
            observer.next(data);
          }) 
        }) 
         return ak;
        } 
        public setUser=(userId)=>{
          this.socket.emit('set-user',userId);
        }
        //verify and setuser code is end

           //onlineuserlist code strat 
      public onlineUserList=()=>{
        let ak=Observable.create((observer)=>{
          this.socket.on('online-user-list',(result)=>{
            observer.next(result)
          })
        })
        return ak;
      }
       //onlineuserlist code end

    
       //disconnected code start
       public disconnectedSocket=()=>{
        let ak=Observable.create((observer)=>{
          this.socket.emit("disconnect",()=>{
            observer.next();
          })
        })
        return ak;
      }
      //disconnected code end

      


      //place-order code start
      public addplaceorder=(data)=>{
        this.socket.emit('place-order',data);
       }
        //place-order code end

        
      //getting placeorder notification code start
       public  addplaceordernotify=(adminId)=>{
        let ak=Observable.create((observer)=>{
          this.socket.on(`${adminId} placeordernotify`,(data)=>{
            observer.next(data)
          })
        })
        return ak;
       }
      //getting placeorder notification code end

       //user order req code start
       public usercancelorderreq=(data)=>{
        this.socket.emit('userorderreqcancel',data);
       }
        //user order req code end

        
      //user order req  notification code start
       public  usercancelorderreqnotify=(adminId)=>{
       
        let ak=Observable.create((observer)=>{
          this.socket.on(`${adminId} userorderreqcancel`,(data)=>{
          
            observer.next(data)
          })
        })
        return ak;
       }
      //user order req notification code end


        //admin-order-req-cancel code start
        public admincancelorderreq=(data)=>{
          this.socket.emit('admin-order-req-cancel',data);
         }
          //admin-order-req-cancel code end
  
          
        //admin-order-req-cancel notification code start
         public  admincancelorderreqnotify=(userId)=>{
         
          let ak=Observable.create((observer)=>{
            this.socket.on(`${userId} admin-order-req-cancel`,(data)=>{
            
              observer.next(data)
            })
          })
          return ak;
         }
        //admin-order-req-cancel notification code end

        
        //admin-order-confirm code start
        public adminorderconfirm=(data)=>{
          
          this.socket.emit('admin-order-confirm',data);
         }
          //admin-order-confirm code end
  
          
        //admin-order-confirm notification code start
         public adminorderconfirmnotify=(userId)=>{
         
          let ak=Observable.create((observer)=>{
            this.socket.on(`${userId} admin-order-confirm`,(data)=>{
            
              observer.next(data)
            })
          })
          return ak;
         }
        //admin-order-confirm notification code end

         //admin-order-cancel code start
         public adminordercancel=(data)=>{
          this.socket.emit('admin-order-cancel',data);
         }
          //admin-order-cancel code end
  
          
        //admin-order-cancel notification code start
         public adminordercancelnotify=(userId)=>{
         
          let ak=Observable.create((observer)=>{
            this.socket.on(`${userId} admin-order-cancel`,(data)=>{
            
              observer.next(data)
            })
          })
          return ak;
         }
        //admin-order-cancel notification code end


        //user-order-cancel code start
        public userordercancel=(data)=>{
          this.socket.emit('user-order-cancel',data);
         }
          //user-order-cancel code end
  
          
        //user-order-cancel notification code start
         public userordercancelnotify=(adminId)=>{
         
          let ak=Observable.create((observer)=>{
            this.socket.on(`${adminId} user-order-cancel`,(data)=>{
            
              observer.next(data)
            })
          })
          return ak;
         }
        //user-order-cancel notification code end

}
