import React from 'react';
import { Button } from 'react-bootstrap';
import { Trash, Pen } from 'react-bootstrap-icons';

const CinemaButtons = ({ onEdit, onDelete }) => {
   return (
       <div>
           <Button onClick={onEdit}>
              <Pen />
           </Button>
           <Button onClick={onDelete} variant='danger'>
              <Trash />
           </Button>
       </div>
   );
};

export default CinemaButtons;

