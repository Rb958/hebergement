import { Injectable } from '@angular/core';
import {HttpService} from "../http-services/http.service";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../../models/api-response.model";
import {PageModel} from "../../models/page-model";
import {LocalModel} from "../../models/entity/local.model";
import {ReservationModel} from "../../models/entity/reservation.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends HttpService{

  url = 'api/booking';

  getAllReservationPaginated(pageIndex: number, pageSize: number, queryParam: any): Observable<ApiResponseModel<PageModel<ReservationModel>>> {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get(`${this.url}/page-query/`, queryParam);
  }

  create(reservation: any, userId: any) {
    return this.post(`${this.url}/${userId}`, reservation);
  }

  cancelBooking(id: any) {
    return this.patch(`${this.url}/${id}/cancel`, {});
  }

  getStats(){
    return this.get(`${this.url}/stats`);
  }

  findById(id: any) {
    return this.get(`${this.url}/${id}`);
  }

  getPayments(id: any) {
    return this.get(`${this.url}/${id}/payments`);
  }

  addPayment(userId: number | undefined, payment: any, bookingId: number) {
    return this.patch(`${this.url}/user/${userId}/payment/add/${bookingId}`, payment);
  }

  findAllByLocal(id: number) {
    return this.get(`${this.url}/local/${id}`);
  }

  cancelv2(id: number, data: any, userId: number | undefined) {
    return this.patch(`${this.url}/${id}/user/${userId}/v2/cancel`, data);
  }

  occuper(occupationReq: any) {
    return this.post(`${this.url}/${occupationReq.bookingId}/occuper`, occupationReq);
  }

  cloturer(occupationReq: any) {
    return this.post(`${this.url}/${occupationReq.bookingId}/cloturer`, occupationReq);
  }
}
