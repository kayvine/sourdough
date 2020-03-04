import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { ItemType } from '../../../../shared/models/item-type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private API_URL = 'itemtypes';

  constructor(private http: HttpClient) {}

  // createType(type: ItemType): Observable<ItemType> {
  //   return this.http.post<ItemType>(this.API_URL, type).pipe(
  //     tap(console.log),
  //     map(res => res['payload']),
  //     catchError(this.handleError('createItem', type))
  //   );
  // }

  getAllTypes(): Observable<ItemType[]> {
    return this.http.get<ItemType[]>(this.API_URL).pipe(
      // tap(console.log),
      map(res => res['payload']),
      catchError(this.handleError('getAllTypes'))
    );
  }

  // updateItem(type: ItemType, id: string) {
  //   return this.http.put(`${this.API_URL}/${id}`, type).pipe(
  //     tap(console.log),
  //     map(res => res['payload']),
  //     catchError(this.handleError('updateItem', type))
  //   );
  // }

  // deleteItem(id: string) {
  //   return this.http.delete(`${this.API_URL}/${id}`).pipe(
  //     tap(_ => console.log(`deleted item id=${id}`)),
  //     map(res => res['payload']),
  //     catchError(this.handleError('deleteItem'))
  //   );
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any) => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
