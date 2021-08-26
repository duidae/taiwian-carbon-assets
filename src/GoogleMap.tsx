import React from "react";
import {autorun} from "mobx";
import {observer} from "mobx-react";
import GoogleMapReact from "google-map-react";
import "./GoogleMap.scss";

import {AppStore, LayerGeojson} from "./stores";

const TAIPEI_CENTER = {lat: 25.038357847174, lng: 121.54770626982};

@observer
export class GoogleMap extends React.Component<any> {
    private map: any;
    private dataLayerMap: Map<LayerGeojson, google.maps.Data>;

    constructor(props) {
        super(props);

        this.dataLayerMap = new Map<LayerGeojson, google.maps.Data>([]);

        autorun(() => {
            this.showSelectedLayers(AppStore.Instance.selectedLayers);
        });
    }

    private loadGeojsons = () => {
        this.dataLayerMap.clear();
        AppStore.Instance.layerGeojsons?.forEach(layerGeojson => {
            let data = new google.maps.Data();
            const geojson = layerGeojson.replace(/^.*\//, ""); // TODO: delete this when support folder structure
            data.loadGeoJson(geojson);
            data.setStyle((feature: any) => {
                const color = feature.getProperty("status") === "有效" ? "green" : "gray";
                return {
                    fillColor: color,
                    strokeColor: color,
                    clickable: true
                };
            });
            this.dataLayerMap.set(layerGeojson, data);
            console.log(`${geojson} loaded.`);
        });
    };

    private initMap = (map: any, maps: any) => {
        this.map = map;
        this.loadGeojsons();
        this.showSelectedLayers(AppStore.Instance.selectedLayers);
    };

    private showSelectedLayers = (selectedLayers: any) => {
        if (this.map) {
            AppStore.Instance.isLayerSelected?.forEach((isSelected, layerGeojson) => {
                this.dataLayerMap.get(layerGeojson)?.setMap(isSelected ? this.map : null);
            });
        }
    };

    render() {
        return (
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{key: "YOUR_GOOGLE_APP_KEY"}}
                    defaultCenter={TAIPEI_CENTER}
                    defaultZoom={12}
                    options={{streetViewControl: true, mapTypeControl: true}}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({map, maps}) => this.initMap(map, maps)}
                ></GoogleMapReact>
            </div>
        );
    }
}
