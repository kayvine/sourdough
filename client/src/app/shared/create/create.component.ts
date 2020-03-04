import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeService } from 'src/app/core/type.service';
import { ItemType } from '../../../../../shared/models/item-type';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  types: ItemType[];

  constructor(
    private typeService: TypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.typeService
      .getAllTypes()
      .subscribe(itemtypes => (this.types = itemtypes));
  }

  cancel() {
    this.closePopup();
  }

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null } }], {
      relativeTo: this.route.parent.parent,
      skipLocationChange: true
    });
  }
}
