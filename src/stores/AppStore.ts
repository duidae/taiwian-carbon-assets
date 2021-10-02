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
    @observable solarCoverRatio: number;

    public analysisAreas = [
        {
            folder: "臺北市大安區",
            center: {lat: 25.026054, lng: 121.543439},
            zoom: 14,
            layerGeojsons: ["大安區區界.json", "大安區公有建物.json", "大安區既有再生能源.json", "大安區公有土地.json", "大安區建物.json"],
            piChartData: {
                labels: ["公有建築", "閒置空地", "公園"],
                data: [4344, 5435, 1443]
            },
            forceChartData: [
                {name: "光電設施", data: [80, 50, 30, 40, 100, 20]},
                {name: "探捕捉設施", data: [20, 30, 40, 80, 20, 80]},
                {name: "溼地經營", data: [44, 76, 78, 13, 43, 10]}
            ]
        },
        {
            folder: "花蓮縣壽豐鄉",
            center: {lat: 23.85455775947227, lng: 121.53748791035855},
            zoom: 12,
            layerGeojsons: ["壽豐鄉區界.json", "壽豐鄉光電設施.json"],
            piChartData: {
                labels: ["水圳", "埤塘", "林地"],
                data: [4344, 5435, 1443]
            },
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
        this.solarCoverRatio = 0.45;
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

    @action setSolarCoverRatio = (ratio: number) => {
        this.solarCoverRatio = ratio;
    };

    /* why this is not working?
    @computed get dataLayerGeojsonMap(): Map<DataLayer, string> {
        let dataLayerGeojsonMap = new Map<DataLayer, string>([]);
        this.dataLayers?.forEach(dataLayer => dataLayerGeojsonMap.set(dataLayer, `${dataLayer}.json`));
        return dataLayerGeojsonMap;
    }
    */

    @computed get selectedAreaCenterAndZoom(): {center: {lat: number; lng: number} | undefined; zoom: number | undefined} {
        const area = this.analysisAreas.find(analysisArea => analysisArea.folder === this.selectedArea);
        return {center: area?.center, zoom: area?.zoom};
    }

    @computed get selectedAreaSolarPanelArea(): number {
        return 860769;
    }

    @computed get selectedPiChartData(): {labels: string[]; data: number[]} | undefined {
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
