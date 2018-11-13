import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProjects, getSites } from '../model';

import { centerMapOnSite } from '../model/map';

import List from '../components/List';

class Sidebar extends Component {
  render() {
    // the props in Sidebar comes from Redux and contains the Sites/Projects object-array
    const items = [...this.props.projects];

    return (
      <List
        items={ items }
        onClickSubitem={ this.props.centerMapOnSite }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: getProjects(state),
    sites: getSites(state),
  };
}

const mapDispatchToProps = {
  centerMapOnSite
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
