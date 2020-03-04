import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { ItemService } from 'src/app/core/item.service';
import { TypeService } from 'src/app/core/type.service';
import { Item } from '../../../../../shared/models/item';
import { ItemType } from '../../../../../shared/models/item-type';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, AfterViewInit {
  items$: Observable<Item[]>;
  selected: string[] = [];
  types: ItemType[];
  selectedType: string;
  buckets = [
    { name: 'recent', value: 'All' },
    { name: 'ongoing', value: 'Ongoing' },
    { name: 'draft', value: 'Draft' },
    { name: 'done', value: 'Completed' }
  ];
  selectedBucket: string;
  activeView = 'recent';
  sortables = [
    { name: 'last_updated', value: 'Last updated' },
    { name: 'creation_date', value: 'Creation date' }
  ];
  @ViewChild('input', { static: false }) input: ElementRef;
  @ViewChild('select', { static: false }) sort: ElementRef;

  constructor(
    private itemService: ItemService,
    private typeService: TypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.types$ = this.typeService.getAllTypes();
    // OR
    this.typeService
      .getAllTypes()
      // .pipe(map(itemtypes => (this.types = itemtypes)))
      .subscribe(itemtypes => (this.types = itemtypes));

    // this.route.paramMap
    //   .pipe(
    //     switchMap(params => {
    //       const typeParam = params.get('t');
    //       return this.typeService.getAllTypes().pipe(
    //         map(itemtypes => (this.types = itemtypes)),
    //         mergeMap(itemtypes => {
    //           return itemtypes.filter(type => type.name === typeParam); // use find??
    //         })
    //       );
    //     })
    //   )
    //   .subscribe(value => (this.currentType = value));

    this.items$ = this.itemService.findItems('', '', '');
  }

  ngAfterViewInit() {
    this.route.paramMap
      .pipe(
        map(params => {
          if (params.has('t')) {
            this.selectedType = params.get('t'); // if no params return without parameter, Use params.has()
            this.selectedBucket = '';
            return this.types.find(type => type.name === this.selectedType);
          } else if (params.has('bucket')) {
            this.selectedType = '';
            this.selectedBucket = params.get('bucket');
            return this.buckets.find(
              bucket => bucket.name === this.selectedBucket
            );
          } else {
            this.selectedType = '';
            return { name: 'recent', value: 'All' };
          }
        }),
        tap(_ => this.loadItemsPage())
      )
      .subscribe(value => (this.activeView = value.name));

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          // this.paginator.pageIndex = 0;
          this.loadItemsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(tap(() => this.loadItemsPage()))
    //   .subscribe();
  }

  loadItemsPage() {
    this.items$ = this.itemService.findItems(
      this.selectedType,
      this.selectedBucket,
      this.input.nativeElement.value
    );
    // this.items$ = this.route.paramMap.pipe(
    //   switchMap(params => {
    //     this.selectedType = params.get('t'); // if no params return without parameter, Use params.has()
    //     this.selectedBucket = params.get('bucket');
    //     return this.itemService.findItems(
    //       this.selectedType,
    //       this.selectedBucket,
    //       this.input.nativeElement.value
    //     );
    //   })
    // );
  }

  // Checkbox
  onChange(value: string, isChecked: boolean) {
    if (isChecked) {
      this.selected.push(value);
    } else {
      const index = this.selected.findIndex(id => id === value);
      this.selected.splice(index);
    }
  }

  // Checkbox
  isSelected(value: string): boolean {
    return this.selected.includes(value);
  }

  deselectAll() {
    this.selected = [];
  }

  // If you neglect to subscribe(), the service will not send the delete request to the server.
  // As a rule, an Observable does nothing until something subscribes.
  delete(id: string) {
    this.itemService.deleteItem(id).subscribe(() => this.loadItemsPage());
  }
}
