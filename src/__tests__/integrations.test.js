import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import Root from 'root';
import App from 'components/App';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{name: 'fetched #1'}, {name: 'fetched #2'}]
  })
});

afterEach(() => {
  moxios.uninstall();
})

it('can fetch a list of commments and display them', (done) => {
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  )

  wrapped.find('.fetchComments').simulate('click');

  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find('li').length).toEqual(2);
    done();
    wrapped.unmount();
  })
})
