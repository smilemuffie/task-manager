import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.styl']
})
export class ProjectItemComponent implements OnInit {
  @Input () item: object;

  constructor() { }

  ngOnInit() {
  }

}
