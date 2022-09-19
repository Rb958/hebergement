import {Injectable} from "@angular/core";
import {HttpService} from "../http-services/http.service";

@Injectable({
  providedIn: 'root'
})
export class LocataireService extends HttpService {

  url = 'api/locataire'

  getAllLocataireParticulierPagined(pageIndex: number, pageSize: number, queryParam?: any) {
    if (!queryParam) {
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get(`${this.url}/particulier/page-query`, queryParam);
  }

  deleteLocataireParticulier(id: number) {
    return this.delete(`${this.url}/particulier/${id}`);
  }

  saveLocataireParticulier(locataire: any) {
    return this.post(`${this.url}/particulier/`, locataire);
  }

  updateLocataireParticulier(id: any, locataire: any) {
    return this.put(`${this.url}/particulier/${id}`, locataire);
  }

  getAllLocataireSocietePagined(pageIndex: number, pageSize: number, queryParam?: any) {
    if (!queryParam) {
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get(`${this.url}/societe/page-query`, queryParam);
  }

  deleteLocataireSociete(id: number) {
    return this.delete(`${this.url}/societe/${id}`);
  }

  saveLocataireSociete(locataire: any) {
    return this.post(`${this.url}/societe/`, locataire);
  }

  updateLocataireSociete(id: any, locataire: any) {
    return this.put(`${this.url}/societe/${id}`, locataire);
  }

  getListLocataireSociete() {
    return this.get(`${this.url}/societe/`);
  }

  getListLocatairePart() {
    return this.get(`${this.url}/particulier/`);
  }

  findLocataireParticulierById(id: string | null) {
    return this.get(`${this.url}/particulier/${id}`);
  }
}
