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
  FormTab,
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
            <FormTab name="tabs" defaultActiveKey={'tab-2'}>
              <FormTab.TabPane name="tab-1" tab="选项1">
                <Field
                  type="string"
                  name="a1"
                  title="字段1"
                  required
                  x-component="Input"
                />
              </FormTab.TabPane>
              <FormTab.TabPane name="tab-2" tab="选项2">
                <Field
                  type="string"
                  name="a2"
                  title="字段2"
                  required
                  x-component="Input"
                />
                <Field
                  type="string"
                  name="a3"
                  title="字段3"
                  required
                  x-component="Input"
                />
                <Field
                  type="string"
                  name="a4"
                  title="字段4"
                  required
                  x-component="Input"
                />
                <Field
                  type="string"
                  name="a5"
                  title="字段5"
                  required
                  x-component="Input"
                />
              </FormTab.TabPane>
            </FormTab>
            <FormButtonGroup>
              <Submit />
              <Button
                onClick={() => {
                  actions.dispatch(FormTab.ON_FORM_TAB_ACTIVE_KEY_CHANGE, {
                    value: 'tab-2'
                  })
                }}
              >
                切换到第二个选项
        </Button>
              <Button
                onClick={() => {
                  actions.setFieldState('tabs', state => {
                    state.props['x-component-props'] =
                      state.props['x-component-props'] || {}
                    const { hiddenKeys } = state.props['x-component-props']
                    state.props['x-component-props'].hiddenKeys =
                      hiddenKeys && hiddenKeys.length ? [] : ['tab-2']
                  })
                }}
              >
                隐藏/显示第二个选项卡
        </Button>
            </FormButtonGroup>
          </SchemaForm>
        </Printer>
      </Card>

      <Card title={formatMessage({ id: 'formily.demo.intro' })}>
        <Paragraph>
          <ul className="react-demo-ul"><li className="react-demo-li">從 @formily/antd-components 中導出 FormTab</li>
            <li className="react-demo-li"> FormTab 中的渲染是會強制全部渲染的，主要是為了收集校驗</li>
            <li className="react-demo-li">如果被隱藏的 Tab 校驗錯誤，在 Tab Title 上會展現 Badge 小紅標，同時瀏覽器自動滾動</li>
          </ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
