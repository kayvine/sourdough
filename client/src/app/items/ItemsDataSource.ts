import { OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ItemService } from '../core/item.service';

import { Item } from '../../../../shared/models/item';

export class ItemsDataSource implements OnInit, OnDestroy {
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  items$: Observable<Item[]>;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.items$ = this.itemsSubject.asObservable();
  }

  ngOnDestroy() {
    this.itemsSubject.complete();
    this.loadingSubject.complete();
  }

  loadItems() {
    // loadItems(
    //   courseId: number,
    //   filter = '',
    //   sortDirection = 'asc',
    //   pageIndex = 0,
    //   pageSize = 3
    // ) {
    this.loadingSubject.next(true);

    this.itemService
      // .findItems(courseId, filter, sortDirection, pageIndex, pageSize)
      .findItems('type')
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(items => this.itemsSubject.next(items));
  }
}
