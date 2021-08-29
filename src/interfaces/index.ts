export interface StepConfig {
  name: string;
  label: string;
  hint?: string;
  order: number;
  questions: FieldConfig[];
}
export interface FieldConfig {
  id: string;
  order: number;
  name: string;
  label?: string;
  type: string;
  hint?: string;
  isRequired?: boolean;
  dependsOn?: string;
  dependsOnOption?: any;
  initialValue?: any;
  options?: any[];
}
export interface Flow {
  coverage: string;
  steps: StepConfig[];
}
