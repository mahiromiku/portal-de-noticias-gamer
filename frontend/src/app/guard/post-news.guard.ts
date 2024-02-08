import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../service/login/login.service';

export const postNewsGuard: CanActivateFn = (route, state) => {
  const isLog = inject(LoginService).isLog()
  if(isLog){
    return true;
  }
  return false
};
