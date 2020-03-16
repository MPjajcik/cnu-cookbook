import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const SearchBar = ({ value, isChecked, onInputChange, onCheckBoxChange }) => {
  return (
    <Form>
      <Form.Group controlId="formSearch">
        <Form.Control
          type="text"
          value={value}
          onChange={onInputChange}
          placeholder="Search recipe"
        />
      </Form.Group>
      <Form.Group controlId="formTime">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={onCheckBoxChange}
          label="Ready in less than 30 minutes"
        />
      </Form.Group>
    </Form>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCheckBoxChange: PropTypes.func.isRequired
};

SearchBar.defaulProps = {
  value: "",
  isChecked: false
};

export default SearchBar;
