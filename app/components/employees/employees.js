import React, {PropTypes} from 'react/addons';
import Router, {Navigation} from 'react-router';
import _ from 'lodash';

import EmployeeTable from './employee.table';
import EmployeeActions from '../../actions/employee.actions';
import EmployeeStore from '../../stores/employee.store';

import Paginator from '../common/navigation/paginator';
import SectionHeader from '../common/section';

const Employees = React.createClass({

  statics: {
    fetch (params, query) {
      return EmployeeStore.list({action: {query: {page: 1}}})
        .then(res => {return EmployeeStore.getState()});
    }
  },

  mixins: [Navigation],

  store: EmployeeStore,

  requestEmployees: EmployeeActions.list,

  getInitialState () {
    return this.store.getState();
  },

  createNew () {
    this.transitionTo('/employees/create');
  },

  onChange () {
    this.setState(this.store.getState());
  },

  componentWillMount () {
    this.store.addChangeListener(this.onChange);
    this.requestEmployees({page: 1});
  },

  componentWillUnmount () {
    this.store.removeChangeListener(this.onChange);
  },

  onPageChange (page) {
    this.requestEmployees({page: page});
  },

  render () {

    let numPages = Math.ceil(this.state.employees.totalItems / 5);
    let pagesShown = Math.min(numPages, 5);

    return (
      <div>
        <div className="row">
          <SectionHeader header='Employees' />
        </div>

        <div className="row">
          <button className="ui right floated primary button pad-bottom" type="button" onClick={this.createNew}>
            New Employee
          </button>
        </div>

        <div className="row">
          <EmployeeTable employees={this.state.employees.data} store={this.store} />
        </div>

        <div className="ui grid pad-top">
          <div className="centered row">
            <Paginator max={numPages} maxVisible={pagesShown} onChange={this.onPageChange} />
          </div>
      </div>
      </div>
    );
  }
});

export default Employees;
