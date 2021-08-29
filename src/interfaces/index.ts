export interface StepConfig {
  name: string;
  label: string;
  hint?: string;
  order: number;
  questions: FieldConfig[];
}
export interface FieldConfig {
  id: number;
  order: number;
  name: string;
  label?: string;
  type: string;
  hint?: string;
  isRequired?: boolean;
  dependsOn?: string;
  dependsOnOption?: string;
  initialValue?: any;
  options?: any[];
}
export interface Flow {
  coverage: string;
  steps: StepConfig[];
}
