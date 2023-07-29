import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className='my-1 pt-1 text-muted text-center text-small'>
        <p className='mb-1'>© 2019-2020 MyCity</p>
        <ul className='list-inline'>
          <li className='list-inline-item'><a href='#'>Privacy</a></li>
          <li className='list-inline-item'><a href='#'>Terms</a></li>
          <li className='list-inline-item'><a href='#'>Support</a></li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
