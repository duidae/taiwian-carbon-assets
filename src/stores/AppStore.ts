import {action, computed, makeObservable, observable, ObservableMap} from "mobx";

export type DataLayer = string;
export type DataLayerSelection = ObservableMap<DataLayer, boolean>;

export class AppStore {
    private static staticInstance: AppStore;

    public static get Instance() {
        if (!AppStore.staticInstance) {
            AppStore.staticInstance = new AppStore();
        }
        return AppStore.staticInstance;
    }

    @observable dataLayers: DataLayer[];
    @observable isDataLayerSelected: ObservableMap<DataLayer, boolean>;
    public dataLayerGeojsonMap: Map<DataLayer, string>;

    private constructor() {
        makeObservable(this);

        this.dataLayers = ["Daan", "Zhongshan"];
        this.dataLayerGeojsonMap = new Map<DataLayer, string>([]);
        this.dataLayers?.forEach(dataLayer => this.dataLayerGeojsonMap.set(dataLayer, `${dataLayer}.json`));
        this.isDataLayerSelected = new ObservableMap<DataLayer, boolean>([]);
        this.dataLayers?.forEach(dataLayer => this.isDataLayerSelected.set(dataLayer, false));
    }

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
