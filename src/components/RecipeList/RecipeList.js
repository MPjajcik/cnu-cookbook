import React from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import RecipeListItem from "./RecipeListItem";

const RecipeList = ({ recipes }) => {
  return (
    <Row>
      {recipes.map(({ _id, title, preparationTime, slug, sideDish }) => {
        return (
          <RecipeListItem
            key={_id}
            title={title}
            time={preparationTime}
            slug={slug}
            sideDish={sideDish}
          />
        );
      })}
    </Row>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeList;
