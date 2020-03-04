import { Component, OnInit } from '@angular/core';
import { TypeService } from 'src/app/core/type.service';

import { ItemType } from '../../../../shared/models/item-type';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {
  types: ItemType[];

  constructor(private typeService: TypeService) {}

  ngOnInit() {
    this.getTypes();
  }

  getTypes() {
    this.typeService.getAllTypes().subscribe(types => (this.types = types));
  }
}
