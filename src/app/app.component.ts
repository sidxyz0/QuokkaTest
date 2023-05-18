import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentRoute: String = '';
  excludeRoutes: String[] = ['', '/', '/auth', '/auth/login'];
  showSideBar: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(ev => {
      this.currentRoute = this.router.url
      if (this.excludeRoutes.includes(this.currentRoute)) {
        this.showSideBar = false;
      }
      else {
        this.showSideBar = true
      }
      // console.log(this.currentRoute)
    })
  }
}
