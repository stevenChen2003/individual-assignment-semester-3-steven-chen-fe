import React, { useEffect, useState } from 'react';
import CinemaSelect from '../../components/adminComponents/CinemaSelect';
import CinemaApi from '../../api/CinemaApi';
import CinemaButtons from '../../components/adminComponents/CinemaButtons';

const CinemaPage = () => {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [cinema, setCinema] = useState([]);

  const handleSelect = (selectedCinemaId) => {
    console.log(selectedCinemaId);
    setSelectedCinema(selectedCinemaId);

    if (selectedCinemaId) {
      // If a cinema is selected, fetch its details
      CinemaApi.getCinema(selectedCinemaId)
        .then((response) => {
          setCinema(response);
          console.log(response);
        })
        .catch((error) => {
          console.error('Error fetching cinema details:', error);
        });
    } else {
      // If no cinema is selected, clear the cinema details
      setCinema([]);
    }
  };

  const handleEdit = (cinema) => {
    // Add your edit logic here
  };

  const handleDelete = () => {
    console.log(selectedCinema);
    // Add your delete logic here
  };

  useEffect(() => {
    CinemaApi.getCinemas()
      .then((response) => {
        setCinemas(response);
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching cinemas:', error);
      });
  }, []);

  return (
    <div className='container-fluid m-4'>
      <div className='row'>
        <div className='col-md-5 d-flex'>
          <div className='col-md-9'>
            <CinemaSelect cinemas={cinemas} onSelect={handleSelect} />
          </div>
          {selectedCinema && (
            <div className='col-md-3'>
              <CinemaButtons onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          )}
        </div>
        <div className='col-md-7'>
          {cinema && (
            <div>
              <h2>{cinema.name}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CinemaPage;


