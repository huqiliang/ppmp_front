import React, { Component } from 'react';
import { Table, Icon, Pagination, Balloon } from '@alifd/next';
import Ellipsis from '@icedesign/ellipsis';
import DataBinder from '@icedesign/data-binder';
import moment from 'moment';
import styles from './Schedule.module.scss';
import './Schedule.scss';
@DataBinder({
  products: {
    url: '/ppmp/products',
    type: 'get',
    // data: {
    //   uid: '123123',
    // },
    // defaultBindingData: {
    //   // 配置接口返回数据的字段的初次默认值
    //   userName: '',
    //   userAge: 0,
    // },
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
    // this.fetchData();
    this.props.updateBindingData('products');
  }

  /**
   * 页码发生改变时的回调函数
   */
  handleChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.fetchData();
      }
    );
  };
  renderCreateAt = (value) => {
    return moment(value).format('YYYY-MM-DD hh:mm:ss');
  };
  renderId = (value, index) => {
    const ranking = {
      1: { color: 'red' },
      2: { color: 'rgba(255, 0, 0, 0.8)' },
      3: { color: 'rgba(255, 0, 0, 0.6)' },
    };
    return (
      <div className={styles.ranking} style={ranking[index + 1]}>
        NO.
        {value}
      </div>
    );
  };

  renderName = (value) => {
    return (
      <div className={styles.name}>
        <div className={styles.zh}>{value.zh}</div>
        <div className={styles.en}>{value.en}</div>
      </div>
    );
  };

  renderDayReturns = (value) => {
    return (
      <div className={styles.dayReturns}>
        <div className={styles.returns}>{value.returns}</div>
        <div className={styles.ratio}>
          <Icon
            type="arrow-up-filling"
            size="xs"
            className={styles.arrowUpIcon}
          />
          上涨
          {value.ratio}
        </div>
      </div>
    );
  };

  renderOrigin = (value) => {
    const Info = (ellipsis = false) => {
      return (
        <div className={styles.origin}>
          <div className={styles.director}>
            导演：
            {value.director}
          </div>
          <div className={styles.actor}>
            主演：
            {value.actor}
          </div>
          <div className={styles.company}>
            {ellipsis ? (
              <Ellipsis
                showTooltip={false}
                lineLimit={1}
                text={`发行公司：${value.company}`}
              />
            ) : (
              `发行公司：${value.company}`
            )}
          </div>
        </div>
      );
    };
    return (
      <Balloon
        trigger={Info(true)}
        align="r"
        alignEdge
        triggerType="click"
        closable={false}
        style={{ width: 300 }}
      >
        <div className={styles.balloonContent}>
          <h3 className={styles.balloonTitle}>详细信息</h3>
          {Info()}
        </div>
      </Balloon>
    );
  };

  renderScore = (value) => {
    return <div className={styles.score}>{value}</div>;
  };

  render() {
    // const { dataSource, isLoading } = this.state;
    const { products } = this.props.bindingData;
    console.log('====================================');
    console.log(products);
    console.log('====================================');
    return (
      <div className={styles.container}>
        <div className={styles.head}>
          <h3 className={styles.title}>项目列表:</h3>
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
          {/* <Table.Column
            align="center"
            title="影片出品"
            dataIndex="origin"
            cell={this.renderOrigin}
          />
          <Table.Column align="center" title="影片类型" dataIndex="type" />
          <Table.Column
            align="center"
            title="日票房"
            dataIndex="dayReturns"
            cell={this.renderDayReturns}
          />
          <Table.Column
            align="center"
            title="累计票房"
            dataIndex="accReturns"
          />
          <Table.Column align="center" title="上映日期" dataIndex="date" />
          <Table.Column
            align="center"
            title="评分"
            dataIndex="score"
            cell={this.renderScore}
          /> */}
        </Table>
        <Pagination
          className={styles.pagination}
          current={this.state.current}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
