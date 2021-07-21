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

        map.data.loadGeoJson("testGeojson.json");

        let infoWindow = new google.maps.InfoWindow();
        map.data.addListener("click", (event: any) => {
            infoWindow.close();
            infoWindow = new google.maps.InfoWindow({position: event.latLng, content: event.feature.getProperty("query")});
            infoWindow.open(map);
        });
    };

    render() {
        return (
            <div className="map">
                <GoogleMapReact
                    defaultCenter={{lat: 24.985892654871, lng: 121.55384976076}}
                    defaultZoom={17}
                    options={{streetViewControl: true, mapTypeControl: true}}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({map, maps}) => this.loadGeojson(map, maps)}
                >
                </GoogleMapReact>
            </div>
        );
    }
}
