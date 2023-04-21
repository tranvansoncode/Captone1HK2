import { Injectable } from '@angular/core';
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const ROLE_KEY = 'Role_Key';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roles = [];
  constructor() { }
  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public setName(name: string) {
    window.sessionStorage.removeItem(NAME_KEY);
    // @ts-ignore
    window.sessionStorage.getItem(NAME_KEY, name);
  }
  public getName(): string {
    return window.sessionStorage.getItem(NAME_KEY);
  }
  public setRoles(roles: string[]) {
    window.sessionStorage.removeItem(ROLE_KEY);
    // @ts-ignore
    window.sessionStorage.getItem(ROLE_KEY, roles);
  }
  public getRoles(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(ROLE_KEY)).forEach()(role => {
        this.roles.push(role.authority);
      });
    }
    return this.roles;
  }
}
