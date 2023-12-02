import React, { useState } from 'react';
import Select from 'react-select';

const CinemaSelect = ({ cinemas, onSelect }) => {
  const options = cinemas.map((cinema) => ({
    value: cinema.cinemaId,
    label: cinema.name,
  }));

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
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
        getOptionValue={(option) => option.value}
      />
    </div>
  );
};

export default CinemaSelect;




