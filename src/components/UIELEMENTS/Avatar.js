import React from 'react';
import './Avatar.css';

const Avatar = (props) => {
  return (
    <div className={`avatar ${props.className || ''}`} style={props.style}> 
      <img 
        src={props.image}
        alt={props.alt}
        style={{ width: props.width || '50px', height: props.width || '50px' }} // ✅ Ensure width has a default value
      />
    </div>
  );
};

export default Avatar;
