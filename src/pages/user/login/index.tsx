//import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox, Button, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, connect, Dispatch, useIntl, history} from 'umi';
import { StateType } from '@/models/login';
//import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
//import LoginForm from './components/Login';
//import styles from './style.less';
import DraggableModal from '@/components/DraggableModal/DraggableModal';
import { clearUserSession } from '@/utils/session';
import { getUserInfo, saveUserSession, getUrlToken, backendAuth } from '@/utils/session';

//const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;

interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const Login: React.FC<LoginProps> = (props) => {

  const [loading, setLoading] = useState<boolean>(false);
  const { formatMessage } = useIntl();

  // hk01:login: check if access_token exists in return URL.
  // If yes, save it in localStorage and go to root.
  if (getUrlToken()) {
    saveUserSession(getUrlToken());
    history.replace('/');
  }

  const handleOk = () => {
    clearUserSession();
    setLoading(true);
    backendAuth(window.location.href);
  };

  return (
    !getUrlToken() ?
      <DraggableModal
      title={formatMessage({ id: 'app.login.login' })}
      visible
      closable={false}
      maskClosable={false}
      footer={
        <Button type="primary" loading={loading} onClick={handleOk}>
          {loading ? formatMessage({ id: 'login.loging' }) : formatMessage({ id: 'login.fail' })}
        </Button>
      }
    >
      {formatMessage({ id: 'login.tips' })}
      </DraggableModal>
      : null
  );
};

export default connect(({}: ConnectState) => ({}))(Login);
