// hk01:pages:formily: various form demos
import React, { useState, useEffect } from 'react';
import { Card, Typography, } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import Printer from '@formily/printer';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  Submit,
  Reset,
  Form,
  FormItem,
  FormEffectHooks,
  setValidationLocale,
  InternalFieldList as FieldList,
  createFormActions
} from '@formily/antd';
import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating,
  ArrayTable,
  FormItemGrid,
  FormTextBox,
  FormCard,
  FormBlock,
  FormLayout,
  FormStep,
  FormPath,
  FormGridCol,
  FormGridRow
} from '@formily/antd-components';

const { Paragraph } = Typography

const components = {
  Input,
  Radio: Radio.Group,
  Checkbox: Checkbox.Group,
  CheckboxSingle: Checkbox,
  TextArea: Input.TextArea,
  NumberPicker,
  Select,
  Switch,
  DatePicker,
  DateRangePicker: DatePicker.RangePicker,
  YearPicker: DatePicker.YearPicker,
  MonthPicker: DatePicker.MonthPicker,
  WeekPicker: DatePicker.WeekPicker,
  TimePicker,
  Upload,
  Range,
  Rating,
  ArrayTable,
  Transfer
}

export default (): React.ReactNode => {
  const { formatMessage } = useIntl();

  return (
    <PageHeaderWrapper>
      <Card>
        <Printer>
          <SchemaForm components={{ Input }} onSubmit={v => console.log(v)}>
            <FormItemGrid gutter={20}>
              <Field type="string" name="a1" title="查询字段1" x-component="Input" />
              <Field type="string" name="a2" title="查询字段2" x-component="Input" />
              <Field type="string" name="a3" title="查询字段3" x-component="Input" />
              <Field type="string" name="a4" title="查询字段4" x-component="Input" />
            </FormItemGrid>
            <FormItemGrid gutter={20} cols={[6, 6]}>
              <Field type="string" name="a5" title="查询字段5" x-component="Input" />
              <Field type="string" name="a6" title="查询字段6" x-component="Input" />
            </FormItemGrid>
            <FormButtonGroup style={{ minWidth: 150 }}>
              <Submit>提交</Submit>​<Reset>重置</Reset>
            </FormButtonGroup>
          </SchemaForm>
        </Printer>
      </Card>

      <Card title={formatMessage({ id: 'formily.demo.intro' })}>
        <Paragraph>
          <ul><li>使用 FormItemGrid 可以實現網格佈局，如果加了 title 屬性，就能處理 FormItem 維度的網格佈局</li></ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
