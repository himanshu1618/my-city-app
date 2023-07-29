import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header Component', () => {

  it('should render correctly without props', () => {
    const component = shallow(<Header />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const props = { user: { firstname: 'Test', imageUrl: 'test.png' } };
    const component = shallow(<Header {...props} />);
    expect(component).toMatchSnapshot();
  });

});
