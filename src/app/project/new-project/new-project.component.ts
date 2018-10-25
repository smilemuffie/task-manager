import { Component, OnInit, Inject, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.styl']
})
export class NewProjectComponent implements OnInit {
  // Please add @optional() in constructor
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewProjectComponent>
  ) { }

  ngOnInit() {
    console.log(JSON.stringify(this.data));
  }

  onClick(): void {
    this.dialogRef.close('Received your message');
  }

}
