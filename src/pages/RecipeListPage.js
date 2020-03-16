import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import { api } from "../api";
import LoadingAnimation from "../components/common/LoadingAnimation";
import ErrorAlert from "../components/common/ErrorAlert";
import RecipeList from "../components/RecipeList/RecipeList";
import SearchBar from "../components/RecipeList/SearchBar";

function renderResults(recipes, isLoading, error) {
  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <ErrorAlert />;
  }

  return <RecipeList recipes={recipes} />;
}

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    api.get("/recipes").then(response => {
      const { data, problem } = response;
      setIsLoading(false);
      setRecipes(data);
      setError(problem);
    });
  }, [isLoading]);

  const handleInputChange = e => {
    setSearchString(e.target.value);
  };

  const handleCheckboxChange = e => {
    setIsChecked(e.target.checked);
  };

  const filterRecipes = recipe => {
    const { title, preparationTime } = recipe;
    const isInTimeFrame = !isChecked || preparationTime < 30;
    const containsSearchString =
      title.toLowerCase().indexOf(searchString.toLowerCase()) > -1;

    return isInTimeFrame && containsSearchString;
  };

  const filteredRecipes = recipes.filter(filterRecipes);

  return (
    <Container>
      <h1>Recipe List</h1>
      <SearchBar
        value={searchString}
        isChecked={isChecked}
        onInputChange={handleInputChange}
        onCheckBoxChange={handleCheckboxChange}
      />
      {renderResults(filteredRecipes, isLoading, error)}
    </Container>
  );
};

export default RecipeListPage;
