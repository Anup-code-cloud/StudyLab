import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable Card component with consistent styling
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Whether to show hover effects
 * @param {function} props.onClick - Click handler function
 * @param {string} props.role - ARIA role attribute
 * @param {Object} props.style - Inline styles
 */
export default function Card({ 
  children, 
  className = '', 
  hover = false, 
  onClick, 
  role = 'region',
  style = {},
  ...props 
}) {
  const baseClasses = 'p-4 rounded-lg shadow-md bg-white dark:bg-gray-800';
  const hoverClasses = hover ? 'transition-transform duration-200 hover:shadow-lg hover:-translate-y-0.5' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const combinedClasses = [
    baseClasses,
    hoverClasses,
    clickableClasses,
    className
  ].filter(Boolean).join(' ');

  return React.createElement(
    'div',
    {
      className: combinedClasses,
      onClick,
      role,
      style,
      ...props
    },
    children
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
  role: PropTypes.string,
  style: PropTypes.object,
};

/**
 * CardContent component for structured card content
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.variant - Content variant ('default', 'dense', 'spacious')
 */
export function CardContent({ 
  children, 
  className = '', 
  variant = 'default',
  ...props 
}) {
  const variantClasses = {
    default: 'p-4',
    dense: 'p-2',
    spacious: 'p-6'
  };

  const combinedClasses = [
    variantClasses[variant] || variantClasses.default,
    className
  ].filter(Boolean).join(' ');

  return React.createElement(
    'div',
    {
      className: combinedClasses,
      ...props
    },
    children
  );
}

CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'dense', 'spacious']),
};

// Additional Card sub-components for better structure
export function CardHeader({ children, className = '', ...props }) {
  return React.createElement(
    'div',
    {
      className: `border-b border-gray-200 dark:border-gray-700 pb-3 mb-3 ${className}`,
      ...props
    },
    children
  );
}

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export function CardFooter({ children, className = '', ...props }) {
  return React.createElement(
    'div',
    {
      className: `border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 ${className}`,
      ...props
    },
    children
  );
}

CardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// Example usage component
export function CardExample() {
  return React.createElement(Card, {
    hover: true,
    onClick: () => console.log('Card clicked'),
    className: 'max-w-md mx-auto'
  },
    React.createElement(CardHeader, null,
      React.createElement('h2', { className: 'text-xl font-semibold' }, 'Card Title')
    ),
    React.createElement(CardContent, { variant: 'default' },
      React.createElement('p', null, 'This is the main content of the card with some sample text.')
    ),
    React.createElement(CardFooter, null,
      React.createElement('button', { 
        className: 'bg-blue-500 text-white px-4 py-2 rounded',
        onClick: (e) => {
          e.stopPropagation();
          console.log('Button clicked');
        }
      }, 'Action')
    )
  );
}