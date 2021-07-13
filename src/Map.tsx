import {Component} from 'react';
import GoogleMapReact from 'google-map-react';

export class Map extends Component {
  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          defaultCenter={{lat: 59.95, lng: 30.33}}
          defaultZoom={11}
        >
        </GoogleMapReact>
      </div>
    );
  }
}
