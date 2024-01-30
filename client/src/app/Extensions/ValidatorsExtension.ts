import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { BadRequest } from '../Models/Errors/bad-request';
import { HttpErrorResponse } from '@angular/common/http';

export class ValidatorsExtensions
{
    static isStrongPassword():ValidatorFn
    {
        return (control:AbstractControl):ValidationErrors | null=>{

            const value=control.value;

            if(!value)
            {
                return null;
            }

            const hasNumber=/[0-9]+/.test(value);

            const hasUpper=/[A-Z]+/.test(value);

            const hasLower=/[a-z]+/.test(value);

            const hasMinCharacters=value.length >=6;

            const isPasswordValid= hasNumber && hasUpper && hasLower && hasMinCharacters;
            

            if(isPasswordValid)
            {
                return null;
            }

            return {passwordStrength:true}
        }
    }

    static IsSame(controlToCompareName:string):ValidatorFn
    {
        return (control:AbstractControl):ValidationErrors | null=>{

         
            const value=control.value;

            if(control && control.parent)
            {
                const controlToCompareValue=control.parent.get(controlToCompareName)?.value;

    
                if(value==controlToCompareValue)
                {
                    return null;
                }
            }
           
            return  {confirmPassword:true}
        }
    }

  

    static doesErrorExists(error:HttpErrorResponse | undefined,targetError:string):boolean
    {
        if(error)
        {
            const errorFound=Object.keys(error.error).find((key)=>key==targetError);

            if(errorFound)
            {
                return true;
            }
        }

        return false
    }
}