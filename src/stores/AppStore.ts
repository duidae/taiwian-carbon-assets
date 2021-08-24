import {action, makeObservable, observable, ObservableMap} from "mobx";

export class AppStore {
    private static staticInstance: AppStore;

    public static get Instance() {
        if (!AppStore.staticInstance) {
            AppStore.staticInstance = new AppStore();
        }
        return AppStore.staticInstance;
    }

    @observable dataLayers: string[];
    @observable dataLayerSelections: ObservableMap<string, boolean>;

    private constructor() {
        makeObservable(this);

        this.dataLayers = ["Daan", "Zhongshan"];
        this.dataLayerSelections = new ObservableMap<string, boolean>([]);
        this.dataLayers?.forEach(dataLayer => this.dataLayerSelections.set(dataLayer, false));
    }

    @action selectDataLayer = (selectedDataLayer: string) => {
        if (this.dataLayers?.includes(selectedDataLayer)) {
            this.dataLayerSelections.set(selectedDataLayer, !this.dataLayerSelections.get(selectedDataLayer));
        }
    };
}
