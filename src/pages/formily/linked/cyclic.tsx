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

const { onFormInit$, onFieldValueChange$ } = FormEffectHooks

const useCyclicLinkageEffects = () => {
  const { setFieldState, getFieldState } = createFormActions()
  onFieldValueChange$('total').subscribe(({ value }) => {
    if (!value) return
    setFieldState('count', state => {
      const price = getFieldState('price', state => state.value)
      if (!price) return
      state.value = value / price
    })
    setFieldState('price', state => {
      const count = getFieldState('count', state => state.value)
      if (!count) return
      state.value = value / count
    })
  })
  onFieldValueChange$('price').subscribe(({ value }) => {
    if (!value) return
    setFieldState('total', state => {
      const count = getFieldState('count', state => state.value)
      if (!count) return
      state.value = value * count
    })
    setFieldState('count', state => {
      const total = getFieldState('total', state => state.value)
      if (!total) return
      state.value = total / value
    })
  })
  onFieldValueChange$('count').subscribe(({ value }) => {
    if (!value) return
    setFieldState('total', state => {
      const price = getFieldState('price', state => state.value)
      if (!price) return
      state.value = value * price
    })
    setFieldState('price', state => {
      const total = getFieldState('total', state => state.value)
      if (!total) return
      state.value = total / value
    })
  })
}

export default (): React.ReactNode => {
  const { formatMessage } = useIntl();

  return (
    <PageHeaderWrapper>
      <Card title="">
        <Printer>
          <SchemaForm
            components={components}
            effects={() => {
              useCyclicLinkageEffects()
            }}
            onChange={(v:any) => console.log(v)}
            labelCol={6}
            wrapperCol={4}
            onSubmit={v => console.log(v)}
          >
            <Field
              name="total"
              type="number"
              required
              title="Total"
              x-component="NumberPicker"
            />
            <Field
              name="count"
              type="number"
              required
              title="Count"
              x-component="NumberPicker"
            />
            <Field
              name="price"
              type="number"
              required
              title="Price"
              x-component="NumberPicker"
            />
            <FormButtonGroup>
              <Submit />
              <Reset />
            </FormButtonGroup>
          </SchemaForm>
        </Printer>
      </Card>

      <Card title={formatMessage({ id: 'formily.demo.intro' })}>
        <Paragraph>
          <ul className="react-demo-ul"><li className="react-demo-li">循環聯動，其實也是可以歸一到一對一聯動的</li></ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
