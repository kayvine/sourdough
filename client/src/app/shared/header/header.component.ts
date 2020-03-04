import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemType } from '../../../../../shared/models/item-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() username: string;
  @Input() types: ItemType[];
  // @Input() item: Observable<Item>; // as example input

  @Output() logout: EventEmitter<any>;

  constructor() {
    this.logout = new EventEmitter();
  }

  // ngOnInit() {
  //   if (this.item) {
  //     this.item.subscribe(value => this.itemForm.patchValue(value));
  //   }
  // }
}
