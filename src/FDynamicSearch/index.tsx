import {
  Button,
  Cascader,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  TreeSelect,
} from 'antd';
import chunk from 'lodash/chunk';
import React, { useEffect, useState } from 'react';
import { FDynamicSearchProps, SearchItemConfig } from './types';

const { RangePicker } = DatePicker;

function FDynamicSearch({
  config = [],
  labelCol = { span: 6 },
  wrapperCol = { span: 18 },
  search,
  immediate = false,
  refresh,
  position = 'horizontal',
  // 参考antd的属性
  excludeFields = [],
  styles = {},
  onSelectChange = () => {},
  onCascaderChange = () => {},
  col = 4,
  formCb = () => {},
}: FDynamicSearchProps) {
  const [form] = Form.useForm();
  const [formGroup, setFormGroup] = useState<SearchItemConfig[][]>([]);

  const TYPE_MAP = {
    input: (i: SearchItemConfig) => (
      <Form.Item
        labelCol={i.labelCol ? { span: i.labelCol } : labelCol}
        wrapperCol={i.wrapperCol ? { span: i.wrapperCol } : wrapperCol}
        label={i.label}
        name={i.val}
        // initialValue={i.initialValue}
      >
        <Input
          disabled={i.disabled}
          placeholder={i.placeholder}
          // style={{ width: "80%" }}
          allowClear
        ></Input>
      </Form.Item>
    ),
    select: (i: SearchItemConfig) => (
      <Form.Item
        labelCol={i.labelCol ? { span: i.labelCol } : labelCol}
        wrapperCol={i.wrapperCol ? { span: i.wrapperCol } : wrapperCol}
        label={i.label}
        name={i.val}
        // initialValue={i.initialValue}
      >
        <Select
          disabled={i.disabled}
          placeholder={i.placeholder}
          allowClear
          options={i.options}
          onChange={(e) => onSelectChange(e, i, form)}
        ></Select>
      </Form.Item>
    ),
    cascader: (i: SearchItemConfig) => (
      <Form.Item
        labelCol={i.labelCol ? { span: i.labelCol } : labelCol}
        wrapperCol={i.wrapperCol ? { span: i.wrapperCol } : wrapperCol}
        label={i.label}
        name={i.val}
        // initialValue={i.initialValue}
      >
        <Cascader
          disabled={i.disabled}
          fieldNames={i.fieldNames}
          options={i.options}
          placeholder={i.placeholder}
          onChange={(e) => onCascaderChange(e, i)}
        />
      </Form.Item>
    ),
    datePicker: (i: SearchItemConfig) => (
      <Form.Item
        labelCol={i.labelCol ? { span: i.labelCol } : labelCol}
        wrapperCol={i.wrapperCol ? { span: i.wrapperCol } : wrapperCol}
        label={i.label}
        name={i.val}
        // initialValue={i.initialValue}
      >
        {i.kind === 'date' ? (
          <DatePicker
            disabled={i.disabled}
            picker={i.picker}
            showTime={i.showTime}
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            onChange={(value, dateString) => {
              console.log('Selected Time: ', value);
              console.log('Formatted Selected Time: ', dateString);
            }}
          />
        ) : (
          <RangePicker
            style={{ width: '100%' }}
            disabled={i.disabled}
            showTime={i.showTime}
            picker={i.picker}
          ></RangePicker>
        )}
      </Form.Item>
    ),
    treeSelect: (i: SearchItemConfig) => (
      <Form.Item
        labelCol={i.labelCol ? { span: i.labelCol } : labelCol}
        wrapperCol={i.wrapperCol ? { span: i.wrapperCol } : wrapperCol}
        label={i.label}
        name={i.val}
        // initialValue={i.initialValue}
      >
        <TreeSelect
          disabled={i.disabled}
          placeholder={i.placeholder}
          allowClear
          treeData={i.options}
          onChange={(e) => onSelectChange(e, i, form)}
        ></TreeSelect>
      </Form.Item>
    ),
  };

  const setFiledValues = () => {
    const values = config.reduce((pre: { [key: string]: any }, cur) => {
      if (cur.initialValue) {
        pre[cur.val] = cur.initialValue;
      }
      return pre;
    }, {});

    form.setFieldsValue(values);
  };

  useEffect(() => {
    if (immediate && Object.keys(form.getFieldsValue()).length) {
      search?.(form.getFieldsValue());
    }
    if (form) {
      formCb(form);
      setFiledValues();
    }
  }, [immediate, form, search]);

  useEffect(() => {
    if (config.length && config.length > col) {
      // TODO: 一排4个 超过4个换行
      const chunked = chunk(config, col);

      setFormGroup(chunked);
    } else {
      setFormGroup([config]);
      // 如果搜索项为4个或4个以下则按钮和搜索项一排显示
    }
  }, [config]);

  function judgeCol(column: SearchItemConfig) {
    if (column.col) return column.col;
    // TODO: 后续此处可能会有更复杂的判断
    return formGroup.length > 1 ? 6 : 5;
  }

  function handleClick() {
    search?.(form.getFieldsValue());
  }

  function handleRefresh() {
    const fields = config
      .filter((item) => !excludeFields.includes(item.val))
      .map((item) => item.val);
    if (!fields.length) {
      form.resetFields();
    } else {
      form.resetFields(fields);
    }
    refresh?.(form.getFieldsValue());
  }

  return (
    <div className={'search-box'}>
      <Form
        name="basic"
        labelAlign="left"
        form={form}
        style={{ width: '100%' }}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        colon={false}
      >
        <div
          className={
            position === 'horizontal'
              ? 'container-horizontal'
              : 'container-vertical'
          }
          style={styles}
        >
          <div>
            {formGroup.length &&
              formGroup.map((row, index) => (
                <Row key={index} gutter={15} wrap={false}>
                  {row.map((i, idx) => (
                    <Col key={idx} span={judgeCol(i)}>
                      {TYPE_MAP[i.type](i)}
                    </Col>
                  ))}
                </Row>
              ))}
          </div>
          <div className="operate">
            <Button
              style={{
                width: '86px',
                fontFamily: 'SourceHanSansCN',
                fontSize: '14px',
                border: '0px',
              }}
              type="primary"
              onClick={handleClick}
            >
              搜索
            </Button>
            <Button
              style={{
                width: '86px',
                background: '#F4F5FB',
                fontFamily: 'SourceHanSansCN',
                fontSize: '14px',
                color: '#333',
                border: '0px',
              }}
              onClick={handleRefresh}
            >
              重置
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
export default FDynamicSearch;
