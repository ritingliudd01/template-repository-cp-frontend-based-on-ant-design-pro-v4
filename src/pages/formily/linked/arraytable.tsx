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
  FormPath,
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
  FormGridCol,
  FormGridRow
} from '@formily/antd-components';

const { Paragraph } = Typography

const components = {
  Input,
  Radio: Radio.Group,
  Checkbox: Checkbox.Group,
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

const { onFieldValueChange$ } = FormEffectHooks

export default (): React.ReactNode => {
  const { formatMessage } = useIntl();

  return (
    <PageHeaderWrapper>
      <Card>
        <Printer>
          <SchemaForm
            components={components}
            onSubmit={values => {
              console.log(values)
            }}
            effects={({ setFieldState }) => {
              onFieldValueChange$('array.*.aa').subscribe(({ name, value }) => {
                setFieldState(
                  FormPath.transform(name, /\d/, $1 => {
                    return `array.${$1}.bb`
                  }),
                  state => {
                    state.visible = value
                  }
                )
              })
            }}
          >
            <Field type="array" name="array" x-component="ArrayTable">
              <Field type="object">
                <Field
                  type="string"
                  name="aa"
                  title="Sibling visible"
                  enum={[
                    { label: '显示', value: true },
                    { label: '隐藏', value: false }
                  ]}
                  default={true}
                  x-component="Select"
                />
                <Field type="string" name="bb" title="BB" x-component="Input" />
              </Field>
            </Field>

            <FormButtonGroup>
              <Submit />
            </FormButtonGroup>
          </SchemaForm>
        </Printer>
      </Card>

      <Card title={formatMessage({ id: 'formily.demo.intro' })}>
        <Paragraph>
          <ul className="react-demo-ul"><li className="react-demo-li">借助 FormPath.transform 可以求出自增列表字段的相鄰字段</li></ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
