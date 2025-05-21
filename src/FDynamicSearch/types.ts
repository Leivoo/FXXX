import { FormInstance } from 'antd';

export type SearchItemType =
  | 'input'
  | 'select'
  | 'cascader'
  | 'datePicker'
  | 'treeSelect';

export interface SearchItemOption {
  value: any;
  label: string;
}

export interface SearchItemConfig {
  type: SearchItemType;
  label: string;
  val: string;
  placeholder: string;
  initialValue?: any;
  disabled?: boolean;
  labelCol?: number;
  wrapperCol?: number;
  options?: SearchItemOption[];
  fieldNames?: object;
  kind?: 'date';
  showTime?: boolean;
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
  col?: number;
}

export type CbFunction = (formValues: Record<string, any>) => void;

import { ColProps } from 'antd';

export interface FDynamicSearchProps {
  labelCol: ColProps;
  wrapperCol: ColProps;
  config: SearchItemConfig[];
  search?: CbFunction;
  immediate?: boolean;
  refresh?: CbFunction;
  position?: 'horizontal' | 'vertical';
  excludeFields?: string[];
  styles?: React.CSSProperties;
  onSelectChange?: (
    value: any,
    item: SearchItemConfig,
    form: FormInstance,
  ) => void;
  onCascaderChange?: (value: any, item: SearchItemConfig) => void;
  col?: number;
  formCb?: (form: FormInstance) => void;
}
