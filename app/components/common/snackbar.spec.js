let _ from 'lodash');

describe('Snackbar Component: ', () => {

  let Snackbar,
    SnackbarActions,
    element,
    spies = {};

  let React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    SnackbarActions from '../../actions/snackbar.actions');
  });

  beforeEach(() => {
    Snackbar = require('./snackbar');
    element = TestUtils.renderIntoDocument(<Snackbar />);
  });

  it('should instantiate the Snackbar', () => {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('when there is no message', () => {

    beforeEach(() => {
      Snackbar = require('./snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
    });

    it('should hide the snackbar', () => {
      let div = TestUtils.findRenderedDOMComponentWithTag(element, 'div');
      expect(div.props.className).contains('hide');
    });
  });

  describe('with a success message', () => {
    beforeEach(() => {
      Snackbar = require('./snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
      element.setState({messageType: 'success', message: 'success'});
    });

    it('should reveal a success snackbar', () => {
      let div = TestUtils.findRenderedDOMComponentWithTag(element, 'div');
      expect(div.props.className).contains('success');
    });
  });

  describe('with an info message', () => {
    beforeEach(() => {
      Snackbar = require('./snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
      element.setState({messageType: 'info', message: 'info'});
    });

    it('should reveal an info snackbar', () => {
      let div = TestUtils.findRenderedDOMComponentWithTag(element, 'div');
      expect(div.props.className).contains('info');
    });
  });

  describe('with an error message', () => {
    beforeEach(() => {
      Snackbar = require('./snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
      element.setState({messageType: 'error', message: 'error'});
    });

    it('should reveal an error snackbar', () => {
      let div = TestUtils.findRenderedDOMComponentWithTag(element, 'div');
      expect(div.props.className).contains('error');
    });
  });

  describe('clicking the close icon', () => {
    beforeEach(() => {
      spies.hide = sinon.stub(SnackbarActions, 'hide');
      Snackbar = require('./snackbar');
      element = TestUtils.renderIntoDocument(<Snackbar />);
    });

    afterEach(() => {
      spies.hide.restore();
    });

    it('should hide the snackbar', () => {
      let icon = TestUtils.findRenderedDOMComponentWithTag(element, 'i');
      TestUtils.Simulate.click(icon);
      expect(spies.hide).to.have.been.called;
    });
  });

});
