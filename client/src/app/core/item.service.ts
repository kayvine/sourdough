import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Item } from '../../../../shared/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private API_URL = 'items';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.API_URL, item).pipe(
      tap(console.log),
      map(res => res['payload']),
      catchError(this.handleError('createItem', item))
    );
  }

  findItems(
    type: string = '',
    bucket: string = '',
    filter: string = ''
    //   sortBy= 'last_updated',
    //   sortOrder = 'asc',
    //   pageNumber = 0,
    //   pageSize = 3
  ): Observable<Item[]> {
    return this.http
      .get<Item[]>(this.API_URL, {
        params: new HttpParams()
          .set('type', type)
          .set('bucket', bucket)
          .set('filter', filter)
        //     .set('sortOrder', sortOrder)
        //     .set('pageNumber', pageNumber.toString())
        //     .set('pageSize', pageSize.toString())
      })
      .pipe(map(res => res['payload']));
  }

  loadItemDetail(id: string): Observable<Item> {
    return this.http
      .get<Item>(`${this.API_URL}/${id}`)
      .pipe(map(res => res['payload']));
  }

  updateItem(item: Item, id: string) {
    return this.http.put(`${this.API_URL}/${id}`, item).pipe(
      tap(console.log),
      map(res => res['payload']),
      catchError(this.handleError('updateItem', item))
    );
  }

  deleteItem(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      tap(_ => console.log(`deleted item id=${id}`)),
      map(res => res['payload']),
      catchError(this.handleError('deleteItem'))
    );
  }

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
