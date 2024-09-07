import { 
  ActivatedRouteSnapshot,
  GuardResult, 
  MaybeAsync, 
  RouterStateSnapshot 
} from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      const isAuthenticated = this.authService.isAuthenticated();

      if (!isAuthenticated) {
        return false;
      }

      return true;
  }
}