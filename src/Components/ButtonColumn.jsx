import React from 'react';
import { Link } from 'react-router-dom';

const ButtonColumn = ({ items, buttonText, linkPrefix }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <Link to={`/${linkPrefix}/${item}`}>
            <button> {buttonText} {item.toString()}</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ButtonColumn;