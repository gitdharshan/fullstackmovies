import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../UIELEMENTS/Avatar';
import Card from '../UIELEMENTS/Card';
import './Useritem.css';

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/movies`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>{props.movieCount} {props.movieCount === 1 ? 'Movie' : 'Movies'}</h3> 
     
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
