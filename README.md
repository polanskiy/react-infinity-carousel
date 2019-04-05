# react-infinity-carousel
Infinity carousel for react apps

## Usage
```
import Carousel from 'react-infinity-carousel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Carousel>
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
