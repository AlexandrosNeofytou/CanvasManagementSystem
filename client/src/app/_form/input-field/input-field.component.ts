import { Component, EventEmitter, Input, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ValidationError } from '../../Models/Validations/validation-error';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements ControlValueAccessor  {

  @Input() label:string | undefined;
  @Input() placeHolder:string | undefined;
  @Input() type:string | undefined;
  @Input() validationErrors:ValidationError[] | undefined
  @Input() forcedErrorMessage:string="";
  @Input() labelText:string | undefined

  @Output() onClickInput=new EventEmitter();
 
  constructor(@Self() public ngControl:NgControl ) {
    ngControl.valueAccessor=this;
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control():FormControl{
    return this.ngControl.control as FormControl;
  }

  getValidationError()
  {
    if(this.validationErrors && this.control.touched)
    {
      const error=this.validationErrors.find(error=>this.control.getError(error.errorName));

      return error;
    }

    return null;
  }

  onClick()
  {
    this.onClickInput.emit();
  }

}
