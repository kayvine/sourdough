import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from './core/auth.service';
import { TypeService } from './core/type.service';
import { ItemType } from '../../../shared/models/item-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  firstName: string;
  types: ItemType[];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private authService: AuthService,
    private typeService: TypeService
  ) {}

  ngOnInit() {
    // doesn't work yet
    const title = this.route.snapshot;
    console.log('hello', title);
    // this.route.children.find(route => route.).data.pipe(
    this.route.data
      .pipe(tap(data => console.log('data', data)))
      .subscribe(data =>
        this.titleService.setTitle(`${data.title} | Sourdough`)
      );

    // To create the 'Content' dropdown menu
    // this.typeService.getAllTypes().subscribe(types => (this.types = types));

    this.firstName = JSON.parse(localStorage.getItem('name'));
  }

  logout() {
    console.log('Logging out...');
    this.authService.logout();
  }
}
