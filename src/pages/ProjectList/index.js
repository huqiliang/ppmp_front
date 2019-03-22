import React, { Component } from 'react';
import AuthorityTable from './components/AuthorityTable';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="project-list-page">
        <AuthorityTable />
      </div>
    );
  }
}
