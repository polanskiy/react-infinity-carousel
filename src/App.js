import React from 'react';
import Carousel from './Carousel/Carousel'

const App  = () => {
  const options = {
    autoPlayInterval: 1000
  }
  return ( 
    <Carousel {...options}>
      <div style={{width: 200, height: 150, background: 'red'}}></div>
      <div style={{width: 200, height: 150, background: 'blue'}}></div>
      <div style={{width: 200, height: 150, background: 'green'}}></div>
    </Carousel>
   );
}
 
export default App;