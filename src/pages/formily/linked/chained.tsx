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

const { onFieldValueChange$ } = FormEffectHooks

const useChainEffects = () => {
  const { setFieldState } = createFormActions()
  onFieldValueChange$('aa').subscribe(({ value }) => {
    setFieldState('bb', state => {
      state.visible = value
    })
  })
  onFieldValueChange$('bb').subscribe(({ value }) => {
    setFieldState('cc', state => {
      state.visible = value
    })
  })
}

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
            effects={() => {
              useChainEffects()
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
          <ul className="react-demo-ul"><li className="react-demo-li">鍊式聯動，其實也是可以歸一化為一對一聯動</li><li className="react- demo-li">AA 控制BB 顯示隱藏，BB 控制CC 隱藏</li></ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
