import {environment} from "../../../environments/environment";
import * as environmentProd from '../../../environments/environment.prod';
export class Env{
  static getEnv(): any{
    return environment.production ? environmentProd : environment;
  }
}
