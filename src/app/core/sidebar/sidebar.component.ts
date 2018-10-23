import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.styl']
})
export class SidebarComponent implements OnInit {
  today = 'day';

  constructor() { }

  ngOnInit() {
    const date = new Date().getDate();
    this.today = `day${date}`;
    console.log(this.today);

  }

}
