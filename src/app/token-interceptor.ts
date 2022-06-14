import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

 
    constructor(public authService: AuthService, private router: Router) { 
        
    }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
       

        const token = this.authService.getJwtToken() 
        

        let cloned = req;

    if(token){
        cloned = req.clone({
            headers: req.headers.set("Authorization",
                "Bearer " + token)
        });
        console.log("He llegado a http", cloned);
    }
        
        return next.handle(cloned).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    console.log("He llegado a 401", error);
                    this.router.navigate(['/login']);
                }

                return throwError(error);
            })
            );
          
         
        }
   

}