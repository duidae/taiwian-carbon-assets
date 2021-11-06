import {action, computed, makeObservable, observable, ObservableMap} from "mobx";

import {CO2_EQ, FindLayerStyleByName, LayerType} from "../models";

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
    @observable coverRatio: number;
    @observable selectedCaseID: number;
    @observable filterCarbonType: string;
    @observable filterRangeLowerBound: number;
    @observable filterRangeUpperBound: number;

    public analysisAreas = [
        {
            folder: "臺北市大安區",
            center: {lat: 25.026054, lng: 121.543439},
            zoom: 14,
            layerGeojsons: ["大安區區界.json", "大安區公有建物.json", "大安區既有再生能源.json", "大安區公有土地.json", "大安區建物.json"],
            piChartData: {
                labels: ["公有建築", "開放空間", "公園與綠資源"],
                data: [6844, 3235, 1443]
            },
            forceChartData: [
                {name: "光電設施", data: [80, 50, 30, 40, 100, 20]},
                {name: "探捕捉設施", data: [20, 30, 40, 80, 20, 80]},
                {name: "溼地經營", data: [44, 76, 78, 13, 43, 10]}
            ],
            capacity: 860769 / 10
        },
        {
            folder: "花蓮縣吉安鄉",
            center: {lat: 23.958145326789797, lng: 121.56952315343267},
            zoom: 13,
            layerGeojsons: ["吉安鄉區界.json", "吉安鄉微水力場址.json"],
            piChartData: {
                labels: ["林地", "水圳", "埤塘"],
                data: [4344, 5435, 443]
            },
            forceChartData: [
                {name: "光電設施", data: [20, 30, 40, 80, 20, 80]},
                {name: "探捕捉設施", data: [80, 50, 30, 40, 100, 20]},
                {name: "溼地經營", data: [44, 76, 78, 13, 43, 10]}
            ],
            capacity: 1529.78
        },
        {
            folder: "案場媒合",
            center: {lat: 23.60651843061501, lng: 120.91591914241587},
            zoom: 8,
            layerGeojsons: ["案場媒合.json"]
        }
    ];

    private constructor() {
        makeObservable(this);

        this.layerGeojsons = [];
        this.analysisAreas?.forEach(area => {
            this.layerGeojsons = this.layerGeojsons.concat(
                area.layerGeojsons.map(layerGeojson => {
                    return `${area.folder}/${layerGeojson}`;
                })
            );
        });

        this.isLayerSelected = new ObservableMap<LayerGeojson, boolean>([]);
        this.layerGeojsons?.forEach(layerGeojson => this.isLayerSelected.set(layerGeojson, false));

        // Activate the first area
        const defaultArea = this.analysisAreas?.[0];
        this.selectedArea = defaultArea?.folder;
        ["界", "公有建物", "既有"].forEach(keyWord => {
            const borderLayer = defaultArea?.layerGeojsons?.find(layerGeojson => layerGeojson?.includes(keyWord));
            this.isLayerSelected.set(`${defaultArea?.folder}/${borderLayer}`, true);
        });
        this.coverRatio = 0.4;

        this.selectedCaseID = 1;
        this.filterCarbonType = "";
        this.filterRangeLowerBound = 0;
        this.filterRangeUpperBound = 606816;
    }

    @action selectAreaLayers = (area: string) => {
        const analysisArea = this.analysisAreas?.find(analysisArea => analysisArea.folder === area);
        if (analysisArea) {
            this.selectedArea = area;
            this.coverRatio = 0.4;
            const layerGeojsonPaths = analysisArea.layerGeojsons.map(layerGeojson => {
                return `${analysisArea.folder}/${layerGeojson}`;
            });
            this.isLayerSelected?.forEach((isSelected, layerGeojson) => {
                const defaultSelection =
                    area === "臺北市大安區"
                        ? FindLayerStyleByName(layerGeojson) === LayerType.Border || FindLayerStyleByName(layerGeojson) === LayerType.GreenFacility || FindLayerStyleByName(layerGeojson) === LayerType.PublicBuilding
                        : true;
                this.isLayerSelected.set(layerGeojson, layerGeojsonPaths.includes(layerGeojson) && defaultSelection);
            });
        }
    };

    @action selectLayer = (selectedLayer: string) => {
        if (this.layerGeojsons?.includes(selectedLayer)) {
            this.isLayerSelected.set(selectedLayer, !this.isLayerSelected.get(selectedLayer));
        }
    };

    @action setCoverRatio = (ratio: number) => {
        this.coverRatio = ratio / 100;
    };

    @action selectCaseID = (caseID: number) => {
        this.selectedCaseID = caseID;
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

    @computed get selectedAreaGreenFacilityDescription(): {type: string; desc: string} {
        if (this.selectedArea === this.analysisAreas[0].folder && this.analysisAreas[0].capacity) {
            return {
                type: "太陽能板",
                desc: `公有建築頂層面積約 ${(this.analysisAreas[0].capacity * 10).toLocaleString()} 平方公尺`
            };
        } else if (this.selectedArea === this.analysisAreas[1].folder) {
            return {
                type: "微水力設施",
                desc: "微水力設施潛力場址共 22 處"
            };
        }
        return {type: "", desc: ""};
    }

    @computed get carbonSink(): string {
        const value = this.selectedArea === this.analysisAreas[0].folder ? this.analysisAreas[0].capacity : this.analysisAreas[1].capacity;
        return value && value > 0 ? Math.floor(value * this.coverRatio * CO2_EQ)?.toLocaleString() : "";
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
