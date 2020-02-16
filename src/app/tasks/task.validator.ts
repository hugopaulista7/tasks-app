import { Validators } from '@angular/forms';

export class TaskValidator {
  static rules() {
    return {
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])],
      description: ['', Validators.compose([
        Validators.maxLength(255)
      ])]
    }
  }
}