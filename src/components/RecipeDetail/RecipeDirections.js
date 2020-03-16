import React from "react";

const RecipeDirections = ({
  directions,
  isEdited,
  directionsInput,
  setDirectionsInput
}) => {
  const renderDirections = () => {
    if (directions !== undefined) {
      const newDirs = directions.split("\n");
      return newDirs.map((direction, key) => {
        return (
          <li className="dirItem" key={key}>
            {direction}
          </li>
        );
      });
    }
    return <p>No directions</p>;
  };

  const renderEditArea = () => {
    return (
      <textarea
        className="editDirections form-control"
        aria-label="Directions Edit"
        value={directionsInput}
        onChange={e => setDirectionsInput(e.target.value)}
      ></textarea>
    );
  };
  return (
    <div>
      <h3>Directions</h3>
      <div>
        {isEdited ? (
          renderEditArea()
        ) : (
          <ul className="dirList">{renderDirections()}</ul>
        )}
      </div>
    </div>
  );
};

export default RecipeDirections;
