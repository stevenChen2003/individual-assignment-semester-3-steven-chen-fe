import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const HallForm = ({ seatPerRow, setSeatPerRow, numRows, setNumRows }) => {
  return (
    <Form>
      <Row className="mb-3">
        <Col>
          <Form.Label>Seats Per Row:</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={seatPerRow}
            onChange={(e) => setSeatPerRow(parseInt(e.target.value, 10))}
          />
        </Col>
        <Col>
          <Form.Label>Number of Rows:</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={numRows}
            onChange={(e) => setNumRows(parseInt(e.target.value, 10))}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default HallForm;





