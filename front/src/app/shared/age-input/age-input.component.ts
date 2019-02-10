import { Component, OnInit, forwardRef, Input} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {
  map,
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
import { Observable, Subscription, combineLatest, merge } from 'rxjs';
import { isValidDate, convertToDate } from '../../utils/date';

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
  ageUnits = [
    { value: AgeUnit.Year, label: '岁' },
    { value: AgeUnit.Month, label: '月' },
    { value: AgeUnit.Day, label: '天' }
  ];
  @Input()
  daysTop = 90;
  @Input()
  daysBottom = 0;
  @Input()
  monthsTop = 24;
  @Input()
  monthsBottom = 1;
  @Input()
  yearsBottom = 1;
  @Input()
  yearsTop = 150;
  @Input()
  debounceTime = 300;
  @Input()
  dateFormat = 'YYYY-MM-DD';
  private subscription: Subscription;
  private propagateChange = (_: any) => { };
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    return null;
  }

  validateDate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    return isValidDate(val) ? null : { birthdayInvalid: true };
  }

  validateAge(ageNumkey: string, ageUnitKey: string): { [key: string]: any } {
    return (group: FormGroup): { [key: string]: any } | null => {
      const ageNum = group.controls[ageNumkey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal > this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal > this.monthsBottom && ageNumVal < this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal > this.daysBottom && ageNumVal < this.daysTop;
          break;
        }
        default: {
          result = false;
          break;
        }
      }
      return result ? null : { ageInvalid: true };
    };
  }

  writeValue(obj: Date): void {
    if (obj) {
      const date = parse(convertToDate(obj));
      const birthday = this.form.get('birthday');
      if (!birthday) {
        return;
      }
      birthday.patchValue(date, { emitEvent: true });
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  initForm(): void {
    const initDate = convertToDate(subYears(Date.now(), 30));
    const initAge = this.toAge(initDate);
    this.form = this
                  .fb
                  .group({
                    birthday: [parse(initDate), this.validateDate],
                    age: this
                          .fb
                          .group({
                            ageNum: [initAge.age],
                            ageUnit: [initAge.unit]},
{
  validator: this.validateAge('ageNum', 'ageUnit')
}
                            )
                  });
    const birthday = this.form.get('birthday');
    if (!birthday) {
      return;
    }
    const age = this.form.get('age');
    if (!age) {
      return;
    }
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges
                                .pipe(
                                map(d => {
                                  return {date: d, from: 'birthday'};
                                }),
                                debounceTime(this.debounceTime),
                                distinctUntilChanged(),
                                filter(_ => birthday.valid)
                                );
    const ageNum$ = ageNum.valueChanges
                            .pipe(
                              startWith(ageNum.value),
                              debounceTime(this.debounceTime),
                              distinctUntilChanged()
                            );
    const ageUnit$ = ageUnit.valueChanges
                            .pipe(
                              startWith(ageUnit.value),
                              debounceTime(this.debounceTime),
                              distinctUntilChanged()
                            );
    const age$ = combineLatest(ageNum$, ageUnit$, (_n: number, _u: AgeUnit) => this.toDate({age: _n, unit: _u}))
                    .pipe(
                      map(d => ({date: d, from: 'age'})),
                      filter(_ => this.form.get('age').valid)
                    );

    const merged$ = merge(birthday$, age$).pipe(filter(_ => this.form.valid));
    this.subscription = merged$.subscribe(d => {
      const aged = this.toAge(d.date);
      if (d.from === 'birthday') {
        if (aged.age !== ageNum.value) {
          ageNum.patchValue(aged.age, {emitEvent: false});
        }
        if (aged.unit !== ageUnit.value) {
          ageNum.patchValue(aged.unit, { emitEvent: false });
        }
        this.propagateChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.toString());
        if (aged.age !== ageToCompare.age || aged.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, {emitEvent: false});
          this.propagateChange(d.date);
        }
      }
    });
  }

  toDate(age: Age): string {
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Year: {
        return convertToDate(subYears(now, age.age));
      }
      case AgeUnit.Month: {
        return convertToDate(subMonths(now, age.age));
      }
      case AgeUnit.Day : {
        return convertToDate(subDays(now, age.age));
      }
      default: {
        // 默认设置为当天
        return '1990-01-01';
      }
    }
  }

  toAge(dateStr: string): Age {
  const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, this.daysTop), date) ? { age: differenceInDays(now, date), unit: AgeUnit.Day } :
           isBefore(subMonths(now, this.monthsTop), date) ? {age: differenceInMonths(now, date), unit: AgeUnit.Month } :
            {
              age: differenceInYears(now, date),
              unit: AgeUnit.Year
            };
  }

  ngOnDestory(): void {
    this.subscription.unsubscribe();
  }

}
