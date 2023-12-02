import React, { useState } from 'react';
import Select from 'react-select';

const CinemaSelect = ({ cinemas, onSelect, selectedCinema }) => {
  const options = cinemas.map((cinema) => ({
    value: cinema.cinemaId,
    label: cinema.name,
  }));

  const handleSelect = (selectedOption) => {
    if (selectedOption) {
      onSelect(selectedOption.value);
    } else {
      onSelect(null);
    }
  };

  return (
    <div>
      <Select
        value={{ label: selectedCinema.name, value: selectedCinema.cinemaId }}
        isClearable={true}
        onChange={handleSelect}
        options={options}
        getOptionValue={(option) => option.value}
      />
    </div>
  );
};

export default CinemaSelect;




