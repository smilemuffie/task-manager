import { Component, OnInit, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl} from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    }, {
      provide : NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    }
  ]
})

export class ImageListSelectComponent implements ControlValueAccessor {
  @Input()title = '选择';
  @Input()cols = 6;
  @Input()rowHeight: any;
  @Input()avatarList: string[] = [];
  @Input()useSvgIcon = false;
  @Input()avatarWidth = '80px';

  selected: string;
  private propagateChange = (_: any) => {};

  constructor() {}


  onChange(i) {
    this.selected = this.avatarList[i];
    this.propagateChange(this.selected);
  }

  writeValue(obj: any): void {
    this.selected = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  validate(c: FormControl): {[key: string]: any} {
    return this.selected ? null : {
      imageListInvalid: {
        valid: false
      }
    };
  }
}
