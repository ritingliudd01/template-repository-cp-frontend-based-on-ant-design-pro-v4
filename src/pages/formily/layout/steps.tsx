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
  FormSpy,
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

const actions = createFormActions()
let cache = {
  graph: {},
  current: 0
}

export default (): React.ReactNode => {
  const { formatMessage } = useIntl();

  return (
    <PageHeaderWrapper>
      <Card>
        <Printer>
          <SchemaForm
            components={{ Input }}
            actions={actions}
            onSubmit={v => console.log(v)}
          >
            <FormStep
              style={{ marginBottom: 20 }}
              dataSource={[
                { title: '步骤1', name: 'basicInfo' },
                { title: '步骤2', name: '*(companyInfo,itemInfo)' },
                { title: '步骤3', name: 'businessInfo' }
              ]}
            />
            <Field type="object" name="basicInfo">
              <FormLayout labelCol={8} wrapperCol={8}>
                <Field
                  type="string"
                  name="a1"
                  title="字段1"
                  required
                  x-component="Input"
                />
              </FormLayout>
            </Field>
            <Field type="object" name="companyInfo">
              <FormLayout labelCol={8} wrapperCol={8}>
                <Field
                  type="string"
                  name="a2"
                  title="字段2"
                  required
                  x-component="Input"
                />
              </FormLayout>
            </Field>
            <Field type="object" name="itemInfo">
              <FormLayout labelCol={8} wrapperCol={8}>
                <Field
                  type="string"
                  name="a3"
                  title="字段3"
                  required
                  x-component="Input"
                />
              </FormLayout>
            </Field>

            <Field type="object" name="businessInfo">
              <FormLayout labelCol={8} wrapperCol={8}>
                <Field
                  type="string"
                  name="a4"
                  title="字段4"
                  required
                  x-component="Input"
                />
              </FormLayout>
            </Field>
            <FormSpy
              selector={FormStep.ON_FORM_STEP_CURRENT_CHANGE}
              reducer={(state, action) => {
                switch (action.type) {
                  case FormStep.ON_FORM_STEP_CURRENT_CHANGE:
                    return { ...state, step: action.payload }
                  default:
                    return { step: { value: 0 } }
                }
              }}
            >
              {({ state }) => {
                const formStepState = state.step ? state : { step: { value: 0 } }
                return (
                  <FormButtonGroup align="center">
                    <Button
                      disabled={formStepState.step.value === 0}
                      onClick={() => {
                        actions.dispatch(FormStep.ON_FORM_STEP_PREVIOUS)
                      }}
                    >
                      上一步
              </Button>
                    <Button
                      onClick={() => {
                        actions.dispatch(FormStep.ON_FORM_STEP_NEXT)
                      }}
                    >
                      下一步
              </Button>
                    <Submit>提交</Submit>​<Reset>重置</Reset>
                    <Button
                      onClick={() => {
                        cache.current = state.step
                        cache.graph = actions.getFormGraph()
                      }}
                    >
                      存储当前状态
              </Button>
                    <Button
                      onClick={() => {
                        actions.setFormGraph(cache.graph)
                        actions.dispatch(
                          FormStep.ON_FORM_STEP_CURRENT_CHANGE,
                          cache.current
                        )
                      }}
                    >
                      回滚状态
              </Button>
                  </FormButtonGroup>
                )
              }}
            </FormSpy>
          </SchemaForm>
        </Printer>
      </Card>

      <Card title={formatMessage({ id: 'formily.demo.intro' })}>
        <Paragraph>
          <ul className="react-demo-ul">
            <li className="react-demo-li">使用 FormStep 組件需要傳入 dataSource，同時指定對應要控制的字段 name，這個 name 屬性是一個 FormPathPattern，可以使用匹配語法匹配任何字段</li>
            <li className="react-demo-li">消費 FormStep 狀態，主要使用 FormSpy 來消費，借助 reducer 可以自定義狀態</li>
            <li className="react-demo- li">借助 actions.dispatch 可以手工觸發 FormStep 的生命週期鉤子</li>
          </ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
