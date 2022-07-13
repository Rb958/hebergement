export class UserModel{
  private _id: number;
  private _username: string;
  private _password: string;
  private _createdAt: Date;
  private _lastupdatedAt: Date;
  private _connectedAt: Date;
  private _enabled: boolean;
  private _firstname: string | null;
  private _lastname: string;
  private _phone: string | null;
  private _roles: Array<any>;

  constructor() {
    this._id = 0;
    this._username = '';
    this._password = '';
    this._createdAt = new Date();
    this._lastupdatedAt = new Date();
    this._connectedAt = new Date();
    this._enabled = false;
    this._firstname = null;
    this._lastname = '';
    this._phone = null;
    this._roles = [];
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get lastupdatedAt(): Date {
    return this._lastupdatedAt;
  }

  set lastupdatedAt(value: Date) {
    this._lastupdatedAt = value;
  }

  get connectedAt(): Date {
    return this._connectedAt;
  }

  set connectedAt(value: Date) {
    this._connectedAt = value;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  get firstname(): string | null {
    return this._firstname;
  }

  set firstname(value: string | null) {
    this._firstname = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get phone(): string | null {
    return this._phone;
  }

  set phone(value: string | null) {
    this._phone = value;
  }

  get roles(): Array<any> {
    return this._roles;
  }

  set roles(value: Array<any>) {
    this._roles = value;
  }
}
