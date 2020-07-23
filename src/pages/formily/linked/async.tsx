// hk01:pages:formily: various form demos
import React, { useState, useEffect } from 'react';
import { Card, Typography, } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import { merge } from 'rxjs';
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
  FormPath,
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

const { onFormInit$, onFieldValueChange$, onFieldInit$ } = FormEffectHooks

const createLinkageUtils = () => {
  const { setFieldState } = createFormActions()
  const linkage = (key, defaultValue) => (path, value) =>
    setFieldState(path, state => {
      FormPath.setIn(state, key, value !== undefined ? value : defaultValue)
    })
  return {
    hide: linkage('visible', false),
    show: linkage('visible', true),
    enum: linkage('props.enum', []),
    loading: linkage('loading', true),
    loaded: linkage('loading', false),
    value: linkage('value')
  }
}

const useAsyncLinkageEffect = () => {
  const linkage = createLinkageUtils()
  onFieldValueChange$('aa').subscribe(fieldState => {
    if (!fieldState.value) return
    linkage.show('bb')
    linkage.loading('bb')
    setTimeout(() => {
      linkage.loaded('bb')
      linkage.enum('bb', ['1111', '2222'])
      linkage.value('bb', '1111')
    }, 1000)
  })
  merge(onFieldValueChange$('bb'), onFieldInit$('bb')).subscribe(fieldState => {
    if (!fieldState.value) return linkage.hide('cc')
    linkage.show('cc')
    linkage.value('cc', fieldState.value)
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
            effects={() => {
              useAsyncLinkageEffect()
            }}
            onChange={v => console.log(v)}
            labelCol={6}
            wrapperCol={4}
            onSubmit={v => console.log(v)}
          >
            <Field
              name="aa"
              type="string"
              enum={['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee']}
              title="AA"
              x-component="Select"
            />
            <Field
              type="string"
              name="bb"
              title="BB"
              enum={[]}
              visible={false}
              x-component="Select"
              x-props={{
                hasFeedback: true
              }}
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
          <ul className="react-demo-ul"><li className="react-demo-li">借助 createFormActions，我們可以創建出一些可複用的聯動操作原子函數</li></ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
