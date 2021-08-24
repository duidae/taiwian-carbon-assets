import {observable, makeObservable} from "mobx";

export class AppStore {
    private static staticInstance: AppStore;

    public static get Instance() {
        if (!AppStore.staticInstance) {
            AppStore.staticInstance = new AppStore();
        }
        return AppStore.staticInstance;
    }

    @observable dataLayers: string[];

    private constructor() {
        makeObservable(this);

        this.dataLayers = ["Daan", "Zhongshan"];
    }
}
