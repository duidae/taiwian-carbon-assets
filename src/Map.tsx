import {Component} from "react";
import GoogleMapReact from "google-map-react";
import "./Map.scss";

export class Map extends Component {
    private loadGeojson = (map: any, maps: any) => {
        map.data.setStyle({
            fillColor: "green",
            strokeColor: "green",
            clickable: true
        });

        map.data.loadGeoJson(
            "testGeojson.json"
        );
    };

    render() {
        return (
            <div className="map">
                <GoogleMapReact
                    defaultCenter={{lat: 24.985892654871, lng: 121.55384976076}}
                    defaultZoom={17}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({map, maps}) => this.loadGeojson(map, maps)}
                >
                </GoogleMapReact>
            </div>
        );
    }
}
