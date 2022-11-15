import { HttpService } from './../http-services/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService extends HttpService {

  url = 'api/stats';

  getStats(){
    return this.get(this.url);
  }
}
