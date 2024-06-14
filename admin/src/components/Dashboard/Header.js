
import { Link } from '@mui/material';
import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Header({ OpenSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className='header'>
      <h2 style={{ color: '#02A95C' }}>Admin Dashboard</h2>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>

      <div className='header-right' style={{ display: 'flex', columnGap: '10px', justifyContent: 'center', alignItems: 'center' }}>
        <Link style={{ textDecoration: 'none', cursor: 'pointer', color: '#02A95C' }} onClick={handleLogout}>Logout</Link>
        <BsPersonCircle className='icon' />
      </div>
    </header>
  );
}

export default Header;
