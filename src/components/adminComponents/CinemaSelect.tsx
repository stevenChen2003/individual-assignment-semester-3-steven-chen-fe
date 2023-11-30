import React, { useState } from 'react';
import Select from 'react-select';

const CinemaSelect = ({ cinemas, onSelect }) => {
  const options = cinemas.map((cinema) => ({
    value: cinema.cinemaId, // Assuming cinemaId is the property representing the ID
    label: cinema.name,
  }));

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (selectedOption) => {
    setSelectedOption(selectedOption);

    // Use selectedOption directly instead of selectedCinema from the state
    if (selectedOption) {
      onSelect(selectedOption.value);
    } else {
      onSelect(null);
    }
  };

  return (
    <div>
      <Select
        value={selectedOption}
        isClearable={true}
        onChange={handleSelect}
        options={options}
        getOptionValue={(option) => option.value} // Ensure the correct property is used
      />
    </div>
  );
};

export default CinemaSelect;




