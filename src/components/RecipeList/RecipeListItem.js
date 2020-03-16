import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import PreaparationTime from "../common/PreparationTime";

const RecipeListItem = ({ title, time, slug, sideDish }) => {
  return (
    <Col xs="13" sm="7" md="5" lg="4" className="recipe">
      <Link to={`/recipe/${slug}`}>
        <Card>
          <Card.Header>
            <span>
              <span className="recipeName">
                <i className="fa fa-cutlery"></i>
              </span>
              <span className="recipe-title">{title}</span>
            </span>
            <br />
            <span className="sideDish">
              <span>
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
              </span>
              <span className="recipe-title">
                {sideDish === undefined
                  ? "Libovolná nebo žádná příloha"
                  : sideDish}
              </span>
            </span>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <span>
                <i className="fa fa-clock-o"></i>
              </span>
              <span className="recipe-text">
                <PreaparationTime time={time} />
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

RecipeListItem.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};

export default RecipeListItem;
