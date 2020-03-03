import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private userService: UserService) { }

  intercept(req: import('@angular/common/http').HttpRequest<any>, next: import('@angular/common/http').HttpHandler) {

    let token: String = null;

    if(this.userService.user) {
      token = this.userService.user.token;
    }

    if(token) {
      const bearer: string = "Bearer " + token;

      // Clone original request
      const newRequest: HttpRequest<any> = req.clone(
        { setHeaders: {
            Authorization: bearer
        }
      });

      //Finally release the updated request
      return next.handle(newRequest);
    }

    return next.handle(req);
  }
}
