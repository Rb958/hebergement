import { HttpService } from './../http-services/http.service';
import { Injectable } from '@angular/core';
import { ClientModel } from '../../models/entity/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends HttpService{

  url = 'api/client';

  create(client: any) {
    return this.post(this.url, client);
  }

  update(client: any, id: any) {
    return this.put(`${this.url}/${id}`, client);
  }

  getClientBy() {
    return this.get(this.url);
  }

}
