import { Component, OnInit, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {
  combineLatest,
  map,
  merge,
  startWith,
  filter,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import {
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isBefore,
  parse,
  format,
  isDate,
  isFuture,
  isValid
} from 'date-fns';
import { Observable } from 'rxjs';

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor,
OnInit {
  form: FormGroup;
  private propagateChange = (_: any) => { };
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
  }

  validateDate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    return isValid(val)
          && isDate(val)
          && !isFuture(val)
          && differenceInYears(Date.now(), val) < 150 ? null : { dateOfBirthInvalid: true };
  }

  validateAge(ageNumkey: string, ageUnitKey: string): { [key: string]: any } {
    return (group: FormGroup): { [key: string]: any } => {
      const ageNum = group.controls[ageNumkey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal > 1 && ageNumVal < 150;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal > 1 && ageNumVal < 24;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal > 0 && ageNumVal < 90;
          break;
        }
        default: {
          return null;
        }
      }
    };
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  initForm(): void {
    this.form = this
                  .fb
                  .group({
                    birthday: ['', this.validateDate],
                    age: this
                          .fb
                          .group({ageNum: [], ageUnit: []})
                  }, {validator: this.validateAge('ageNum', 'ageUnit')});
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges
                                .pipe(map(d => {
                                  return {date: d, from: 'birthday'};
                                }))
                                .pipe(filter(_ => birthday.valid));
    const ageNum$ = ageNum.valueChanges
                            .pipe(startWith(ageNum.value))
                            .pipe(debounceTime(300))
                            .pipe(distinctUntilChanged());
    const ageUnit$ = ageUnit.valueChanges
                            .pipe(startWith(ageUnit.value))
                            .pipe(debounceTime(300))
                            .pipe(distinctUntilChanged());

    const age$ = Observable
                  .call(combineLatest(ageNum$, ageUnit$, (_n, _u) => {
                    // return this.toDate({age: _n, unit: _u});
                    return null;
                  }))
                  .pipe(map(d => {
                    return { date: d, from: 'age' };
                  }))
                  .pipe(filter(_ => this.form.get('age').valid));

    const merge$ = Observable.call(merge(birthday$, age$)).pipe(filter(_ => this.form.valid));
    merge$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.date === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, {emitEvent: false});
        }
        if (age.unit !== ageNum.value) {
          ageNum.patchValue(age.unit, { emitEvent: false });
        }
        this.propagateChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.toString());
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, {emitEvent: false});
          this.propagateChange(d.date);
        }
      }
    });
  }

  toDate(age: Age): string {
    const now = Date.now();
    const dateFormat = 'YYYY-MM-DD';
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), dateFormat);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), dateFormat);
      }
      case AgeUnit.Day : {
        return format(subDays(now, age.age), dateFormat);
      }
      default: {
        return null;
      }
    }
  }

  toAge(dateStr: string): Age {
  const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, 90), date) ? { age: differenceInDays(now, date), unit: AgeUnit.Day } :
           isBefore(subMonths(now, 24), date) ? {age: differenceInMonths(now, date), unit: AgeUnit.Month } :
            {
              age: differenceInYears(now, date),
              unit: AgeUnit.Year
            };
  }

}
