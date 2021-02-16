    export interface GeoFeature {
    id: string;
    geometry: Geometry;
    properties: GeoProps
}

export interface Geometry {
    type: string;
    coordinates: number[];
}
export interface GeoProps {
    ids: string;
    detail: string;
    place: string;
    mag: number;
    time: number;
    title: string;
    code: string;
    url: string;
    tsunami: number;
}