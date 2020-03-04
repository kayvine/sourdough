import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/auth.service';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  firstName: string;
  now: number;

  constructor(private titleService: Title, private route: ActivatedRoute) {
    this.getFirstName();
    this.now = Math.floor(moment().hour() / 12);
  }

  ngOnInit() {
    this.route.data.subscribe(data =>
      this.titleService.setTitle(`${data.title} | Sourdough`)
    );
  }

  getFirstName() {
    const name = JSON.parse(localStorage.getItem('name'));
    this.firstName = name.split(' ')[0];
  }

  getGreeting() {
    // if you want more options, use if else statements
    return {
      [0]: 'Good morning',
      [1]: 'Good afternoon'
    }[this.now];
  }
}
