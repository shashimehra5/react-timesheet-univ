import React, {PropTypes} from 'react/addons';
import TimeunitRow from './timeunit.row';

const TimeunitTable = React.createClass({

  propTypes: {
    timeunits: PropTypes.arrayOf(PropTypes.object).isRequired,
    store: PropTypes.object.isRequired
  },

  render () {
    let self = this;

    let timeunitRows = this.props.timeunits.map(function (timeunit) {
      return (
        <TimeunitRow timeunit={timeunit}
          key={timeunit._id}
          timesheet={self.props.timesheet}
          store={self.props.store} />
      );
    });

    return (
      <table className="ui celled table tsz-table-row-cursor">
        <thead>
          <tr>
            <th>Project</th>
            <th>Date</th>
            <th>Hours</th>
            <th className="tsz-table-delete-column">Delete</th>
          </tr>
        </thead>
        <tbody>
          {timeunitRows}
        </tbody>
      </table>
    );
  }
});

export default TimeunitTable;