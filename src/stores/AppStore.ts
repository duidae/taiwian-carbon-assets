import {action, computed, makeObservable, observable, ObservableMap} from "mobx";

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
            folder: "城市 - 大安區",
            center: {lat: 25.038357847174, lng: 121.54770626982},
            layerGeojsons: ["Neihu.json", "Nangang.json"],
            piChartData: [4344, 5435, 1443, 4443],
            forceChartData: [
                {name: "光電設施", data: [80, 50, 30, 40, 100, 20]},
                {name: "探捕捉設施", data: [20, 30, 40, 80, 20, 80]},
                {name: "溼地經營", data: [44, 76, 78, 13, 43, 10]}
            ]
        },
        {
            folder: "鄉鎮 - 東華",
            center: {lat: 25.023556, lng: 121.488929},
            layerGeojsons: ["Zhongzheng.json", "Wanhua.json"],
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

        // Activate first area
        const defaultArea = this.analysisAreas?.[0];
        this.selectedArea = defaultArea?.folder;
        defaultArea?.layerGeojsons?.forEach(layerGeojson => {
            this.isLayerSelected.set(`${defaultArea.folder}/${layerGeojson}`, true);
        });
    }

    @action selectAreaLayers = (area: string) => {
        const analysisArea = this.analysisAreas?.find(analysisArea => analysisArea.folder === area);
        if (analysisArea) {
            this.selectedArea = area;
            let selectionNum = 0;
            analysisArea.layerGeojsons?.forEach(layerGeojson => {
                if (this.isLayerSelected.get(`${analysisArea.folder}/${layerGeojson}`)) {
                    selectionNum++;
                }
            });
            analysisArea.layerGeojsons?.forEach(layerGeojson => {
                this.isLayerSelected.set(`${analysisArea.folder}/${layerGeojson}`, selectionNum === analysisArea.layerGeojsons?.length ? false : true);
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
