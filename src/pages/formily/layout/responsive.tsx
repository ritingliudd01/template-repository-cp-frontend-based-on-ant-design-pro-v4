// hk01:pages:formily: various form demos
import React, { useState, useEffect } from 'react';
import { Card, Typography, Button} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import Printer from '@formily/printer';
import { toArr, isFn, FormPath } from "@formily/shared";
import { ArrayList } from "@formily/react-shared-components";
import {
  PlusCircleOutlined
} from '@ant-design/icons';
import {
  SchemaForm,
  SchemaField,
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
  MegaLayout,
  FormMegaLayout,
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

const ArrayComponents = {
  CircleButton: props => <Button {...props} />,
  TextButton: props => <Button text {...props} />,
  AdditionIcon: () => <div>+Add</div>,
  RemoveIcon: () => <div>Remove</div>,
  MoveDownIcon: () => <div>Down</div>,
  MoveUpIcon: () => <div>Up</div>
};

const ArrayCustom = props => {
  const { value, schema, className, editable, path, mutators } = props;
  const {
    renderAddition,
    renderRemove,
    renderMoveDown,
    renderMoveUp,
    renderEmpty,
    renderExtraOperations,
    ...componentProps
  } = schema.getExtendsComponentProps() || {};

  const onAdd = () => {
    const items = Array.isArray(schema.items)
      ? schema.items[schema.items.length - 1]
      : schema.items;
    mutators.push(items.getEmptyValue());
  }; return (
    <ArrayList
      value={value}
      minItems={schema.minItems}
      maxItems={schema.maxItems}
      editable={editable}
      components={ArrayComponents}
      renders={{
        renderAddition,
        renderRemove,
        renderMoveDown,
        renderMoveUp,
        renderEmpty // 允许开发者覆盖默认
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {toArr(value).map((item, index) => {
          return (
            <div style={{ marginBottom: "16px" }} key={index}>
              <SchemaField path={FormPath.parse(path).concat(index)} />
            </div>
          );
        })}
      </div>
      <ArrayList.Empty>
        {({ children }) => {
          return (
            <div
              {...componentProps}
              size="small"
              className={`card-list-item card-list-empty`}
              onClick={onAdd}
            >
              <div>{children}</div>
            </div>
          );
        }}
      </ArrayList.Empty>
      <ArrayList.Addition>
        {({ children, isEmpty }) => {
          if (!isEmpty) {
            return (
              <div
                style={{ marginLeft: "12px", cursor: 'pointer' }}
                className="array-cards-addition"
                onClick={onAdd}
              >
                <PlusCircleOutlined style={{ color: '#1890ff' }} />
              </div>
            );
          }
        }}
      </ArrayList.Addition>
    </ArrayList>
  );
};

ArrayCustom.isFieldComponent = true;


export default (): React.ReactNode => {
  const { formatMessage } = useIntl();

  return (
    <PageHeaderWrapper>
      <Card>
        <Printer>
          <SchemaForm components={{ Input, Checkbox, ArrayCustom }}>
            <FormCard title="基本信息">
              <FormMegaLayout
                labelWidth="100"
                grid
                full
                autoRow
                labelAlign="left"
                columns={3}
                responsive={{ lg: 3, m: 2, s: 1 }}
              >
                <Field name="username" title="姓名" x-component="Input" required />
                <Field name="gender" title="性别" x-component="Input" required />
                <Field name="company" title="公司" x-component="Input" required />
                <Field title="固定电话" name="phoneList" type="array" required
                  default={[
                    { phone: '010-1234 5678' },
                    { phone: '010-1234 5678' }
                  ]}
                  x-component="ArrayCustom"
                >
                  <Field type="object" x-mega-props={{ columns: 1 }}>
                    <Field name="phone" x-component="Input" />
                  </Field>
                </Field>

                <Field
                  title="部门职务"
                  name="departmentList"
                  type="array"
                  required
                  default={[
                    { group: "项目1部", position: '项目经理' },
                    { group: "项目1部", position: '研发经理', isManeger: true }
                  ]}
                  x-component="ArrayCustom"
                >
                  <Field type="object" x-mega-props={{ columns: 2 }}>
                    <Field name="group" x-mega-props={{ span: 2 }} x-component="Input" />
                    <Field name="position" x-component="Input" />
                    <Field name="isManeger" x-component="Checkbox" x-component-props={{
                      children: '是否主管'
                    }} />
                  </Field>
                </Field>

                <Field
                  title="手机号"
                  name="mobileList"
                  type="array"
                  required
                  default={[
                    { mobile: "136 0123 4567", enableSMS: true },
                    { mobile: "136 0123 4567", enableSMS: false }
                  ]}
                  x-component="ArrayCustom"
                >
                  <Field type="object" x-mega-props={{ columns: 2 }}>
                    <Field name="mobile" x-component="Input" />
                    <Field name="enableSMS" x-component="Checkbox" x-component-props={{
                      children: '接受短信'
                    }} />
                  </Field>
                </Field>
              </FormMegaLayout>
            </FormCard>
            <FormButtonGroup>
              <Submit />
              <Reset />
            </FormButtonGroup>
          </SchemaForm>
        </Printer>
      </Card>

      <Card title={formatMessage({ id: 'formily.demo.intro' })}>
        <Paragraph>
          <ul className="react-demo-ul"><li className="react-demo-li">結合自定義 ArrayList 以及 MegaLayout 的在柵格場景下的應用</li><li className="react-demo -li">配合響應式佈局，能夠根據屏幕寬度進行自適應</li><li className="react-demo-li">在 ArrayList 場景下，如何通過 Field（object）來改變 columns</li> </ul>
        </Paragraph>
      </Card>
    </PageHeaderWrapper>
  )
};
