## FDynamicSearch

动态使用的搜索组件，采用数据驱动视图的形式

## 标准动态搜索 :

```tsx
import { FDynamicSearch } from 'FXXX';

const configs = [
  {
    type: 'input',
    label: '姓名',
    val: 'name',
    placeholder: '请输入您的姓名',
  },
  {
    type: 'cascader',
    label: '级联',
    val: 'test1',
  },
  {
    type: 'datePicker',
    label: '时间1',
    val: 'time',
  },
  {
    type: 'treeSelect',
    label: '树形下拉',
    val: 'treeSelect',
  },
  {
    type: 'datePicker',
    label: '时间2',
    val: 'time2',
    kind: 'date',
    pikcer: 'quarter',
  },
  {
    type: 'select',
    label: '下拉',
    val: 'abc',
    initialValue: 'lucy',
    options: [
      {
        value: 'lucy',
        label: 'Lucy',
      },
    ],
  },
];

export default () => <FDynamicSearch labelCol={{ span: 8 }} config={configs} />;
```

## 竖向指定列动态搜索 :

```tsx
import { FDynamicSearch } from 'FXXX';

const configs = [
  {
    type: 'input',
    label: '姓名',
    val: 'name',
    placeholder: '请输入您的姓名',
  },
  {
    type: 'input',
    label: '姓名',
    val: 'test',
    placeholder: '请输入您的姓名',
  },
  {
    type: 'input',
    label: '姓名',
    val: 'app',
    placeholder: '请输入您的姓名',
  },
  {
    type: 'input',
    label: '姓名',
    val: 'test',
    placeholder: '请输入您的姓名',
  },
  {
    type: 'input',
    label: '姓名',
    val: 'app',
    placeholder: '请输入您的姓名',
  },
  {
    type: 'select',
    label: '姓名',
    val: 'abc',
    placeholder: '请输入您的姓名',
    initialValue: 'lucy',
    options: [
      {
        value: 'lucy',
        label: 'Lucy',
      },
    ],
  },
];

export default () => (
  <FDynamicSearch config={configs} col={1} position="vertical" />
);
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo

## API

| 属性             | 说明                                                                 | 类型                                                                                                                                                                                                                  | 默认值            |
| ---------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| config           | 搜索项配置数组，包含每个搜索项的类型、标签、值等信息                 | Array<{ type: string, label: string, val: string, placeholder: string, initialValue?: any, options?: Array<{ value: any, label: string }>, fieldNames?: object, kind?: string, showTime?: boolean, picker?: string }> | []                |
| search           | 搜索触发时的回调函数，接收表单当前值作为参数                         | Function                                                                                                                                                                                                              | (form:Object)=>{} |
| immediate        | 是否在组件加载时立即触发搜索                                         | Boolean                                                                                                                                                                                                               | true              |
| refresh          | 重置表单时的回调函数，接收表单重置后的值作为参数                     | Function                                                                                                                                                                                                              | (form:Object)=>{} |
| position         | 搜索框和操作按钮的布局方式，支持水平和垂直布局                       | "horizontal" \| "vertical"                                                                                                                                                                                            | "horizontal"      |
| excludeFields    | 重置表单时需要排除的字段数组，参考 antd 的属性                       | Array<string>                                                                                                                                                                                                         | []                |
| styles           | 自定义样式对象                                                       | object                                                                                                                                                                                                                | {}                |
| onSelectChange   | 选择器值变化时的回调函数，接收变化的值、当前配置项和表单实例作为参数 | Function                                                                                                                                                                                                              | () => {}          |
| onCascaderChange | 级联选择器值变化时的回调函数，接收变化的值和当前配置项作为参数       | Function                                                                                                                                                                                                              | () => {}          |
| col              | 每行显示的搜索项数量                                                 | number                                                                                                                                                                                                                | 4                 |
| formCb           | 表单实例创建后的回调函数，接收表单实例作为参数                       | Function                                                                                                                                                                                                              | (Form) => {}      |
