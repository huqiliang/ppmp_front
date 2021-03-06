import React, { Component } from 'react';
import {
  Dialog,
  Grid,
  Input,
  Button,
  DatePicker,
  NumberPicker,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import moment from 'moment';
import { enquireScreen } from 'enquire-js';

const { Row, Col } = Grid;
// const { Group: RadioGroup } = Radio;

const defaultValue = {
  keywords: '',
  type: 'post',
  content: '',
};

export default class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: defaultValue,
      isMobile: false,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  showDialog = () => {
    this.setState({
      visible: true,
    });
  };

  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };

  onOk = () => {
    this.refForm.validateAll((error) => {
      if (error) {
        // show validate error
        return;
      }
      // deal with value

      this.hideDialog();
    });
  };

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { isMobile } = this.state;
    const { isEdit } = this.props;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }

    return (
      <IceContainer>
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title={isEdit ? '编辑项目' : '新增项目'}
          // {...this.props}
          onOk={this.onOk}
          onCancel={this.hideDialog}
          onClose={this.hideDialog}
          isFullScreen
          visible={this.state.visible}
        >
          <IceFormBinderWrapper
            ref={(ref) => {
              this.refForm = ref;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div style={styles.dialogContent}>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>项目名称：</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    name="title"
                    required
                    min={2}
                    max={10}
                    message="当前字段必填，且最少 2 个字最多 10 个字"
                  >
                    <Input
                      style={styles.input}
                      placeholder="多关键词用英文 , 号分割"
                    />
                  </IceFormBinder>
                  <IceFormError name="title" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>项目简介：</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    name="sub_description"
                    required
                    min={2}
                    message="当前字段必填，且最少 2 个字"
                  >
                    <Input.TextArea
                      style={styles.input}
                      placeholder="请输入详细内容"
                      rows={4}
                    />
                  </IceFormBinder>
                  <IceFormError name="sub_description" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>进度</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    name="process"
                    required
                    message="请输入0-100的数字"
                  >
                    <NumberPicker
                      min={0}
                      max={100}
                      style={styles.input}
                      placeholder="请输入进度"
                    />
                  </IceFormBinder>
                  <IceFormError name="sub_description" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>开始时间：</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder name="time" required message="当前字段必填">
                    <DatePicker
                      format="YYYY-MM-DD hh:mm:ss"
                      defaultValue={moment()}
                    />
                  </IceFormBinder>
                  <IceFormError name="time" />
                </Col>
              </Row>

              {/* <Row style={styles.formRow}>
                <Col>
                  <IceFormBinder name="type">
                    <RadioGroup
                      dataSource={[
                        {
                          value: 'post',
                          label: '文章',
                        },
                        {
                          value: 'video',
                          label: '视频',
                        },
                        {
                          value: 'image',
                          label: '图片',
                        },
                      ]}
                    />
                  </IceFormBinder>
                </Col>
              </Row> */}
            </div>
          </IceFormBinderWrapper>
        </Dialog>
        <Button type="primary" onClick={this.showDialog}>
          编辑
        </Button>
      </IceContainer>
    );
  }
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};
