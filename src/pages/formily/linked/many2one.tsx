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

  const useManyToOneEffects = () => {
    const { setFieldState } = createFormActions()
    onFieldValueChange$('bb').subscribe(({ value }) => {
      setFieldState('aa', state => {
        state.visible = value
      })
    })
    onFieldValueChange$('cc').subscribe(({ value }) => {
      setFieldState('aa', state => {
        state.value = value
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
              useManyToOneEffects()
            }}
          >
            <Field type="string" name="aa" title="AA" x-component="Input" />
            <Field
              type="string"
              enum={[
                { label: 'visible', value: true },
                { label: 'hidden', value: false }
              ]}
              default={false}
              name="bb"
              title="BB"
              x-component="Select"
            />
            <Field type="string" name="cc" title="CC" x-component="Input" />
            <FormButtonGroup>
              <Submit />
            </FormButtonGroup>
          </SchemaForm>
        </Printer>
      </Card>

      <Card title={formatMessage({ id: 'formily.demo.intro' })}>
        <Paragraph>
          <ul className="react-demo-ul"><li className="react-demo-li">多对一联动其实就是一对一联动，只不过作用的对象是同一个字段</li><li className="react-demo-li">BB 控制 AA 显示隐藏，CC 控制 AA 的值</li></ul>        </Paragraph>
      </Card>
  </PageHeaderWrapper>
)};
