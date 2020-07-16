import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect, ConnectProps, history } from 'umi';
import { stringify } from 'querystring';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { getUserSession, getUrlToken, saveUserSession } from '@/utils/session';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
}

// hk01:login: check if the return URL has token.
// If yes, save it in localStorage and remove the access_token param from URL
if (getUrlToken()) {
  saveUserSession(getUrlToken());
  history.replace(window.location.pathname);

  // let cbUrl = '/'
  // const loginCallbackUrl = sessionStorage.getItem('loginCallbackUrl')

  // if (loginCallbackUrl && !loginCallbackUrl?.includes('%2Flogin')) {
  //   cbUrl = decodeURIComponent(loginCallbackUrl);
  //   const { pathname } = loginCallbackUrl;
  //   cbUrl = pathname;
  // };

  // history.replace(cbUrl);
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;

    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    //const isLogin = currentUser && currentUser.userid;

    // hk01:login: check login status by checking token saved in localStorage
    const isLogin = getUserSession();

    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin) {
      return <Redirect to={`/login?${queryString}`} />;
    }

    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
