import React from 'react';
import {React_Boostrap_Carousel} from 'react-boostrap-carousel';

  class Slider extends React.Component {
    render() {
      return(
        <div className="carousel slide">
          <React_Boostrap_Carousel animation={true} className="carousel-inner">
            <div className='item active'>
              <img className='fill' src="../images/animal.jpg" role="presentation"/>
              <div className="carousel-caption">
                <h1>3D Animal</h1>
              </div>
            </div>
            <div className='item'>
              <img className='fill' src="../images/roundel.jpg" role="presentation"/>
              <div className="carousel-caption">
                <h1>Target (Roundel)</h1>
              </div>
            </div>
            <div className='item'>
              <img className='fill' src="../images/face.jpg" role="presentation"/>
              <div className="carousel-caption">
                <h1>Paper Face</h1>
              </div>
            </div>
            <div className='item'>
              <img className='fill' src="../images/indoor.jpg" role="presentation"/>
              <div className="carousel-caption">
                <h1>Indoor Range</h1>
              </div>
            </div>
          </React_Boostrap_Carousel>
        </div>
      )
    }
  };

export default Slider;