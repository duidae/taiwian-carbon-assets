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

        map.data.loadGeoJson("renewalGeojson.json");

        let infoWindow = new google.maps.InfoWindow();
        map.data.addListener("click", (event: any) => {
            const content = `${event.feature.getProperty("id")}<br>${event.feature.getProperty("type")}<br>${event.feature.getProperty("status")}`;
            infoWindow.close();
            infoWindow = new google.maps.InfoWindow({position: event.latLng, content: content});
            infoWindow.open(map);
        });
    };

    render() {
        return (
            <div className="map">
                <GoogleMapReact
                    defaultCenter={{lat: 25.036963137555553, lng: 121.52847908553798}}
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
