import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header Component', () => {

  it('should render correctly with props', () => {
    const component = shallow(<Header />);
    expect(component).toMatchSnapshot();
  });

});
