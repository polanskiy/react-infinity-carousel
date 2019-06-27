import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import Carousel from './Carousel';


const Some = () => {
  const options={
    arrows: true,
    autoPlayInterval: 2000,
    dots: true,
  }
  return ( 
    <Carousel {...options}>
      <div style={{background: 'red', height:200, width: 300}}>red</div>
      <div style={{background: 'blue', height:200, width: 300}}>blue</div>
      <div style={{background: 'green', height:200, width: 300}}>green</div>
    </Carousel>
   );
}
 
export default Some;
// export default Carousel;
ReactDOM.render((
      <Some />
), document.getElementById('root'));
