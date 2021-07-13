import {Component} from "react";
import GoogleMapReact from "google-map-react";
import "./Map.scss";

export class Map extends Component {
    render() {
        return (
            <div className="map">
                <GoogleMapReact defaultCenter={{lat: 59.95, lng: 30.33}} defaultZoom={11}>
                </GoogleMapReact>
            </div>
        );
    }
}
