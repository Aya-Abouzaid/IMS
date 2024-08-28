// src/components/Breadcrumb.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Breadcrumb.scss';

interface BreadcrumbProps {
  items: { title: string; path: string }[];
}

function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <span key={item.path}>
          {/* Use a unique identifier like the path */}
          <Link to={item.path} className="breadcrumb-item">
            {item.title}
          </Link>
          {index < items.length - 1 && <span className="separator"> / </span>}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;
