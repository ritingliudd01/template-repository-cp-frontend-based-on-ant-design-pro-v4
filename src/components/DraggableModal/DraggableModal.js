/**
 * Modal组件二次封装
 * 使Modal组件支持拖放
 *
 * 注：maskClosable已被默认置为false，如需要开启，设置为true即可
 *
 * 新增属性：
 * @prop  {boolean} draggable   设置是否可拖放，默认为true
 */

 // hk01:login: draggable modal
import React from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';

let startX = 0;
let startY = 0;

class DraggableModal extends React.PureComponent {
  static propTypes = {
    draggable: PropTypes.bool,
  };

  static defaultProps = {
    draggable: true,
  };

  static info = Modal.info;
  static success = Modal.success;
  static error = Modal.error;
  static warning = Modal.warning;
  static confirm = Modal.confirm;

  state = {
    draggable: true,
  };

  componentWillMount() {
    const draggable = this.props.draggable !== false;
    this.setState({
      draggable,
      x: 0,
      y: 0,
      originX: 0,
      originY: 0,
    });
  }

  componentWillReceiveProps(nextProps) {
    const draggable = nextProps.draggable !== false;
    this.setState({
      draggable,
    });
    // 由隐藏切换到显示
    if (nextProps.visible && !this.props.visible) {
      this.setState({
        x: 0,
        y: 0,
        originX: 0,
        originY: 0,
      });
    }
  }

  onDragStart = (e) => {
    const { pageX, pageY } = e;
    startX = pageX;
    startY = pageY;
  };

  onDrag = (e) => {
    const { pageX, pageY } = e;
    const { originX, originY } = this.state;
    if (pageX > 0 && pageY > 0) {
      this.setState({
        x: originX + (pageX - startX),
        y: originY + (pageY - startY),
      });
    }
  };

  onDragEnd = () => {
    const { x, y } = this.state;
    this.setState({
      originX: x,
      originY: y,
    });
  }

  render() {
    const { x, y } = this.state;
    const headStyle = {
      cursor: this.state.draggable ? 'move' : 'default',
    };

    const bodyStyle = {
      ...this.props.style,
      transform: `translate(${x}px,${y}px)`,
    };

    const Title = (<div
      style={headStyle}
      onDragStart={this.onDragStart}
      onDrag={this.onDrag}
      onDragEnd={this.onDragEnd}
      draggable
    >
      {this.props.btnCoupon === true ? <Button onClick={this.props.onOk} type="primary" style={{ float: 'right' }}>確認</Button> : ''}
      {this.props.title}
    </div>);

    const footer = typeof this.props.footer !== 'undefined' ? this.props.footer : [
      <Button
        style={{ display: (this.props.canno === 'no' || this.props.cancelno === 'no' ? 'none' : 'inline-block') }}
        key="1"
        onClick={this.props.onCancel}
        disabled={this.props.confirmLoading}
      >{this.props.cancelText || '取消'}</Button>,
      <Button
        key="2"
        style={{ display: (this.props.canno === 'no' ? 'none' : 'inline-block') }}
        type={this.props.okType || 'primary'}
        onClick={this.props.onOk}
        loading={this.props.confirmLoading}
      >{this.props.okText || '確定'}</Button>,
    ];

    return (<Modal
      {...this.props}
      title={Title}
      style={bodyStyle}
      centered
      maskClosable={this.props.maskClosable === true}
      footer={footer}
    />);
  }
}

export default DraggableModal;
