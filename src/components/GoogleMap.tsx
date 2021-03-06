import React from "react";
import {autorun} from "mobx";
import {observer} from "mobx-react";
import GoogleMapReact from "google-map-react";
import "./GoogleMap.scss";

import {AppStore, LayerGeojson} from "stores";
import {FindLayerStyleByName, LayerType, TAIPEI_CENTER, SITE_INFO} from "models";

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
        LayerType.PublicBuilding,
        {
            strokeColor: "darkGray",
            fillColor: "darkGray",
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
            fillColor: "green"
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

@observer
export class GoogleMap extends React.Component<any> {
    private map: any;
    private dataLayerMap: Map<LayerGeojson, google.maps.Data>;

    constructor(props) {
        super(props);

        this.dataLayerMap = new Map<LayerGeojson, google.maps.Data>([]);

        autorun(() => {
            this.moveCenterTo(AppStore.Instance.selectedAreaCenterAndZoom);
        });

        autorun(() => {
            this.showSelectedLayers(AppStore.Instance.selectedLayers);
        });
    }

    private loadGeojsons = (map: any) => {
        this.dataLayerMap.clear();
        AppStore.Instance.layerGeojsons?.forEach(layerGeojson => {
            let data = new google.maps.Data();
            const geojson = layerGeojson.replace(/^.*\//, ""); // TODO: delete this when support folder structure
            data.loadGeoJson(geojson);
            const layerType = FindLayerStyleByName(geojson);
            data.setStyle((feature: any) => {
                return LAYER_STYLE_MAP.get(layerType ?? LayerType.Others);
            });
            if (layerType === LayerType.GreenFacility) {
                data.addListener("click", (event: any) => {
                    const feature = event.feature;
                    const category = feature.getProperty("??????");
                    const name = feature.getProperty("??????");
                    const capacity = feature.getProperty("????????????-???");
                    const content = `${category ? `${category}<br/>` : ""}${name ? `${name}<br/>` : ""}${capacity ? `${capacity} ???` : ""}`;
                    const clickInfoWindow = new google.maps.InfoWindow({position: event.latLng, content: content});
                    clickInfoWindow.open({map: map, shouldFocus: false});
                });
                // TODO: Hover event
                /*
                // let mouseoverInfoWindow = new google.maps.InfoWindow();
                let mouseoverInfoWindow: any;
                data.addListener("mouseover", (event: any) => {
                    const content = `${event.feature.getProperty("??????")}<br>${event.feature.getProperty("??????")}<br>????????????: ${event.feature.getProperty("????????????-???")} ???`;
                    // mouseoverInfoWindow.setContent(content);
                    // mouseoverInfoWindow.setPosition(event.latLng);
                    mouseoverInfoWindow = new google.maps.InfoWindow({position: event.latLng, content: content});
                    mouseoverInfoWindow.open({map: map, shouldFocus: false});
                });
                data.addListener("mouseout", (event: any) => {
                    mouseoverInfoWindow?.close();
                });
                */
            } else if (layerType === LayerType.Matching) {
                data.addListener("click", (event: any) => {
                    const feature = event.feature;
                    const caseID = feature.getProperty("caseID");
                    const siteInfo = SITE_INFO.get(caseID);
                    AppStore.Instance.selectCaseID(caseID);
                    const clickInfoWindow = new google.maps.InfoWindow({position: event.latLng, content: siteInfo.name});
                    clickInfoWindow.open({map: map, shouldFocus: false});
                });
            }
            this.dataLayerMap.set(layerGeojson, data);
            console.log(`${geojson} loaded.`);
        });
    };

    private initMap = (map: any, maps: any) => {
        this.map = map;
        this.loadGeojsons(map);
        this.showSelectedLayers(AppStore.Instance.selectedLayers);
    };

    private moveCenterTo = (centerAndZoom: {center: {lat: number; lng: number} | undefined; zoom: number | undefined}) => {
        if (this.map && centerAndZoom?.center && centerAndZoom?.zoom) {
            this.map.setZoom(centerAndZoom.zoom);
            this.map.panTo(centerAndZoom.center);
        }
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
                    defaultCenter={AppStore.Instance.selectedAreaCenterAndZoom?.center ?? TAIPEI_CENTER}
                    defaultZoom={14}
                    options={{streetViewControl: true, mapTypeControl: true}}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({map, maps}) => this.initMap(map, maps)}
                ></GoogleMapReact>
            </div>
        );
    }
}
