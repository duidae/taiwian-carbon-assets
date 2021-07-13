import {Component} from "react";
import GoogleMapReact from "google-map-react";
import "./Map.scss";

export class Map extends Component {
    render() {
        return (
            <div className="map">
                <GoogleMapReact defaultCenter={{lat: 24.977707, lng: 121.277557}} defaultZoom={15}>
                </GoogleMapReact>
            </div>
        );
    }
}
