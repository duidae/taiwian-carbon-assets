// 1kWp equals to 0.509 mt (509 kg) equivalent weight of CO2
export const CO2_EQ = 0.509;

export const TAIPEI_CENTER = {lat: 25.026054, lng: 121.543439};

export enum LayerType {
    Border,
    Building,
    PublicBuilding,
    PublicAsset,
    GreenFacility,
    Others
}

export const FindLayerStyleByName = (jsonName: string): LayerType => {
    if (jsonName.includes("界")) {
        return LayerType.Border;
    } else if (jsonName.includes("公有建物")) {
        return LayerType.PublicBuilding;
    } else if (jsonName.includes("建物")) {
        return LayerType.Building;
    } else if (jsonName.includes("公有")) {
        return LayerType.PublicAsset;
    } else if (jsonName.includes("既有") || jsonName.includes("水力")) {
        return LayerType.GreenFacility;
    }
    return LayerType.Others;
};
