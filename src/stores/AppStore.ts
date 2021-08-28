import {action, computed, makeObservable, observable, ObservableMap} from "mobx";

import {FindLayerStyleByName, LayerType} from "../models";

export type LayerGeojson = string;
export type LayerSelections = ObservableMap<LayerGeojson, boolean>;

export class AppStore {
    private static staticInstance: AppStore;

    public static get Instance() {
        if (!AppStore.staticInstance) {
            AppStore.staticInstance = new AppStore();
        }
        return AppStore.staticInstance;
    }

    @observable selectedArea: string | undefined;
    @observable layerGeojsons: LayerGeojson[];
    @observable isLayerSelected: ObservableMap<LayerGeojson, boolean>;

    public analysisAreas = [
        {
            folder: "臺北市大安區",
            center: {lat: 25.026054, lng: 121.543439},
            layerGeojsons: ["大安區區界.json", "大安區公有土地.json", "大安區建物.json", "大安區光電設施.json"],
            piChartData: [4344, 5435, 1443, 4443],
            forceChartData: [
                {name: "光電設施", data: [80, 50, 30, 40, 100, 20]},
                {name: "探捕捉設施", data: [20, 30, 40, 80, 20, 80]},
                {name: "溼地經營", data: [44, 76, 78, 13, 43, 10]}
            ]
        },
        {
            folder: "花蓮縣東華鄉",
            center: {lat: 25.023556, lng: 121.488929},
            layerGeojsons: ["東華鄉區界.json", "東華鄉光電設施.json"],
            piChartData: [5435, 4344, 4443, 1443],
            forceChartData: [
                {name: "光電設施", data: [20, 30, 40, 80, 20, 80]},
                {name: "探捕捉設施", data: [80, 50, 30, 40, 100, 20]},
                {name: "溼地經營", data: [44, 76, 78, 13, 43, 10]}
            ]
        }
    ];

    private constructor() {
        makeObservable(this);

        this.layerGeojsons = [];
        this.analysisAreas?.forEach(
            area =>
                (this.layerGeojsons = this.layerGeojsons.concat(
                    area.layerGeojsons.map(layerGeojson => {
                        return `${area.folder}/${layerGeojson}`;
                    })
                ))
        );

        this.isLayerSelected = new ObservableMap<LayerGeojson, boolean>([]);
        this.layerGeojsons?.forEach(layerGeojson => this.isLayerSelected.set(layerGeojson, false));

        // Activate the first area
        const defaultArea = this.analysisAreas?.[0];
        this.selectedArea = defaultArea?.folder;
        const borderLayer = defaultArea?.layerGeojsons?.find(layerGeojson => layerGeojson?.includes("界"));
        this.isLayerSelected.set(`${defaultArea?.folder}/${borderLayer}`, true);
    }

    @action selectAreaLayers = (area: string) => {
        const analysisArea = this.analysisAreas?.find(analysisArea => analysisArea.folder === area);
        if (analysisArea) {
            this.selectedArea = area;
            const layerGeojsonPaths = analysisArea.layerGeojsons.map(layerGeojson => {
                return `${analysisArea.folder}/${layerGeojson}`;
            });
            this.isLayerSelected?.forEach((isSelected, layerGeojson) => {
                this.isLayerSelected.set(layerGeojson, layerGeojsonPaths.includes(layerGeojson) && FindLayerStyleByName(layerGeojson) === LayerType.Border ? true : false);
            });
        }
    };

    @action selectLayer = (selectedLayer: string) => {
        if (this.layerGeojsons?.includes(selectedLayer)) {
            this.isLayerSelected.set(selectedLayer, !this.isLayerSelected.get(selectedLayer));
        }
    };

    /* why this is not working?
    @computed get dataLayerGeojsonMap(): Map<DataLayer, string> {
        let dataLayerGeojsonMap = new Map<DataLayer, string>([]);
        this.dataLayers?.forEach(dataLayer => dataLayerGeojsonMap.set(dataLayer, `${dataLayer}.json`));
        return dataLayerGeojsonMap;
    }
    */

    @computed get selectedPiChartData(): number[] | undefined {
        return this.analysisAreas.find(analysisArea => analysisArea.folder === this.selectedArea)?.piChartData;
    }

    @computed get selectedForceChartData(): any[] | undefined {
        return this.analysisAreas.find(analysisArea => analysisArea.folder === this.selectedArea)?.forceChartData;
    }

    @computed get selectedLayers(): LayerGeojson[] {
        let selectedLayers: LayerGeojson[] = [];
        this.isLayerSelected?.forEach((isSelected, layerGeojsons) => {
            if (isSelected) {
                selectedLayers.push(layerGeojsons);
            }
        });
        return selectedLayers;
    }
}
