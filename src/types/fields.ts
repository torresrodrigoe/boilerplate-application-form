export interface FieldGroup {
  id: string;
  title: string;
  description?: string;
}

export interface FieldOption {
  title: string;
  description: string;
  isRecommended: boolean;
  value: string | number;
}

export enum FieldTypes {
  TEXT = 'text',
  RADIO = 'radio',
}

export type Field = {
  type: FieldTypes.TEXT;
  label: string;
  name: string;
  group: string;
} | {
  type: FieldTypes.RADIO;
  name: string;
  options?: FieldOption[];
  group: string;
}

export interface FieldResponse {
  groups: FieldGroup[];
  fields: Field[];
}