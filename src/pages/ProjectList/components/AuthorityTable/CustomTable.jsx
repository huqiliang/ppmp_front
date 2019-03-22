import React, { Component } from 'react';
import { Table, Pagination, Balloon, Icon, Button } from '@alifd/next';
import DataBinder from '@icedesign/data-binder';
import moment from 'moment';

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
export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }
  componentDidMount() {
    this.props.updateBindingData('products');
  }
  handlePagination = (current) => {
    this.setState({
      current,
    });
  };

  handleSort = (dataIndex, order) => {
    const dataSource = this.state.dataSource.sort((a, b) => {
      const result = a[dataIndex] - b[dataIndex];
      if (order === 'asc') {
        return result > 0 ? 1 : -1;
      }
      return result > 0 ? -1 : 1;
    });

    this.setState({
      dataSource,
    });
  };

  renderCatrgory = (value) => {
    return (
      <Balloon
        align="lt"
        trigger={<div style={{ margin: '5px' }}>{value}</div>}
        closable={false}
        style={{ lineHeight: '24px' }}
      >
        皮肤科属于外科，主要治疗各种皮肤病，常见皮肤病有牛皮癣 、 疱疹
        、酒渣鼻等
      </Balloon>
    );
  };

  renderState = (value) => {
    return (
      <div style={styles.state}>
        <span style={styles.circle} />
        <span style={styles.stateText}>{value}</span>
      </div>
    );
  };

  renderOper = () => {
    return (
      <div style={styles.oper}>
        <Icon
          type="edit"
          size="small"
          style={{
            marginRight: 10,
          }}
        />
        <Icon type="ashbin" size="small" />
      </div>
    );
  };
  renderCreateAt = (value) => {
    return moment(value).format('YYYY-MM-DD hh:mm:ss');
  };
  renderLogo = (value) => {
    return (
      <img
        src={value}
        alt="logo"
        width="50"
        height="50"
        style={{ borderRadius: 10 }}
      />
    );
  };
  renderSubProduct = (value) => {
    return (
      <Button
        onClick={() => {
          console.log('====================================');
          console.log(value);
          console.log('====================================');
          // this.click(value);
        }}
      >
        查看
      </Button>
    );
  };
  render() {
    // const { dataSource } = this.state;
    const { products } = this.props.bindingData;
    return (
      <div style={styles.tableContainer}>
        <Table
          dataSource={products.rows}
          onSort={this.handleSort}
          hasBorder={false}
          className="custom-table"
        >
          <Table.Column
            width={100}
            lock="left"
            title="项目标志"
            dataIndex="logo"
            cell={this.renderLogo}
          />
          <Table.Column width={100} title="项目名" dataIndex="title" sortable />
          <Table.Column width={200} title="当前版本号" dataIndex="version" />
          <Table.Column width={200} title="项目简介" dataIndex="description" />
          <Table.Column width={200} title="状态" dataIndex="status" />
          <Table.Column width={100} title="创建人" dataIndex="owner" />
          <Table.Column
            width={100}
            title="子项目"
            dataIndex="sub_id"
            cell={this.renderSubProduct}
          />
          <Table.Column
            width={200}
            title="开始时间"
            cell={this.renderCreateAt}
            dataIndex="create_at"
          />
          <Table.Column
            width={100}
            title="操作"
            cell={this.renderOper}
            lock="right"
            align="center"
          />
        </Table>
        <Pagination
          style={styles.pagination}
          current={this.state.current}
          onChange={this.handlePagination}
        />
      </div>
    );
  }
}

const styles = {
  tableContainer: {
    background: '#fff',
    paddingBottom: '10px',
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
  editIcon: {
    color: '#999',
    cursor: 'pointer',
  },
  circle: {
    display: 'inline-block',
    background: '#28a745',
    width: '8px',
    height: '8px',
    borderRadius: '50px',
    marginRight: '4px',
  },
  stateText: {
    color: '#28a745',
  },
};
