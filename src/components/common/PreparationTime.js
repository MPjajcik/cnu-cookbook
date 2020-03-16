import React from "react";
import PropTypes from "prop-types";

const PreaparationTime = ({ time, isEdited, timeInput, setTimeInput }) => {
  const timeToMins = () => {
    const hours = Math.floor(time / 60);
    const minutes = time - hours * 60;
    if (hours === 0) {
      return <span>{minutes} minutes</span>;
    }

    if (minutes === 0) {
      if (hours === 1) {
        return <span>{hours} hour</span>;
      }
      return <span>{hours} hours</span>;
    }

    return (
      <span>
        {hours === 1 ? `${hours} hour` : `${hours} hours`} {minutes} minutes
      </span>
    );
  };

  const renderPreparationTime = () => {
    if (isEdited) {
      return (
        <span>
          <strong>Preparation time: </strong>
          <input
            value={timeInput}
            type="number"
            onChange={e => setTimeInput(e.target.value)}
          />
        </span>
      );
    }
    return (
      <span>
        <strong>Preparation time: </strong>
        {timeToMins()}
      </span>
    );
  };

  return <span>{renderPreparationTime()}</span>;
};

PreaparationTime.propTypes = {
  time: PropTypes.number.isRequired
};

PreaparationTime.defaultProps = {
  time: 0
};

export default PreaparationTime;
