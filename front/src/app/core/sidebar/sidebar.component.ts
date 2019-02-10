import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.styl']
})
export class SidebarComponent implements OnInit {
  today = 'day';

  @Output() navClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    const date = new Date().getDate();
    this.today = `day${date}`;
  }

  onNavClick() {
    this.navClick.emit();
  }

}
