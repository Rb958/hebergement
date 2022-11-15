import * as CryptoJS from "crypto-js";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AppStore{
  private DATA_KEY = 'logement';
  private SECRET = '66079d121713c3828d7357e972f9b3c0';
  private IV = 'dc1f10209cc52a2e69e0bd004b146d8e';
  private sessionState: Subject<Boolean> = new Subject<Boolean>();
  private data: BehaviorSubject<LocalData> = new BehaviorSubject<LocalData>(new LocalData());
  public  data$ = this.data.asObservable();

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
    this.data.next(data);
    // this.data.complete();
  }

  getData(): LocalData{
    const encrypted = localStorage.getItem(this.DATA_KEY);
    if(encrypted){
      const secret = CryptoJS.enc.Utf8.parse(this.SECRET);
      const iv = CryptoJS.enc.Hex.parse(this.IV);
      let decrypted = CryptoJS.AES.decrypt(encrypted, secret, {iv: iv}).toString(CryptoJS.enc.Utf8);
      decrypted = decrypted.replace(/_/gmi, '');
      const data = <LocalData>JSON.parse(decrypted);
      this.data.next(data);
      // this.data.complete();
      return data;
    }else {
      return new LocalData();
    }
  }

  initialize(lang: string) {
    const localData = new LocalData();
    localData.token = null;
    localData.sessionExists = false;
    localData.hasCashierOpened = false;
    localData.userDetails = null;
    localData.lang = lang;
    localData.keepSessionAlive = false;
    localData.isFirstUse = false;
    localData.notifications = [];
    this.save(localData);
  }

  getSessionState(): Observable<Boolean>{
    if (this.getData() != null && this.getData().token){
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

  logout(localData: LocalData) {
    localData.token = null;
    localData.sessionExists = false;
    localData.hasCashierOpened = false;
    localData.userDetails = null;
    localData.notifications = [];
    this.save(localData);
  }
}

export class UserDetails{
  private _firstname: string = '';
  private _lastname: string = '';
  private _userId: number = 0;
  private _role: string = '';
  private _username: string = '';
  private _avatar: string = '';

  constructor() { }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }
}

export class LocalData{
  private _lang: string = 'fr-FR';
  private _appVersion: string = '0.0.1';
  private _appName: string = 'LSD Gestion logement';
  private _sessionExists: boolean = false;
  private _keepSessionAlive: boolean = false;
  private _token: any = null;
  private _isFirstUse: boolean = true;
  private _theme: string = 'default';
  private _byAuth: boolean = false;
  private _hasCashierOpened = false;
  private _userDetails: UserDetails | null = null;
  private _notifications: Array<any> = [];

  constructor() {
    this._notifications = new Array<any>();
  }

  get hasCashierOpened(): boolean {
    return this._hasCashierOpened;
  }
  set hasCashierOpened(value: boolean) {
    this._hasCashierOpened = value;
  }

  get byAuth(): boolean {
    return this._byAuth;
  }
  set byAuth(value: boolean) {
    this._byAuth = value;
  }

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

  get userDetails(): UserDetails | null {
    return this._userDetails;
  }

  set userDetails(value: UserDetails | null) {
    this._userDetails = value;
  }

  get notifications(): Array<any> {
    return this._notifications;
  }

  set notifications(value: Array<any>) {
    this._notifications = value;
  }
}
