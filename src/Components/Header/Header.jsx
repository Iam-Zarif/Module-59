import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='d-flex justify-content-between'>
            <Link to='/ '>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Link to='/register-rbs'>RegisterRBS</Link>
            <Link to='/register-bs'>RegisterBS</Link>
        </div>
    );
};

export default Header;