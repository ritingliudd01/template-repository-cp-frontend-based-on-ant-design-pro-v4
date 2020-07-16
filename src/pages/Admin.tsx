// hk01:pages:formily: various form demos
import React, { useState, useEffect } from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Printer from '@formily/printer';
import styled from 'styled-components';
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

//console.log(process.env.ENV)

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

const getInitialValues = () => {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove({
        daterange: ['2018-12-19', '2018-12-19'],
        string: 'this is string',
        radio: '2',
        checkbox: ['2', '3', '4'],
        textarea:
          'this is long text.this is long text.this is long text.this is long text.this is long text.',
        rating: 3,
        transfer: [1, 2],
        range: 384,
        date: '2020-02-20',
        month: '2020-08',
        year: '2023',
        time: '22:29:53',
        timerange: ['9:00:00', '18:00:00'],
        week: '2020-9th',
        number: 123,
        boolean: true,
        select: '2'
      })
    }, 1000)
  })
};

const { onFieldValueChange$, onFieldInit$, onFormInit$ } = FormEffectHooks

setValidationLocale({
  zh: {
    url: 'URL格式不合法，注意：必须要带上协议，可以直接以//开头'
  }
});

const placehodlers = {
  url: 'https://test.alibaba.com',
  email: 'test@alibaba-inc.com',
  qq: '123',
  date: '2012-12-12',
  idcard: '433533199312058746',
  zip: '333333',
  money: '$12.33',
  ipv6: '2001:0db8:86a3:08d3:1319:8a2e:0370:7344',
  ipv4: '168.1.1.0',
  phone: '16835646823',
  zh: '我爱中国'
};

const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }
  .ant-form-item {
    display: inline-flex;
    margin-right: 16px;
    margin-bottom: 16px;
  }
`

const actions = createFormActions();

let cache = {};

export default (): React.ReactNode => {
  const [state, setState] = useState({ editable: true })
  const [initialValues, setIntialValues] = useState({})
  useEffect(() => {
    getInitialValues().then(initialValues => {
      setIntialValues(initialValues)
    })
  }, [])
  return (
  <PageHeaderWrapper content=" 这个页面只有 admin 权限才能查看">
    <Card>
      <Alert
        message="umi ui 现已发布，欢迎使用 npm run ui 启动体验。"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 48,
        }}
      />
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor="#eb2f96" /> You
      </Typography.Title>
    </Card>
    <p style={{ textAlign: 'center', marginTop: 24 }}>
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>

    <Card>
    <SchemaForm
      editable={state.editable}
      labelCol={8}
      wrapperCol={6}
      components={components}
      effects={({ setFieldState }) => {
        FormEffectHooks.onFieldValueChange$('bbb').subscribe(({ value }) => {
          setFieldState('detailCard', state => {
            state.visible = value
          })
        })
      }}
      onSubmit={values => {
        console.log(values)
      }}
    >

      <FormCard title="基本信息">
          <Field name="aaa" type="string" title="字段1" x-component="Input" />
          <Field
            name="bbb"
            type="number"
            title="控制详细信息显示隐藏"
            enum={[
              { value: true, label: '显示' },
              { value: false, label: '隐藏' }
            ]}
            default={true}
            x-component="Select"
          />
          <Field
            name="ccc"
            type="date"
            title="字段3"
            x-component="DatePicker"
          />
          ​
      </FormCard>

      <FormCard title="详细信息" name="detailCard">
          <FormLayout labelCol={8} wrapperCol={12}>
            <FormItemGrid title="字段3"  cols={[6, 11]}>
              ​<Field name="ddd" type="number" x-component="NumberPicker" />
              ​<Field name="eee" type="date" x-component="DatePicker" />​
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
                />​
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
                x-props={{ style: { width: 80 } }}
                description="简单描述"
                x-component="Input"
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
          <Field name="aas" type="string" title="字段4" x-component="Input" />​
          <FormBlock title="区块">
            <Field
              name="ddd2"
              type="string"
              title="字段5"
              x-component="Input"
            />
            ​
            <Field
              name="eee2"
              type="string"
              title="字段6"
              x-component="Input"
            />
            ​
          </FormBlock>

          <FormBlock title="上传">
          <Field
          type="array"
          title="卡片上传文件"
          name="upload"
          x-component-props={{ listType: 'card' }}
          x-component="Upload"
        />
        <Field
          type="array"
          title="拖拽上传文件"
          name="upload2"
          x-component-props={{ listType: 'dragger' }}
          x-component="Upload"
        />
        <Field
          type="array"
          title="普通上传文件"
          name="upload3"
          x-component-props={{ listType: 'text' }}
          x-component="Upload"
        />
            </FormBlock>
          <FormBlock title="其它">
            <FormLayout labelCol={8} wrapperCol={16}>
              <Field
              title="数组表格"
              required
              name="array_list"
              maxItems={3}
              type="array"
              x-component="ArrayTable"
              x-component-props={{
                renderExtraOperations() {
                  return '';
                  //return <div>Hello worldasdasdasdasd</div>
                },
                operationsWidth: 300
              }}
              default={[
                { bb: '' }
              ]}
            >
              <Field type="object">
                {/* <Field
              name="aa"
              x-component="Input"
              description="hello world"
              title="字段1"
            /> */}
                <Field name="bb" x-component="Input" />
                {/* <Field name="dd" x-component="Input" title="字段4" x-index={1} /> */}
                {/* <Field name="hh" x-component="DateRangePicker" title="日期" /> */}
              </Field>
                </Field></FormLayout>
          </FormBlock>
          </FormCard>
          <FormButtonGroup align="center">
          ​<Submit>提交</Submit>​
          <Button
            type="primary"
            onClick={() => setState({ editable: !state.editable })}
          >
            {state.editable ? '详情' : '编辑'}
          </Button>
          <Reset>重置</Reset>​
        </FormButtonGroup>

    </SchemaForm>
    </Card>


    <Card title="校验">
    <Printer>
      <SchemaForm
        labelCol={5}
        wrapperCol={14}
        components={components}
        validateFirst
        expressionScope={{
          externalTitle: (
            <span style={{ color: 'green' }}>React Node Message</span>
          ),
          requiredReactNode: (
            <div>
              必填，<span style={{ color: 'blue' }}>富文本错误文案</span>
            </div>
          )
        }}
        effects={({ setFieldState }) => {
          onFieldValueChange$('format_type').subscribe(fieldState => {
            setFieldState('format_text', state => {
              state.value = placehodlers[fieldState.value]
              state.rules = fieldState.value
              state.props['x-component-props'] =
                state.props['x-component-props'] || {}
              state.props['x-component-props'].placeholder =
                placehodlers[fieldState.value]
            })
          })
        }}
      >
        <Field
          type="string"
          required
          title="Required"
          name="required"
          x-component="Input"
        />
        <Field
          type="string"
          required
          title="Format Type"
          name="format_type"
          enum={[
            'url',
            'email',
            'ipv6',
            'ipv4',
            'idcard',
            'taodomain',
            'qq',
            'phone',
            'money',
            'zh',
            'date',
            'zip'
          ]}
          x-component="Select"
        />
        <Field
          type="string"
          required
          title="Format Text"
          name="format_text"
          x-component="Input"
        />
        <Field
          type="string"
          required
          title="Other Rules"
          x-rules={[
            {
              whitespace: true,
              min: 5,
              max: 10,
              validator(value) {
                return value.indexOf('asd') > -1 ? '文本里不能包含asd' : ''
              }
            }
          ]}
          name="custom_rules"
          x-component="Input"
        />
        <Field
          type="string"
          required
          title="Async Validate"
          x-rules={value => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(value !== '57350' ? '验证码验证失败' : '')
              }, 1000)
            })
          }}
          name="remote_code"
          x-props={{
            hasFeedback: true,
            triggerType: 'onBlur'
          }}
          x-component="Input"
          x-component-props={{
            placeholder: 'Please input remote code:57350'
          }}
        />
        <Field
          type="number"
          required
          title="Threshold Validate"
          x-rules={value => {
            if (value > 0 && value < 100) {
              return {
                type: 'warning',
                message: '第一阶梯'
              }
            } else if ((value >= 100) & (value < 500)) {
              return {
                type: 'warning',
                message: '第二阶梯'
              }
            } else if ((value >= 500) & (value < 1000)) {
              return {
                type: 'warning',
                message: '第三阶梯'
              }
            } else if (value >= 1000) {
              return {
                type: 'warning',
                message: '第四阶梯'
              }
            } else {
              return ''
            }
          }}
          name="threshold"
          x-component="NumberPicker"
        />
        <Field
          type="string"
          title="Custom Message"
          x-rules={{
            required: true,
            extra: '校验模板注入变量',
            message: 'Required {{extra}}'
          }}
          name="custom_message"
          x-component="Input"
        />
        <Field
          type="string"
          title="{{externalTitle}}"
          x-rules={[
            {
              required: true,
              message: '{{requiredReactNode}}'
            }
          ]}
          name="react_node_message"
          x-component="Input"
        />

        <FormButtonGroup align="center">
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>


      </SchemaForm>
    </Printer>
    </Card>



    <Card title="域列表（有bug）">
      <Form>
        <FieldList
        name="userList"
        initialValue={[
          { username: 'morally', age: 21 },
          { username: 'bill', age: 22 }
        ]}
      >
        {({ state, mutators }) => {
          const onAdd = () => mutators.push()
          return (
            <div>
              {state.value.map((item, index) => {
                const onRemove = index => mutators.remove(index)
                const onMoveUp = index => mutators.moveUp(index)
                const onMoveDown = index => mutators.moveDown(index)
                return (
                  <RowStyleLayout key={index}>
                    <FormItem
                      name={`userList.${index}.username`}
                      component={Input}
                      title="用户名"
                    />
                    <FormItem
                      name={`userList.${index}.age`}
                      component={Input}
                      title="年龄"
                    />
                    <Button onClick={onRemove.bind(null, index)}>remove</Button>
                    <Button onClick={onMoveUp.bind(null, index)}>up</Button>
                    <Button onClick={onMoveDown.bind(null, index)}>down</Button>
                  </RowStyleLayout>
                )
              })}
              <Button onClick={onAdd}>add</Button>
            </div>
          )
        }}
      </FieldList>
      </Form>
      </Card>

      <Card title="步骤">
        <Printer>
      <SchemaForm
      components={{
        Input
      }}
      onSubmit={values => {
        console.log('提交')
        console.log(values)
      }}
      actions={actions}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 6 }}
      validateFirst
      effects={({ setFieldState, getFormGraph }) => {
        onFormInit$().subscribe(() => {
          setFieldState('col1', state => {
            state.visible = false
          })
        })
      }}
    >
      <FormStep
        style={{ marginBottom: 20 }}
        dataSource={[
          { title: 'Step1', name: 'step-1' },
          { title: 'Step2', name: 'step-2' },
          { title: 'Step3', name: 'step-3' }
        ]}
      />
      <FormCard name="step-1" title="Step1">
        <Field name="a1" required title="A1" x-component="Input" />
      </FormCard>
      <FormCard name="step-2" title="Step2">
        <Field name="a2" required title="A2" x-component="Input" />
      </FormCard>
      <FormCard name="step-3" title="Step3">
        <Field name="a3" required title="A3" x-component="Input" />
      </FormCard>
      <FormButtonGroup>
        <Submit>提交</Submit>
        <Button onClick={() => actions.dispatch(FormStep.ON_FORM_STEP_PREVIOUS)}>
          上一步
        </Button>
        <Button onClick={() => actions.dispatch(FormStep.ON_FORM_STEP_NEXT)}>
          下一步
        </Button>
        <Button
          onClick={() => {
            cache = actions.getFormGraph()
          }}
        >
          存储当前状态
        </Button>
        <Button
          onClick={() => {
            actions.setFormGraph(cache)
          }}
        >
          回滚状态
        </Button>
      </FormButtonGroup>
          </SchemaForm>
        </Printer>
  </Card>

  </PageHeaderWrapper>
)};
