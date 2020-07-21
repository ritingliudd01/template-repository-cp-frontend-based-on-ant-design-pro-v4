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
  const { onFieldValueChange$ } = FormEffectHooks

  const useOneToManyEffects = () => {
    const { setFieldState } = createFormActions()
    onFieldValueChange$('aa').subscribe(({ value }) => {
      setFieldState('*(bb,cc,dd)', state => {
        state.visible = value
      })
    })
  }


  return (
    <PageHeaderWrapper>
      <Card title="">
        <Printer>
          <SchemaForm
            components={components}
            onSubmit={values => {
              console.log(values)
            }}
            effects={() => {
              useOneToManyEffects()
            }}
          >
            <Field
              type="string"
              enum={[
                { label: 'visible', value: true },
                { label: 'hidden', value: false }
              ]}
              default={false}
              name="aa"
              title="AA"
              x-component="Select"
            />
            <Field type="string" name="bb" title="BB" x-component="Input" />
            <Field type="string" name="cc" title="CC" x-component="Input" />
            <Field type="string" name="dd" title="DD" x-component="Input" />
            <FormButtonGroup>
              <Submit />
            </FormButtonGroup>
          </SchemaForm>
        </Printer>
      </Card>

      <Card title={formatMessage({ id: 'formily.demo.intro' })}>
        <Paragraph>
          <ul className="react-demo-ul"><li className="react-demo-li">使用 FormEffectHooks 可以很方便的将联动逻辑拆分出去，方便我们进行物理分离</li><li className="react-demo-li">借助路径系统的批量匹配能力实现一对多联动</li></ul>
        </Paragraph>
      </Card>
  </PageHeaderWrapper>
)};
