// 代码生成时间: 2025-10-12 03:29:17
 * Example usage:
 * <BreadcrumbNav crumbs={[{ text: 'Home', href: '/' }, { text: 'Products', href: '/products' }]} />
 */

import React from 'react';

const BreadcrumbNav = ({ crumbs }) => {
  // Check if crumbs is an array and not empty
  if (!Array.isArray(crumbs) || crumbs.length === 0) {
    return null;
  }

  // Render each breadcrumb item
  const renderItems = crumbs.map((crumb, index) => {
    return (
      <li key={index} className="breadcrumb-item">
        <a href={crumb.href}>{crumb.text}</a>
      </li>
    );
  });

  // Render the breadcrumb navigation
  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        {renderItems}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
