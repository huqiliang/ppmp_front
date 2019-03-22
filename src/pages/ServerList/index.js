import React, { Component } from 'react';
import AuthorityTable from './components/AuthorityTable';

export default class ServerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="server-list-page">
        <AuthorityTable />
      </div>
    );
  }
}
