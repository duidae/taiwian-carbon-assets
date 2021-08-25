import React from "react";
import {autorun} from "mobx";
import {observer} from "mobx-react";
import GoogleMapReact from "google-map-react";
import "./GoogleMap.scss";

import {AppStore} from "./stores";

const TAIPEI_CENTER = {lat: 25.038357847174, lng: 121.54770626982};

@observer
export class GoogleMap extends React.Component<any> {
    private map: any;
    private dataLayerMap: Map<string, google.maps.Data>;

    constructor(props) {
        super(props);

        this.dataLayerMap = new Map<string, google.maps.Data>([]);

        autorun(() => {
            this.showSelectedDataLayer(AppStore.Instance.selectedDataLayers);
        });
    }

    private loadGeojsons = () => {
        this.dataLayerMap.clear();
        AppStore.Instance.dataLayerGeojsonMap?.forEach((geojson, dataLayer) => {
            let data = new google.maps.Data();
            data.loadGeoJson(geojson);
            data.setStyle((feature: any) => {
                const color = feature.getProperty("status") === "有效" ? "green" : "gray";
                return {
                    fillColor: color,
                    strokeColor: color,
                    clickable: true
                };
            });
            this.dataLayerMap.set(dataLayer, data);
            console.log(`${dataLayer}(${geojson}) loaded.`);
        });
    };

    private initMap = (map: any, maps: any) => {
        this.map = map;
        this.loadGeojsons();
    };

    private showSelectedDataLayer = (selectedDataLayers: any) => {
        if (this.map) {
            AppStore.Instance.isDataLayerSelected?.forEach((isSelected, dataLayer) => {
                this.dataLayerMap.get(dataLayer)?.setMap(isSelected ? this.map : null);
            });
        }
    };

    render() {
        return (
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{key: "YOUR_GOOGLE_APP_KEY"}}
                    defaultCenter={TAIPEI_CENTER}
                    defaultZoom={13}
                    options={{streetViewControl: true, mapTypeControl: true}}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({map, maps}) => this.initMap(map, maps)}
                ></GoogleMapReact>
            </div>
        );
    }
}
