export interface Form {
  key: string;
  description: string;
  buttons?: Buttons;
  groups: Group[];
}

export interface Buttons {
  complete: Button;
  cancel: Button;
  statusPdf: Button;
}

export interface Button {
  showButton: boolean;
  buttonText: string;
}

export interface Group {
  label: string;
  description: string;
  schema: FormField[];
}

export interface FormField {
  type: string;
  key: string;
  ext: string;
  defaultValue: string;
  description: string;
  readonly: boolean;
  label: string;
  col: number;
  items: Item[];
  rules: (Rule | any)[];
  // rules: (Rule | ((v: any) => boolean | string))[];
}

export interface Item {
  name: string;
  value: string;
}

export interface Rule {
  type: string;
  value: string;
  target: string;
}
