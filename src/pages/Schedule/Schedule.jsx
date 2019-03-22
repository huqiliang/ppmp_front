import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';
// import Ellipsis from '@icedesign/ellipsis';
import DataBinder from '@icedesign/data-binder';
import moment from 'moment';
import NewEditDialog from './components/SimpleFormDialog';
import styles from './Schedule.module.scss';
import './Schedule.scss';
@DataBinder({
  products: {
    url: '/ppmp/products',
    type: 'get',
    params: {
      limit: 5,
      offset: 0,
    },
    defaultBindingData: {
      // 配置接口返回数据的字段的初次默认值
      count: 0,
    },
  },
})
export default class Schedule extends Component {
  static displayName = 'Schedule';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      // isLoading: false,
      // dataSource: [],
    };
  }

  componentDidMount() {
    this.props.updateBindingData('products');
  }

  /**
   * 页码发生改变时的回调函数
   */
  handleChange = (current) => {
    this.props.updateBindingData(
      'products',
      {
        params: {
          limit: 5,
          offset: (current - 1) * 5,
        },
      },
      () => {
        this.setState({
          current,
        });
      }
    );
  };
  renderCreateAt = (value) => {
    return moment(value).format('YYYY-MM-DD hh:mm:ss');
  };
  renderPercent = (value) => {
    return `${value}%`;
  };
  renderAction = () => {
    return (
      <div>
        <NewEditDialog isEdit />
      </div>
    );
  };
  render() {
    // const { dataSource, isLoading } = this.state;
    const { products } = this.props.bindingData;
    return products ? (
      <div className={styles.container}>
        <div className={styles.head}>
          <h3 className={styles.title}>搜索列表:</h3>
          {/* <p className={styles.desc}>更新时间：2018年10月01日 12：00</p> */}
        </div>
        {/* <div className={styles.summary}>全国单日总票房：100 亿</div> */}
        <Table
          dataSource={products.rows}
          // loading={isLoading}
          className="custom-table"
          style={{ minHeight: '400px' }}
        >
          <Table.Column align="center" title="项目Id" dataIndex="id" />
          <Table.Column align="center" title="项目名称" dataIndex="title" />
          <Table.Column
            align="left"
            title="项目简介"
            dataIndex="sub_description"
          />
          <Table.Column align="center" title="Owner" dataIndex="owner" />
          <Table.Column
            align="center"
            title="开始时间"
            cell={this.renderCreateAt}
            dataIndex="created_at"
          />
          <Table.Column
            align="center"
            title="进度"
            cell={this.renderPercent}
            dataIndex="percent"
          />
          <Table.Column
            align="center"
            title="操作"
            cell={this.renderAction}
            // dataIndex="created_at"
          />
        </Table>
        <Pagination
          total={products.count}
          pageSize={5}
          className={styles.pagination}
          current={this.state.current}
          onChange={this.handleChange}
        />
      </div>
    ) : null;
  }
}
