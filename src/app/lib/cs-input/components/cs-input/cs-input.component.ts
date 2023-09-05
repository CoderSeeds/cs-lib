import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, FormControl } from '@angular/forms';

@Component({
  selector: 'cs-input',
  templateUrl: './cs-input.component.html',
  styleUrls: ['./cs-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CsInputComponent)
    }
  ]
})
export class CsInputComponent implements ControlValueAccessor, OnInit {

  @Input() label = ''

  @Input() type = 'text'

  @Input() value = '';

  @Input() disable = false

  @Input() formControlName = ''

  @Input() formControl?: FormControl

  @Input() customErrors:any = {}

  controlErrors:any = {}

  errors: string[] = []

  constructor(private controlContainer: ControlContainer){}

  ngOnInit(): void {
    this.configureErrorListener()
  }

  configureErrorListener(){
    this.inputControl?.valueChanges.subscribe(() => {
      this.setControlErrors()
    })
    this.inputControl?.statusChanges.subscribe(() => {
      this.setControlErrors()
    })
  }

  setControlErrors(){
    this.controlErrors = this.inputControl?.errors as any;
    this.errors = []
    if(this.controlErrors){
      Object.keys(this.controlErrors).forEach(key => {
        this.errors.push(key);
      })
    }
  }

  get inputControl(){
    if(this.controlContainer){
      return this.controlContainer.control?.get(this.formControlName)
    }
    if(this.formControl){
      return this.formControl
    }
    return null;
  }

  get invalid(){
    return this.errors.length && this.inputControl?.invalid && this.inputControl?.touched;
  }

  get valid(){
    return !this.errors.length && this.inputControl?.valid && this.inputControl?.touched;
  }

  onChange = (value: string) => {

  }
  onTouch = () => {

  }
  
  writeValue(value: any): void {
    this.value = value?.toString() || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }

  onInput(event: Event){
    const input = event.target as HTMLInputElement;

    //input.value $ () -

    this.value = input.value;

    this.onChange(this.value);
    this.onTouch()
  }

}
