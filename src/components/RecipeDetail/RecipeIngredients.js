import React from "react";
import { Form, Button } from "react-bootstrap";

const RecipeIngredients = ({
  trashIconClick,
  filteredIngredients,
  isEdited,
  addIngButtonHandler,
  newIngredient,
  setNewIngredient,
  epmtyIngCheck
}) => {
  const renderIngredients = () => {
    if (isEdited) {
      return (
        <div>
          {filteredIngredients.map((ingredient, key) => {
            const { name, amount, amountUnit, _id } = ingredient;
            return (
              <div className="ingredientsDiv" key={key}>
                <i
                  className="removeIng fa fa-trash"
                  aria-hidden="true"
                  onClick={() => trashIconClick(filteredIngredients, _id)}
                  cursor="pointer"
                  key={key}
                />
                {amount !== 0 ? (
                  <li key={key}>
                    {name} {amount} {amountUnit}
                  </li>
                ) : (
                  <li key={key}>{name}</li>
                )}
              </div>
            );
          })}
          <Form className="form-check-inline">
            <Form.Group controlId="formIngredientName">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={e =>
                  setNewIngredient({ ...newIngredient, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formIngredientAmount">
              <Form.Control
                type="number"
                placeholder="Amount"
                onChange={e =>
                  setNewIngredient({ ...newIngredient, amount: e.target.value })
                }
                min={0}
                defaultValue={0}
                pattern={[0 - 9]}
              />
            </Form.Group>
            <Form.Group controlId="formIngredientUnit">
              <Form.Control
                type="text"
                placeholder="Unit"
                onChange={e =>
                  setNewIngredient({
                    ...newIngredient,
                    amountUnit: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group className="addIngButton">
              <Button
                onClick={() => addIngButtonHandler()}
                disabled={epmtyIngCheck}
              >
                <i className="fa fa-plus" aria-hidden="true" />
              </Button>
            </Form.Group>
          </Form>
        </div>
      );
    }
    return filteredIngredients.map((ingredient, key) => {
      const { name, amount, amountUnit } = ingredient;
      return amount !== 0 ? (
        <li key={key}>
          {name} {amount} {amountUnit}
        </li>
      ) : (
        <li key={key}>{name}</li>
      );
    });
  };

  return (
    <div>
      <h3>Ingredients</h3>
      <ul className="ingredientsList">{renderIngredients()}</ul>
    </div>
  );
};

export default RecipeIngredients;
