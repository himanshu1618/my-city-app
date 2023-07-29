import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Header extends Component {
  render() {
    const { user } = this.props;
    const firstname = (user && user.firstname) || '';

    return (
      <header className='header'>
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand href='#'>MyCity</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              {
                firstname && (
                  <Fragment>
                    <Nav.Link href='#mycities'>Home</Nav.Link>
                  </Fragment>
                )
              }
            </Nav>
            <Nav>
              <NavDropdown title={this.renderProfile()} id='collasible-nav-dropdown' alignRight>
                {
                  firstname ? (
                    <Fragment>
                      <div className='user-firstname'>
                        {firstname}
                      </div>
                      <NavDropdown.Item href='#logout'>Logout</NavDropdown.Item>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <NavDropdown.Item href='#login'>Login</NavDropdown.Item>
                      <NavDropdown.Item href='#signup'>Signup</NavDropdown.Item>
                    </Fragment>
                  )
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }

  renderProfile() {
    const { user } = this.props;
    return (
      <div className='header-item profile'>
        <img src={(user && user.imageUrl) ? user.imageUrl : require('../../../images/user-icon-grey.jpg')} className='user-img' />
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object
};

export default Header;
