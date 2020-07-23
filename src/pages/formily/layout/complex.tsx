// hk01:pages:formily: various form demos
import React, { useState, useEffect } from 'react';
import { Card, Typography, Tooltip} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import { QuestionCircleOutlined } from '@ant-design/icons';
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

const createRichTextUtils = () => {
  return {
    text(...args) {
      return React.createElement('span', {}, ...args)
    },
    link(text, href, target) {
      return React.createElement('a', { href, target }, text)
    },
    gray(text) {
      return React.createElement(
        'span',
        { style: { color: 'gray', margin: '0 3px' } },
        text
      )
    },
    red(text) {
      return React.createElement(
        'span',
        { style: { color: 'red', margin: '0 3px' } },
        text
      )
    },
    help(text, offset = 3) {
      return React.createElement(
        Tooltip,
        { title: text },
        <QuestionCircleOutlined
          style={{ margin: '0 3px', cursor: 'default', marginLeft: offset }}
        />
      )
    },
    tips(text, tips) {
      return React.createElement(
        Tooltip,
        { title: tips },
        <span style={{ margin: '0 3px', cursor: 'default' }}>{text}</span>
      )
    }
  }
}

export default (): React.ReactNode => {
  const { formatMessage } = useIntl();

  return (
    <PageHeaderWrapper>
      <Card>
        <Printer>
          <SchemaForm
            labelCol={8}
            wrapperCol={9}
            components={components}
            expressionScope={createRichTextUtils()}
            effects={({ setFieldState }) => {
              FormEffectHooks.onFieldValueChange$('bbb').subscribe(({ value }) => {
                setFieldState('detailCard', state => {
                  state.visible = value
                })
              })
            }}
          >
            <FormCard title="基本信息">
              <Field
                name="checkbox"
                type="string"
                title="{{ text('字段1',help('这是帮助信息')) }}"
                enum={[
                  {
                    label: '{{ text("选项1",help("这是帮助信息")) }}',
                    value: '1111'
                  },
                  {
                    label:
                      '{{ text("选项2",red(link("这是个链接","https://taobao.com","_blank")))}}',
                    value: '2222'
                  }
                ]}
                description="{{ text('主要信息', gray('(次要信息)'),tips(red('(重要信息)'),'重要提示') ) }}"
                x-component="Checkbox"
              />
              <Field
                name="radio"
                type="string"
                title="{{ text('字段2',help('这是帮助信息')) }}"
                enum={[
                  {
                    label: '{{ text("选项1",help("这是帮助信息")) }}',
                    value: '1111'
                  },
                  {
                    label:
                      '{{ text("选项2",red(link("这是个链接","https://taobao.com","_blank")))}}',
                    value: '2222'
                  }
                ]}
                description="{{ text('主要信息', gray('(次要信息)'),tips(red('(重要信息)'),'重要提示') ) }}"
                x-component="Radio"
              />
            </FormCard>
            <FormCard title="详细信息">
              <Field name="aaa" type="string" title="字段1" x-component="Input" />
              <Field
                name="ccc"
                type="date"
                title="字段3"
                x-component="DatePicker"
                x-props={{
                  addonAfter: "{{ help('这是帮助信息',10) }}"
                }}
              />

              <Field
                name="bbb"
                type="number"
                title="显示高级信息"
                enum={[
                  { value: true, label: '显示' },
                  { value: false, label: '隐藏' }
                ]}
                default={false}
                x-component="Select"
                x-props={{
                  addonAfter: "{{ help('这是帮助信息',10) }}"
                }}
              />
            </FormCard>
            <FormCard title="高级信息" name="detailCard">
              <FormLayout labelCol={8} wrapperCol={9}>
                <FormItemGrid title="字段3" gutter={10} cols={[6, 11]}>
                  <Field name="ddd" type="number" x-component="NumberPicker" />
                  <Field name="eee" type="date" x-component="DatePicker" />
                </FormItemGrid>
                <Field type="object" name="mmm" title="对象字段">
                  <FormItemGrid gutter={10} cols={[6, 11]}>
                    <Field
                      name="ddd1"
                      default={123}
                      type="number"
                      x-component="NumberPicker"
                    />
                    <Field
                      name="[startDate,endDate]"
                      type="daterange"
                      x-component="DateRangePicker"
                    />
                  </FormItemGrid>
                </Field>
              </FormLayout>
              <FormLayout labelCol={8} wrapperCol={16}>
                <FormTextBox
                  title="文本串联"
                  text="订%s元/票 退%s元/票 改%s元/票"
                  gutter={8}
                >
                  <Field
                    type="string"
                    default={10}
                    required
                    name="aa1"
                    x-props={{ style: { width: 60 } }}
                    description="简单描述"
                    x-component="Input"
                    x-props={{
                      addonAfter: "{{ help('这是帮助信息',10) }}"
                    }}
                  />
                  <Field
                    type="number"
                    default={20}
                    required
                    name="aa2"
                    description="简单描述"
                    x-component="NumberPicker"
                  />
                  <Field
                    type="number"
                    default={30}
                    required
                    name="aa3"
                    description="简单描述"
                    x-component="NumberPicker"
                  />
                </FormTextBox>
              </FormLayout>
              <Field name="aas" type="string" title="字段4" x-component="Input" />
              <FormBlock title="区块">
                <Field
                  name="ddd2"
                  type="string"
                  title="字段5"
                  x-component="Input"
                />

                <Field
                  name="eee2"
                  type="string"
                  title="字段6"
                  x-component="Input"
                />

              </FormBlock>
            </FormCard>
            <Field
              name="sign"
              type="string"
              title=" "
              x-props={{
                colon: false
              }}
              x-component-props={{
                children:
                  "{{text('确认签署',link('《xxxx协议》','https://taobao.com','_blank'))}}"
              }}
              x-component="CheckboxSingle"
            />
            <FormButtonGroup>
              <Submit>提交</Submit>​<Reset>重置</Reset>
            </FormButtonGroup>
          </SchemaForm>
        </Printer>
      </Card>

      <Card title={formatMessage({ id: 'formily.demo.intro' })}>
        <Paragraph>
          <ul className="react-demo-ul">
            <li className="react-demo-li">抽象了幾個可複用的富文本工具方法，主要用在表達式中使用，可以快速實現很多簡單的富文本文案場景</li>
            <li className="react-demo-li">每個 Field 都可以配一個 x-props.addonAfter，可以給組件尾部追加文案</li>
            <li className="react -demo-li">FormCard 是卡片式佈局，FormBlock 是屬於內聯式卡片佈局</li>
          </ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
