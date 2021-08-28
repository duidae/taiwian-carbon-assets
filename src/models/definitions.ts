export enum LayerType {
    Border,
    Building,
    PublicAsset,
    GreenFacility,
    Others
}

export const FindLayerStyleByName = (jsonName: string): LayerType => {
    if (jsonName.includes("界")) {
        return LayerType.Border;
    } else if (jsonName.includes("建物")) {
        return LayerType.Building;
    } else if (jsonName.includes("公有")) {
        return LayerType.PublicAsset;
    } else if (jsonName.includes("光電")) {
        return LayerType.GreenFacility;
    }
    return LayerType.Others;
};
