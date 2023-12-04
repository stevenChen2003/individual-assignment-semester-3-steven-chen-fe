import React, { useEffect, useState } from 'react';
import CinemaSelect from '../../components/adminComponents/CinemaSelect';
import CinemaApi from '../../api/CinemaApi';
import CinemaButtons from '../../components/adminComponents/CinemaButtons';
import { Button } from 'react-bootstrap';
import CinemaAddForm from '../../components/adminComponents/CinemaAddForm';
import CinemaEditForm from '../../components/adminComponents/CinemaEditForm';
import HallApi from '../../api/HallApi';
import { Link } from 'react-router-dom';

const CinemaPage = () => {
 const [cinemas, setCinemas] = useState([]);
 const [cinema, setCinema] = useState({
  cinemaId: '',
  name: '',
  location: '',
  amountOfHalls: ''
 });
 const [show, setShow] = useState(false);
 const [showEdit, setShowEdit] = useState(false);
 const [halls, setHalls] = useState([]);


 

 const handleSelect = (selectedCinemaId) => {
  if (selectedCinemaId) {
    CinemaApi.getCinema(selectedCinemaId)
      .then((response) => {
        console.log(response);
        setCinema({
          cinemaId: response.cinemaId,
          name: response.name,
          location: response.location,
          amountOfHalls: response.amountOfHalls
        });
        HallApi.getHallsByCinema(selectedCinemaId)
        .then(response => {
          console.log(response);
          setHalls(response);
        })


      })
      .catch((error) => {
        console.error('Error fetching cinema details:', error);
      });
  } else {
    setCinema({
      cinemaId: '',
      name: '',
      location: '',
      amountOfHalls: ''
    });
  }
 };

 const handleGetCinemas = () => {
  CinemaApi.getCinemas()
  .then((response) => {
    setCinemas(response);
    console.log(response);
  })
  .catch((error) => {
    console.error('Error fetching cinemas:', error);
  });

 }

 const handleDelete = () => {
  CinemaApi.deleteCinema(cinema.cinemaId)
    .then(() => {
      setCinema({
        cinemaId: '',
        name: '',
        location: '',
        amountOfHalls: ''

      })
      handleGetCinemas();
    })
    .catch((error) => {
      console.error('Error deleting cinema:', error);
    });
};


 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

 const handleShowEdit = () => setShowEdit(true);
 const handleCloseEdit = () => setShowEdit(false);


 

 useEffect(() => {
  handleGetCinemas();
 }, [cinema]);

 return (
  <div className='container mt-4'>
    <div className='row'>
      <div className='col-md-5 d-flex'>
        <div className='col-md-9'>
          <CinemaSelect cinemas={cinemas} onSelect={handleSelect} selectedCinema={cinema} />
          <div className='mt-2'>
            <Button variant='primary' onClick={handleShow}>
              Add Cinema
            </Button>
          </div>
        </div>
        {cinema.cinemaId && (
          <div className='col-md-3'>
            <CinemaButtons onEdit={handleShowEdit} onDelete={handleDelete} />
          </div>
        )}
        <div>
        </div>
      </div>
      
      <div className='col-md-7'>
      {cinema.name != '' && (
        <div className='vh-100'>
          <h2>{cinema.name}</h2>
          <div className="border border-dark h-75">

            {/*Need to make a hallItem comp and maybe list*/}
            <div className="m-2">
                <Button as={Link} to={`/admin/hall/${cinema.cinemaId}`} className="m-2" variant="secondary" style={{ width: '120px', height: '120px' }}>
                  + Add Hall
                </Button>
              {halls.map(hall => (
                <Button className="m-2" variant="secondary" style={{ width: '120px', height: '120px' }} key={hall.hallId}>
                  Hall number: {hall.hallNumber}
                </Button>
              ))}
            </div>
          </div>

        </div>
      )}
      </div>
    </div>

    {/*Modal form*/}
    <CinemaAddForm show={show} handleClose={handleClose} onGetCinemas={handleGetCinemas}/>
    <CinemaEditForm show={showEdit} handleClose={handleCloseEdit} onGetCinemas={handleGetCinemas} selectCinema={cinema}/>
  </div>
 );
};

export default CinemaPage;
