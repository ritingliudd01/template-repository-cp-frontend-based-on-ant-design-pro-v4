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
  createEffectHook,
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
import { combineLatest } from 'rxjs/operators';

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

const { onFieldValueChange$, onFormMount$ } = FormEffectHooks

const customEvent$ = createEffectHook('CUSTOM_EVENT')

const useMultiDepsEffects = () => {
  const { setFieldState, dispatch } = createFormActions()

  onFormMount$().subscribe(() => {
    setTimeout(() => {
      dispatch('CUSTOM_EVENT', true)
    }, 3000)
  })

  onFieldValueChange$('aa')
    .pipe(combineLatest(customEvent$()))
    .subscribe(([{ value, values }, visible]) => {

      setFieldState('bb', state => {
        state.visible = visible
      })

      setFieldState('cc', state => {
        state.visible = value
        if (values[1] && values[1].otherinfo) {
          state.value = values[1].otherinfo
        }
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
            onSubmit={values => {
              console.log(values)
            }}
            effects={() => {
              useMultiDepsEffects()
            }}
          >
            <Field
              type="string"
              enum={[
                { label: 'visible', value: true, otherinfo: '123' },
                { label: 'hidden', value: false, otherinfo: '321' }
              ]}
              default={false}
              name="aa"
              title="AA"
              x-component="Select"
            />
            <Field
              type="string"
              name="bb"
              visible={false}
              title="BB"
              x-component="Input"
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
          <ul className="react-demo-ul"><li className="react-demo-li">Field 組件visible 屬性可以控制初始顯示狀態</li><li className="react-demo-li">BB的顯示受外部異步事件所控制</li><li className="react-demo-li">CC 的顯示隱藏狀態受AA 的值控制，CC 的值受AA 的附加信息所控制，同時整體聯動依賴一個外部異步事件</li><li className="react-demo-li">使用rxjs 操作符combineLatest 可以解決聯動異步依賴問題</li></ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
