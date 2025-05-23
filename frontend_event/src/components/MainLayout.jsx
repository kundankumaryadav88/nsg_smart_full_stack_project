import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUsers,
  FaEnvelope,
  FaCog,
  FaCalendarCheck,
  FaUserCircle,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { Link, Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/dashboard', label: 'Events', icon: <FaCalendarCheck /> },
    { path: '/', label: 'Peoples', icon: <FaUsers /> },
    { path: '/', label: 'Messages', icon: <FaEnvelope /> },
    { path: '/', label: 'Calendar', icon: <FaCalendarAlt /> },
    { path: '/', label: 'Settings', icon: <FaCog /> }
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="layout">
      <header className="mobile-header">
        <button onClick={toggleSidebar} className="hamburger-btn" aria-label="Toggle menu">
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <h2 className="logo">XYZ LOGO</h2>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="profile-section">
          <FaUserCircle className="profile-icon" />
          <span className="profile-name">Kundan</span>
        </div>
      </aside>

      <main className="main-content" onClick={() => sidebarOpen && setSidebarOpen(false)}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
