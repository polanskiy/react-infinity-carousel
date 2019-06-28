# react-infinity-carousel
Infinity carousel for react apps
## Installation
```
npm i react-infinity-carousel --save-dev
```
## New Version with hooks
```
https://www.npmjs.com/package/react-web-tools
```
## Usage
```
import Carousel from 'react-infinity-carousel';

class App extends Component {
  render() {
    const options = {
      autoPlayInterval: 1000
    }
    return (
      <div className="App">
        <header className="App-header">
          <Carousel {...options}>
            <div style={{width: 200, height: 150, background: 'red'}}></div>
            <div style={{width: 200, height: 150, background: 'blue'}}></div>
            <div style={{width: 200, height: 150, background: 'green'}}></div>
          </Carousel>
        </header>
      </div>
    );
  }
}
```
## Options
```
const options = {
  autoPlayInterval: 1000, // default value: 3000
  arrows: false, // default value: true
  dots: false, // default value: true
  transitionDuration: .9 // default value: .5
  initialSlide: 2 // default value: 1
  className: 'yourClassName' // default value: 'carousel'
}
```

## Arrows

Arrows have classNames: 'prev' and 'next'

## Dots

Dots have className: 'dots'