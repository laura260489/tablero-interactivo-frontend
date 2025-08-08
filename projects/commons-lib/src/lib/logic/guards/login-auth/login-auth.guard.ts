import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '../../state/auth/auth.state';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})

/**
** Guard para página de autenticación de proveedores
* @autor laurarojas
*/
export class LoginAuthGuard implements CanActivate {

  constructor(private readonly router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    const user = JSON.parse(sessionStorage.getItem('user'));

    const isAllowed = this.magamementAdmin(user, state.url);

    if (!isAllowed) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

  private magamementAdmin(user: User, route: string): boolean {
    if (!user) {
      return false;
    }

    if (route.includes('panel-control') && !user.role.includes('admin')) {
      return false;
    }

    return true;
  }

}

