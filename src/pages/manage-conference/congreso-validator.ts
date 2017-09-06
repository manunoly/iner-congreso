import { FormControl } from "@angular/forms";

export class CongresoValidator {
  static isValid(control: FormControl): any {
    if (control.value == "INER") {
      return null;
    }

    if (control.value == "IEEE") {
      return null;
    }

    return {
      "Nombre Congreso invalido(INER o IEEE)": true
    };
  }
}
