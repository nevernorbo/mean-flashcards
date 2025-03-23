import { NgClass } from '@angular/common';
import { Component, forwardRef, input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

// This is more complicated than I thought
// https://stackoverflow.com/questions/76450563/how-can-i-create-reusable-input-field-in-angular

@Component({
  selector: 'form-input',
  imports: [ReactiveFormsModule, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
  template: `
    @if (formControl) {
      <div class="relative">
        <input
          [id]="id()"
          [name]="name()"
          [type]="type()"
          [required]="required()"
          [placeholder]="placeholder()"
          [formControl]="formControl"
          class="peer w-full rounded-md border-skin-color-faintest bg-skin-color-surface text-skin-base placeholder-transparent shadow-sm placeholder:select-none focus:border-skin-color-primary focus:ring-0"
          [ngClass]="{
            'border required:border-red-500':
              formControl.invalid &&
              (formControl.dirty || formControl.touched) &&
              formControl.errors?.['required'],
          }"
          [title]="
            formControl.invalid &&
            (formControl.dirty || formControl.touched) &&
            formControl.errors?.['required']
              ? 'This field is required'
              : ''
          "
        />
        <label
          [htmlFor]="name()"
          class="pointer-events-none absolute -top-2.5 left-2 bg-skin-color-surface px-1 text-sm text-skin-faint transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:left-2 peer-focus:bg-skin-color-surface peer-focus:text-sm"
        >
          {{ placeholder() }}
        </label>

        @if (
          formControl.invalid &&
          (formControl.dirty || formControl.touched) &&
          formControl.errors?.['email']
        ) {
          <div
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-skin-color-surface text-sm text-skin-muted"
          >
            <span>Invalid email format</span>
          </div>
        }
      </div>
    }
  `,
})
export class FormInputComponent implements OnInit, ControlValueAccessor {
  id = input('');
  name = input('');
  type = input('');
  required = input(false);
  placeholder = input('');

  formControl!: FormControl;
  onTouched: any;
  onChange: any;

  ngOnInit(): void {
    const validators: ValidatorFn[] = [];

    if (this.required()) {
      validators.push(Validators.required);
    }

    if (this.type() === 'email') {
      validators.push(Validators.email);
    }

    this.formControl = new FormControl('', validators);
  }

  writeValue(value: any): void {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.formControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
}
