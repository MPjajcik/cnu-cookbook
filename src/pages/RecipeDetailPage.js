import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";

import { api } from "../api";
import RecipeDetail from "../components/RecipeDetail/RecipeDetail";

const RecipeDetailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [directionsInput, setDirectionsInput] = useState("");
  const [timeInput, setTimeInput] = useState(0);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    amount: 0,
    amountUnit: ""
  });
  const [titleInput, setTitleInput] = useState("");

  const { slug } = useParams();

  useEffect(() => {
    api.get(`/recipes/${slug}`).then(response => {
      const { data, problem } = response;
      setIsLoading(false);
      setRecipe(data);
      setError(problem);
    });
  }, [isLoading, slug, isEdited]);

  useEffect(() => {
    recipe && setFilteredIngredients(recipe.ingredients);
  }, [recipe, isEdited]);

  const trashIconClick = (ingredients, id) => {
    const newIngredients = ingredients.filter(
      ingredient => ingredient._id !== id
    );
    setFilteredIngredients(newIngredients);
  };

  const editButtonHandler = () => {
    setIsEdited(true);
  };

  const goBackAction = () => {
    setIsEdited(false);
  };

  const saveButtonHandler = id => {
    const editRecipe = api.post(`/recipes/${id}`, {
      title: titleInput,
      directions: directionsInput,
      ingredients: filteredIngredients,
      preparationTime: timeInput
    });

    return editRecipe;
  };

  const epmtyEditCheck =
    titleInput === "" || directionsInput === "" || titleInput === null;

  const epmtyIngCheck = newIngredient.name === "" || newIngredient.amount < 0;

  const addIngButtonHandler = () => {
    setFilteredIngredients(arr => [...arr, newIngredient]);
  };

  return (
    <Container>
      <RecipeDetail
        isLoading={isLoading}
        recipe={recipe}
        error={error}
        isEdited={isEdited}
        editButtonHandler={editButtonHandler}
        directionsInput={directionsInput}
        setDirectionsInput={setDirectionsInput}
        goBackAction={goBackAction}
        saveButtonHandler={saveButtonHandler}
        trashIconClick={trashIconClick}
        filteredIngredients={filteredIngredients}
        addIngButtonHandler={addIngButtonHandler}
        timeInput={timeInput}
        setTimeInput={setTimeInput}
        setTitleInput={setTitleInput}
        titleInput={titleInput}
        setNewIngredient={setNewIngredient}
        newIngredient={newIngredient}
        epmtyEditCheck={epmtyEditCheck}
        epmtyIngCheck={epmtyIngCheck}
      />
    </Container>
  );
};

export default RecipeDetailPage;
