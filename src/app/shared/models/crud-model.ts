import {Observable} from "rxjs";

export interface CrudModel<T>{
  create(object: T): Observable<T>;
  readAll(filter: any): Observable<Array<T>>
  readOne(id: any): Observable<T>;
  update(object: T): Observable<T>;
  delete(id: any): Observable<any>;
}
