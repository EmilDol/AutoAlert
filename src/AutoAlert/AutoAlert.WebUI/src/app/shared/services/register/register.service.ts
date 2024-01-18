import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user/user.model';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private hideRegisterComponent = new BehaviorSubject<boolean>(true);
  hideRegisterComponent$ = this.hideRegisterComponent.asObservable();
  private apiUrl: string;

  constructor(private authService: AuthenticationService,private httpClient: HttpClient) 
  {
    this.apiUrl = authService.getApiUrl();
  }

  submitUser(user: User): Observable<any>
  {
    return this.httpClient.post<any>(this.apiUrl+'/users/register',  user )
    .pipe(
      map(response => {
        if (response && response.Succeeded) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }
  

}