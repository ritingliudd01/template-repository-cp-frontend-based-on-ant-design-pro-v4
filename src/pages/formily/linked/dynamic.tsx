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

const mockSchema = {
  type: 'object',
  properties: {
    aa: {
      type: 'boolean',
      enum: [
        { label: 'visible', value: true },
        { label: 'hidden', value: false }
      ],
      default: false,
      title: 'AA',
      'x-component': 'Select',
      'x-linkages': [
        {
          type: 'value:visible',
          target: '*(bb,cc,dd)',
          condition: '{{!!$value}}'
        }
      ]
    },
    bb: {
      type: 'string',
      title: 'BB',
      'x-component': 'Input'
    },
    cc: {
      type: 'string',
      title: 'CC',
      'x-component': 'Input'
    },
    dd: {
      type: 'string',
      title: 'DD',
      'x-component': 'Input'
    }
  }
}

export default (): React.ReactNode => {
  const { formatMessage } = useIntl();
  const [ schema, setSchema] = useState({
    type: 'object'
  })
  useEffect(() => {
    setTimeout(() => {
      setSchema(mockSchema)
    }, 1000)
  }, [])
  return (
    <PageHeaderWrapper>
      <Card>
        <Printer>
          <SchemaForm
            schema={schema}
            components={components}
            onSubmit={values => {
              console.log(values)
            }}
          >
            <FormButtonGroup>
              <Submit />
            </FormButtonGroup>
          </SchemaForm>
        </Printer>
      </Card>

      <Card title={formatMessage({ id: 'formily.demo.intro' })}>
        <Paragraph>
          <ul className="react-demo-ul"><li className="react-demo-li">借助 x-linkages 可以實現簡單的聯動效果</li><li className="react-demo-li"> target 是一個 FormPathPattern 匹配表達式，在這裡我們可以使用FormPath 的各種匹配語法</li></ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
