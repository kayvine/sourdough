import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/core/item.service';

import { Item } from '../../../../../shared/models/item';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item$: Observable<Item>;
  id: string;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.item$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.itemService.loadItemDetail(params.get('id'))
      )
    );
  }

  goBackToList() {
    this.router.navigateByUrl(this.route.snapshot.parent.url.toString());
  }

  // if child-component
  //
  // @Input() item: Observable<Item>;
  //
  // ngOnInit() {
  //   if (this.item) {
  //     this.item.subscribe(value => this.itemForm.patchValue(value));
  //   }
  // }
}
