let proxyquire from 'proxyquireify')(require);
let mockComponent  from './mock');

describe('App: ', function () {

  let App,
    element,
    spies = {},
    proxies;

  let React, TestUtils;

  beforeEach(function () {
    React from 'react/addons');
    TestUtils = React.addons.TestUtils;
  });

  beforeEach(function () {
    proxies = {
      './common/navigation/navbar': mockComponent('Navbar'),
      './common/section': mockComponent('SectionHeader'),
      'react-router': {
        RouteHandler: mockComponent('RouteHandler')
      },
      '../stores/login.store': {
        requireAuthenticatedUser: sinon.stub()
      }
    };

    App = proxyquire('./app', proxies);
    element = TestUtils.renderIntoDocument(<App />);
  });

  it('should instantiate the App', function () {
    expect(TestUtils.isCompositeComponent(element)).to.be.true;
  });

  describe('during the will transition to lifecyle', function () {
    it('should require an authenticated user from the login store', function () {
      App.willTransitionTo('transitionArg', 'paramsArg');
      expect(proxies['../stores/login.store'].requireAuthenticatedUser).to.have.been.calledWith('transitionArg');
    });
  });
});
