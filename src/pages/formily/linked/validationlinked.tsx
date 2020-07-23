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
  Password,
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
  Password,
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

const useLinkageValidateEffects = () => {
  const { setFieldState, getFieldState } = createFormActions()
  onFieldValueChange$('*(password,confirm)').subscribe(fieldState => {
    const selfName = fieldState.name
    const selfValue = fieldState.value
    const otherName = selfName == 'password' ? 'confirm' : 'password'
    const otherValue = getFieldState(otherName, state => state.value)
    setFieldState(otherName, state => {
      if (selfValue && otherValue && selfValue !== otherValue) {
        state.errors = '两次密码输入不一致'
      } else {
        state.errors = ''
      }
    })
    setFieldState(selfName, state => {
      if (selfValue && otherValue && selfValue !== otherValue) {
        state.errors = '两次密码输入不一致'
      } else {
        state.errors = ''
      }
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
            labelCol={6}
            wrapperCol={9}
            components={components}
            effects={() => {
              useLinkageValidateEffects()
            }}
          >
            <Field
              type="string"
              name="username"
              title="用户名"
              required
              x-component="Input"
            />
            <Field
              type="string"
              name="password"
              title="密码"
              x-props={{ checkStrength: true }}

              // below attribute with DOM value will cause error when triggering 'Print JSON Schema'
              // description={
              //   <Paragraph>
              //     <ul>
              //       <li>长度不小于8个</li>
              //       <li>必须包含大小写数字符号</li>
              //     </ul>
              //   </Paragraph>
              // }
              description={`长度不小于8个，必须包含大小写数字符号`}
              required
              x-component="Password"
            />
            <Field
              type="string"
              name="confirm"
              title="确认密码"
              x-props={{ checkStrength: true }}
              required
              x-component="Password"
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
          <ul className="react-demo-ul"><li className="react-demo-li">聯動校驗都需要手動操作字段狀態的 errors 屬性來控制，你既需要控制錯誤的出現時機，也要控制錯誤的隱藏時機</li></ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
