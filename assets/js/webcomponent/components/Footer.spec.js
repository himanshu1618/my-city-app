import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer Component', () => {

  it('should render correctly with props', () => {
    const component = shallow(<Footer />);
    expect(component).toMatchSnapshot();
  });

});
