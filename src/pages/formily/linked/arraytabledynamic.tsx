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
    array: {
      type: 'array',
      'x-component': 'ArrayTable',
      items: {
        type: 'object',
        properties: {
          aa: {
            type: 'string',
            title: 'Sibling visible',
            'x-component': 'Select',
            default: false,
            enum: [
              { label: 'visible', value: true },
              { label: 'hidden', value: false }
            ],
            'x-linkages': [
              {
                type: 'value:state',
                target: '..[].ff',
                state: {
                  visible: '{{!!$value}}'
                }
              }
            ]
          },
          bb: {
            type: 'string',
            title: 'Next Row visible',
            'x-component': 'Select',
            enum: [
              { label: 'visible', value: true },
              { label: 'hidden', value: false }
            ],
            'x-linkages': [
              {
                type: 'value:visible',
                target: 'array.[+].ff',
                condition: '{{!!$value}}'
              }
            ]
          },
          cc: {
            type: 'string',
            title: 'Prev Row visible',
            'x-component': 'Select',
            enum: [
              { label: 'visible', value: true },
              { label: 'hidden', value: false }
            ],
            'x-linkages': [
              {
                type: 'value:visible',
                target: 'array.[-].ff',
                condition: '{{!!$value}}'
              }
            ]
          },
          dd: {
            type: 'string',
            title: 'Next Next Row visible',
            'x-component': 'Select',
            enum: [
              { label: 'visible', value: true },
              { label: 'hidden', value: false }
            ],
            'x-linkages': [
              {
                type: 'value:visible',
                target: 'array.[+2].ff',
                condition: '{{!!$value}}'
              }
            ]
          },
          ee: {
            type: 'string',
            title: 'Prev Prev Row visible',
            'x-component': 'Select',
            enum: [
              { label: 'visible', value: true },
              { label: 'hidden', value: false }
            ],
            'x-linkages': [
              {
                type: 'value:visible',
                target: 'array.[-2].ff',
                condition: '{{!!$value}}'
              }
            ]
          },
          ff: {
            type: 'string',
            title: 'Target',
            'x-component': 'Input'
          }
        }
      }
    }
  }
}

export default (): React.ReactNode => {
  const { formatMessage } = useIntl();
  const [schema, setSchema] = useState({
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
          <ul className="react-demo-ul"><li className="react-demo-li">自增列表中的動態聯動，借助x-linkages 可以實現相鄰聯動，或者是跨行聯動</li> <li className="react-demo-li">target 相鄰查找<ul className="react-demo-ul"><li className="react-demo-li"><code className="react-demo-code ">prevPath.[].fieldName</code>代表當前行字段</li><li className="react-demo-li"><code className="react-demo-code">prevPath.[+]. fieldName</code>代表下一行字段</li><li className="react-demo-li"><code className="react-demo-code">prevPath.[-].fieldName</code>代表上一行字段</li><li className="react-demo-li"><code className="react-demo-code">prevPath.[+2].fieldName</code>代表下下一行字段</li ><li className="react-demo-li"><code className="react-demo-code">prevPath.[-2].fieldName</code>代表上上一行字段</li><li className="react-demo-li">一次可以繼續往下遞增或者遞減</li></ul></li><li className="react-demo-li">target 向前路徑查找<ul className=" react-demo-ul"><li className="react-demo-li"><code className="react-demo-code">.path.ab</code>代表基於當前字段路徑往後計算</li ><li className="react-demo-li"><code className="react-demo-code">..path.ab</code>代表往前計算相對路徑</li><li className="react -demo-li"><code className="react-demo-co de">...path.ab</code>代表繼續往前計算相對路徑</li><li className="react-demo-li">以此類推</li></ul></li ></ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
