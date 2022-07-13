import * as CryptoJS from "crypto-js";
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AppStore{
  private DATA_KEY = '_app';
  private SECRET = '66079d121713c3828d7357e972f9b3c0';
  private IV = 'dc1f10209cc52a2e69e0bd004b146d8e';
  private sessionState: Subject<Boolean> = new Subject<Boolean>();

  constructor( ) {}

  isInitialized(): boolean{
    return localStorage.getItem(this.DATA_KEY) !== null;
  }

  save(data: LocalData): void{
    const secret = CryptoJS.enc.Utf8.parse(this.SECRET);
    const iv = CryptoJS.enc.Hex.parse(this.IV);
    const strData = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(strData, secret, {iv: iv});
    localStorage.removeItem(this.DATA_KEY);
    localStorage.setItem(this.DATA_KEY, encrypted.toString(CryptoJS.format.OpenSSL));
  }

  getData(): LocalData{
    const encrypted = localStorage.getItem(this.DATA_KEY);
    if(encrypted){
      const secret = CryptoJS.enc.Utf8.parse(this.SECRET);
      const iv = CryptoJS.enc.Hex.parse(this.IV);
      let decrypted = CryptoJS.AES.decrypt(encrypted, secret, {iv: iv}).toString(CryptoJS.enc.Utf8);
      decrypted = decrypted.replace(/_/gmi, '');
      return <LocalData>JSON.parse(decrypted, );
    }else {
      return new LocalData();
    }
  }

  initialize(lang: string) {
    const localData = new LocalData();
    localData.lang = lang;
    this.save(localData);
  }

  getSessionState(): Observable<Boolean>{
    if (this.getData() != null){
      const token = this.getData().token;
      const details = Object.create(jwt_decode(token));
      const rest = (details != undefined) ? details.exp - details.iat : 0;
      if (rest > 0) {
        this.sessionState.next(true);
        return this.sessionState.asObservable();
      }else{
        this.sessionState.next(false);
        return this.sessionState.asObservable();
      }
    }else{
      this.sessionState.next(false);
      return this.sessionState.asObservable();
    }
  }
}

export class LocalData{
  get byAuth(): boolean {
    return this._byAuth;
  }

  set byAuth(value: boolean) {
    this._byAuth = value;
  }
  private _lang: string = 'en';
  private _appVersion: string = '0.0.1';
  private _appName: string = 'LSD Gestion logement';
  private _sessionExists: boolean = false;
  private _keepSessionAlive: boolean = false;
  private _token: any = null;
  private _isFirstUse: boolean = true;
  private _theme: string = 'default';
  private _userAvatar: string = '';
  private _userName: string = 'Username';
  private _userRole: string = 'User';
  private _byAuth: boolean = false;

  constructor() {}

  get lang(): string {
    return this._lang;
  }

  set lang(value: string) {
    this._lang = value;
  }

  get appVersion(): string {
    return this._appVersion;
  }

  set appVersion(value: string) {
    this._appVersion = value;
  }

  get appName(): string {
    return this._appName;
  }

  public set appName(value: string) {
    this._appName = value;
  }


  get sessionExists(): boolean {
    return this._sessionExists;
  }

  set sessionExists(value: boolean) {
    this._sessionExists = value;
  }


  get keepSessionAlive(): boolean {
    return this._keepSessionAlive;
  }

  set keepSessionAlive(value: boolean) {
    this._keepSessionAlive = value;
  }


  get token(): any {
    return this._token;
  }

  set token(value: any) {
    this._token = value;
  }

  get isFirstUse(): boolean{
    return this._isFirstUse;
  }

  set isFirstUse(value: boolean){
    this._isFirstUse = value;
  }

  get theme(): string {
    return this._theme;
  }

  set theme(value: string) {
    this._theme = value;
  }


  get userAvatar(): string {
    return this._userAvatar;
  }

  set userAvatar(value: string) {
    this._userAvatar = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get userRole(): string {
    return this._userRole;
  }

  set userRole(value: string) {
    this._userRole = value;
  }
}
