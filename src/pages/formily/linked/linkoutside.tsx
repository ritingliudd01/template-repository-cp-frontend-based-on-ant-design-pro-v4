// hk01:pages:formily: various form demos
import React, { useState, useEffect } from 'react';
import { Card, Typography, Button} from 'antd';
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
  createFormActions,
  FormSpy,
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

const useOneToManyEffects = () => {
  const { setFieldState } = createFormActions()
  onFieldValueChange$('aa').subscribe(({ value }) => {
    setFieldState('*(bb,cc,dd)', state => {
      state.visible = value
    })
  })
}

const actions = createFormActions()

export default (): React.ReactNode => {
  const { formatMessage } = useIntl();

  return (
    <PageHeaderWrapper>
      <Card>
        <Printer>
          <SchemaForm
            components={components}
            actions={actions}
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
              <FormSpy selector={[['onFieldValueChange', 'aa']]}>
                {({ state }) => {
                  return (
                    state.value && (
                      <>
                        <Submit />
                        <Button
                          onClick={() => {
                            actions.setFieldState('bb', state => {
                              state.value = '' + Math.random()
                            })
                          }}
                        >
                          修改BB的值
                        </Button>
                        <Reset />
                      </>
                    )
                  )
                }}
              </FormSpy>
            </FormButtonGroup>
            </SchemaForm>
        </Printer>
      </Card>

      <Card title={formatMessage({ id: 'formily.demo.intro' })}>
        <Paragraph>
          <ul className="react-demo-ul"><li className="react-demo-li">主聯動邏輯是一對多聯動</li><li className="react-demo-li">借助FormSpy可以針對具體字段做監聽，所以可以很方便的做UI 聯動狀態同步</li><li className="react-demo-li">借助FormActions 可以方便的在外部操作Form 內部狀態</li></ ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
