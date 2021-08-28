import React from "react";
import {autorun} from "mobx";
import {observer} from "mobx-react";
import GoogleMapReact from "google-map-react";
import "./GoogleMap.scss";

import {AppStore, LayerGeojson} from "./stores";

const TAIPEI_CENTER = {lat: 25.026054, lng: 121.543439};

enum LayerType {
    Border,
    Building,
    PublicAsset,
    GreenFacility,
    Others
}

const LAYER_STYLE_MAP = new Map<LayerType, any>([
    [
        LayerType.Border,
        {
            strokeColor: "green",
            strokeWeight: 5,
            fillOpacity: 0,
            clickable: false
        }
    ],
    [
        LayerType.Building,
        {
            strokeColor: "gray",
            fillColor: "gray",
            clickable: false
        }
    ],
    [
        LayerType.PublicAsset,
        {
            strokeColor: "darkGoldenRod",
            fillColor: "darkGoldenRod",
            clickable: false
        }
    ],
    [
        LayerType.GreenFacility,
        {
            strokeColor: "green",
            fillColor: "green",
            clickable: false
        }
    ],
    [
        LayerType.Others,
        {
            strokeColor: "green",
            strokeWeight: 5,
            fillOpacity: 0,
            clickable: false
        }
    ]
]);

const FindLayerStyle = (jsonName: string): LayerType => {
    if (jsonName.includes("界")) {
        return LayerType.Border;
    } else if (jsonName.includes("建物")) {
        return LayerType.Building;
    } else if (jsonName.includes("公有")) {
        return LayerType.PublicAsset;
    } else if (jsonName.includes("光電")) {
        return LayerType.GreenFacility;
    }
    return LayerType.Others;
};

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
                return LAYER_STYLE_MAP.get(FindLayerStyle(geojson) ?? LayerType.Others);
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
                    defaultZoom={14}
                    options={{streetViewControl: true, mapTypeControl: true}}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({map, maps}) => this.initMap(map, maps)}
                ></GoogleMapReact>
            </div>
        );
    }
}
