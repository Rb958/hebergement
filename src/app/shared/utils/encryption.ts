import {Env} from "./Env";

import * as CryptoJS from 'crypto-js';

export class Encryption{

  private key: any = null;
  private iv: any = null;

  private static encryption: Encryption;

  public static getInstance(){
    if (!this.encryption){
      this.encryption = new Encryption();
      this.encryption.key = CryptoJS.enc.Utf8.parse(Env.getEnv().security.key);
      this.encryption.iv = CryptoJS.enc.Hex.parse(Env.getEnv().security.iv);
    }
    return this.encryption;
  }

  public encrypt(data: any): string{
    const dataStr = JSON.stringify(data);
    if (this.key && this.iv) {
      return CryptoJS.AES.encrypt(dataStr, this.key, {iv: this.iv}).toString(CryptoJS.format.OpenSSL);
    }else{
      throw new Error("Unknown error");
    }
  }

  public decrypt(str: string): any{
    if (this.key && this.iv) {
      const data = CryptoJS.AES.decrypt(str, this.key, {iv: this.iv}).toString(CryptoJS.enc.Utf8);
      return JSON.parse(data);
    }else{
      throw new Error("Unknown error");
    }
  }
}
