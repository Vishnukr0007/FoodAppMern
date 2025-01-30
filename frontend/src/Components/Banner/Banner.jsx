import React from 'react';
import { Container } from 'react-bootstrap';
import cock2 from '../../images/cok2.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Banner.css';

function Banner() {
  return (
    <div
      className="banner d-flex align-items-center justify-content-center"
      style={{ backgroundImage: `url(${cock2})` }}
    >
      <Container>
        <h1 className="text-center text-white">Menu</h1>
        <h4 className="text-center text-white">Please take at our menu featuring food,drinks,and brunch.if you'd like to <br />
        place an order,use the 'order Online' button located below the menu
        </h4>
      </Container>
    </div>
  );
}

export default Banner;
