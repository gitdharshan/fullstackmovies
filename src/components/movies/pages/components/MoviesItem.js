import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../UIELEMENTS/Card";
import Button from "../../../../shared/FormElements/Button";
import Modal from "../../../UIELEMENTS/Modal";
import ErrorModal from "../../../UIELEMENTS/ErrorModal";
import LoadingSpinner from "../../../UIELEMENTS/LoadingSpinner";
import "./MoviesItem.css";
import { AuthContext } from "../../../../shared/context/auth-context";
import { useHttpClient } from "../../../../shared/hooks/http-hook";

const MoviesItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const editHandler = () => {
    navigate(`/movies/${props.id}`); // Ensure props.id is correctly passed
  };

  const showDeleteWarning = () => {
    setShowConfirmModal(true);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
  };

 
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(`http://localhost:5000/api/movies/${props.id}`, 'DELETE');
      props.onDelete(props.id); // Update UI immediately
    } catch (err) {}
  };
  

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDelete}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDelete}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </React.Fragment>
        }
      >
        <p>Do you want to delete this movie?</p>
      </Modal>

      <li className="movie-item">
        <Card className="movie-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="movie-item__image">
            <img src={props.image} alt={props.movie_name} />
          </div>
          <div className="movie-item__info">
            <h2>{props.movie_name}</h2>
            <h3>{props.year}</h3>
            <p>Rating: {props.rating}</p>
            <p>{props.description}</p>
          </div>
          <div className="movie-item__actions">
            {auth.isLoggedIn && <Button onClick={editHandler}>Edit</Button>}
            {auth.isLoggedIn && <Button danger onClick={showDeleteWarning}>Delete</Button>}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default MoviesItem;
