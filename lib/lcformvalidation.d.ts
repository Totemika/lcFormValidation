import { } from 'core-js';

export class FormNameToFieldNameMapping {
  formFieldName: string;
  vmFieldName: string;
}

export class FieldValidation {
  validationFn: (vm, value) => Promise<FieldValidationResult>;
  filter: any;
}

export class FieldValidationResult {
  key?: string;
  type: string;
  succeeded: boolean;
  errorMessage: string;
  constructor();
}

export class FormValidationResult {
  succeeded: boolean;
  fieldErrors: Array<FieldValidationResult>;
  formGlobalErrors: Array<FieldValidationResult>;
  constructor();
}

export interface IValidationEngine {
  isFormDirty(): boolean;
  isFormPristine(): boolean;
  validateFullForm(vm: any): Promise<FormValidationResult>;
  triggerFieldValidation(vm: any, key: string, value: any, filter?: any): Promise<FieldValidationResult>;
  addFieldValidation(key: string, validation: (vm, value) => FieldValidationResult, filter?: any): IValidationEngine;
  addFieldValidationAsync(key: string, validation: (vm, value) => Promise<FieldValidationResult>, filter?: any): IValidationEngine;
  addFormValidation(validation: FormValidationFunction);
  addFormValidationAsync(validation: (vm: any) => Promise<FieldValidationResult>);
  isValidationInProgress(): boolean;
}

export type ValidationResult = FieldValidationResult | Promise<FieldValidationResult>;

export interface FormValidationFunction {
  (vm: any): ValidationResult;
}

export class BaseFormValidation {
  _validationEngine: IValidationEngine;
  constructor();
  validateField(vm: any, key: string, value: any, filter?: any): Promise<FieldValidationResult>;
  validateForm(vm: any): Promise<FormValidationResult>;
}