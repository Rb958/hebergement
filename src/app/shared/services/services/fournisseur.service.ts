import {Injectable} from "@angular/core";
import {HttpService} from "../http-services/http.service";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService extends HttpService{

  urlPart = 'api/fournisseur/particulier';
  urlEntre = 'api/fournisseur/entreprise';

  getAllFournisseurPart(pageIndex: number, pageSize: number, queryParam: any) {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = pageIndex;
    queryParam.size = pageSize;
    return this.get(`${this.urlPart}/page-query/`, queryParam);
  }

  getAllFournisseurEntrep(currentPageIndex: number, currentPageElementSize: number, queryParam: any) {
    if (!queryParam){
      queryParam = Object.create(null);
    }
    queryParam.page = currentPageIndex;
    queryParam.size = currentPageElementSize;
    return this.get(`${this.urlEntre}/page-query/`, queryParam);
  }

  deleteFournisseurEntrep(id: any) {
    return this.delete(`${this.urlEntre}/${id}`);
  }

  deleteFournisseurPart(id: any) {
    return this.delete(`${this.urlPart}/${id}`);
  }

  createFournisseurPart(fournisseur: any) {
    return this.post(this.urlPart, fournisseur);
  }

  updateFournisseurPart(fournisseur: any, id: number) {
    return this.put(`${this.urlPart}/${id}`, fournisseur);
  }

  createFournisseurEntrep(fournisseur: any) {
    return this.post(this.urlEntre, fournisseur);
  }

  updateFournisseurEntrep(fournisseur: any, id: number) {
    return this.put(`${this.urlEntre}/${id}`, fournisseur);
  }

  findAllFournisseurParticulier() {
    return this.get(this.urlPart);
  }

  findAllFournisseurEntreprise() {
    return this.get(this.urlEntre);
  }
}
