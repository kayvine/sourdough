import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { finalize, tap } from 'rxjs/operators';
import { ItemService } from 'src/app/core/item.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  message: string;
  sending = false;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.form = this.fb.group(
      {
        type: '',
        title: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
        amount: ['', [Validators.required, Validators.min(0)]]
      }
      // { updateOn: 'blur' }
    );
  }

  ngOnInit() {
    console.log(
      'this.route.snapshot.paramMap.get type',
      this.route.snapshot.paramMap.get('type')
    );

    this.form.get('type').setValue(this.route.snapshot.paramMap.get('type'));
  }

  get title() {
    return this.form.get('title');
  }
  get description() {
    return this.form.get('description');
  }
  get price() {
    return this.form.get('price');
  }
  get amount() {
    return this.form.get('amount');
  }

  createItem(): void {
    this.sending = true;
    const item = this.form.value;
    this.itemService
      .createItem(item)
      .pipe(
        tap(console.log),
        finalize(() => {
          this.closePopup();
          this.sending = false;
        })
      )
      .subscribe(
        value => this.router.navigateByUrl(`${value.type}/${value._id}/edit`) // TODO: route creation
      );
  }

  goBack(): void {
    this.location.back();
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
