import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService{
  static USER_DATA_KEY = 'user_data';
  static API_KEY = 'api_token';
  protected api_token;
  userInfo = {
    email: 'tester@tester.com',
    password: '123456789'
  };
  constructor(
    private api: ApiService,
    private storage: Storage
  ) { }


  public authUser() {
    this.api.post('login', this.userInfo).subscribe(({success, user}) => {
      if (success) {
        this.saveUserData(user);
      }
    })
  }

  private saveUserData(user) {
    this.storage.set(LoginService.USER_DATA_KEY, user);
    this.storage.set(LoginService.API_KEY, user.api_token);
  }

  public getUserApi(): Promise<any>{
    return this.storage.get(LoginService.API_KEY);
  }
}
