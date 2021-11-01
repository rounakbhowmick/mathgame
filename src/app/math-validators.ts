import { AbstractControl } from "@angular/forms";

export class MathValidators {
  static addition(target: string, sourceOne: string, sourceTwo: string) {
    return (form:AbstractControl) => {
      console.log("form",form);
      console.log("target",target);
      console.log("a",sourceOne);
      const sum=form.value[target];
      const firstNumber=form.value[sourceOne];
      const secondNumber=form.value[sourceTwo]
      if (firstNumber + secondNumber == parseInt(sum)) {
        return null;
      }
      return { addition: true };
    }
  }
}
