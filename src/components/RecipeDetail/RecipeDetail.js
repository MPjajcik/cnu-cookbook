import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import LoadingAnimation from "../common/LoadingAnimation";
import ErrorAlert from "../common/ErrorAlert";
import PreaparationTime from "../common/PreparationTime";
import RecipeIngredients from "./RecipeIngredients";
import RecipeDirections from "./RecipeDirections";

const RecipeDetail = ({
  isLoading,
  recipe,
  error,
  isEdited,
  editButtonHandler,
  directionsInput,
  setDirectionsInput,
  goBackAction,
  saveButtonHandler,
  trashIconClick,
  filteredIngredients,
  addIngButtonHandler,
  timeInput,
  setTimeInput,
  titleInput,
  setTitleInput,
  newIngredient,
  setNewIngredient,
  epmtyEditCheck,
  epmtyIngCheck
}) => {
  const location = useHistory();
  const { preparationTime, title, directions, _id } = recipe || {};

  if (error) {
    return <ErrorAlert />;
  }
  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (!recipe) {
    return null;
  }

  const renderButtons = () => {
    if (isEdited) {
      return (
        <div>
          <Button
            type="button"
            disabled={epmtyEditCheck}
            className="backButton btn btn-secondary"
            onClick={async () => {
              const editRecipe = await saveButtonHandler(_id);
              location.push(`/recipe/${editRecipe.data.slug}`);
              goBackAction();
            }}
          >
            <i className="fa fa-floppy-o" aria-hidden="true"></i>
          </Button>
          <Button
            type="button"
            className="backButton btn btn-secondary"
            onClick={goBackAction}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </Button>
        </div>
      );
    }
    return (
      <div>
        <Button
          type="button"
          className="backButton btn btn-secondary"
          onClick={() => {
            editButtonHandler();
            setDirectionsInput(directions);
            setTimeInput(preparationTime);
            setTitleInput(title);
          }}
        >
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </Button>
        <Button
          type="button"
          className="backButton btn btn-secondary"
          onClick={() => location.push("/recipes")}
        >
          <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>
        </Button>
      </div>
    );
  };

  const renderTitle = () => {
    if (isEdited) {
      return (
        <div className="editTitleDetail">
          <div className="titleInputParagraph">
            <p>Title: </p>
            <input
              className="titleInput"
              value={titleInput}
              onChange={e => setTitleInput(e.target.value)}
            />
          </div>
          {renderButtons()}
        </div>
      );
    }
    return (
      <div className="titleDetail">
        <h1>{title}</h1>
        {renderButtons()}
      </div>
    );
  };

  return (
    <Jumbotron>
      {renderTitle()}
      <PreaparationTime
        time={preparationTime}
        isEdited={isEdited}
        timeInput={timeInput}
        setTimeInput={setTimeInput}
      />
      <RecipeDirections
        directions={directions}
        isEdited={isEdited}
        setDirectionsInput={setDirectionsInput}
        directionsInput={directionsInput}
      />
      <RecipeIngredients
        trashIconClick={trashIconClick}
        filteredIngredients={filteredIngredients}
        isEdited={isEdited}
        addIngButtonHandler={addIngButtonHandler}
        setNewIngredient={setNewIngredient}
        newIngredient={newIngredient}
        epmtyIngCheck={epmtyIngCheck}
      />
    </Jumbotron>
  );
};

export default RecipeDetail;
