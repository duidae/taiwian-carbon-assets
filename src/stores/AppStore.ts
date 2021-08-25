import {action, computed, makeObservable, observable, ObservableMap} from "mobx";

export type DataLayer = string;
export type DataLayerSelection = ObservableMap<DataLayer, boolean>;

export enum AreaType {
    CITY,
    COUNTRY_SIDE
}

export class AppStore {
    private static staticInstance: AppStore;

    public static get Instance() {
        if (!AppStore.staticInstance) {
            AppStore.staticInstance = new AppStore();
        }
        return AppStore.staticInstance;
    }

    @observable selectedArea: string | undefined;
    @observable dataLayers: DataLayer[];
    @observable isDataLayerSelected: ObservableMap<DataLayer, boolean>;

    public dataLayerGeojsonMap: Map<DataLayer, string>;
    public analysisAreas = [
        {
            type: AreaType.CITY,
            key: "城市 - 大安區",
            dataLayers: ["Daan", "Zhongshan"],
            piChartData: [4344, 5435, 1443, 4443],
        },
        {
            type: AreaType.COUNTRY_SIDE,
            key: "鄉鎮 - 東華",
            dataLayers: ["Zhongzheng", "Wanhua"],
            piChartData: [5435, 4344, 4443, 1443],
        },
    ];

    private constructor() {
        makeObservable(this);

        this.selectedArea = undefined;
        this.dataLayers = [];
        this.analysisAreas?.forEach(area => this.dataLayers = this.dataLayers.concat(area.dataLayers));

        this.dataLayerGeojsonMap = new Map<DataLayer, string>([]);
        this.dataLayers?.forEach(dataLayer => this.dataLayerGeojsonMap.set(dataLayer, `${dataLayer}.json`));
        this.isDataLayerSelected = new ObservableMap<DataLayer, boolean>([]);
        this.dataLayers?.forEach(dataLayer => this.isDataLayerSelected.set(dataLayer, false));
    }

    @action selectAreaDataLayers = (areaKey: string) => {
        this.selectedArea = areaKey;
        const dataLayers = this.analysisAreas?.find(area => area.key === areaKey)?.dataLayers;
        let selectionNum = 0;
        dataLayers?.forEach(dataLayer => {
            if (this.isDataLayerSelected.get(dataLayer)) {
                selectionNum++;
            }
        });
        dataLayers?.forEach(dataLayer => {
            this.isDataLayerSelected.set(dataLayer, selectionNum === dataLayers?.length ? false : true);
        });
    };

    @action selectDataLayer = (selectedDataLayer: string) => {
        if (this.dataLayers?.includes(selectedDataLayer)) {
            this.isDataLayerSelected.set(selectedDataLayer, !this.isDataLayerSelected.get(selectedDataLayer));
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
        return this.analysisAreas.find(area => area.key === this.selectedArea)?.piChartData;
    }

    @computed get selectedDataLayers(): DataLayer[] {
        let selectedDataLayers: DataLayer[] = [];
        this.isDataLayerSelected?.forEach((isSelected, dataLayer) => {
            if (isSelected) {
                selectedDataLayers.push(dataLayer);
            }
        });
        return selectedDataLayers;
    }
}
