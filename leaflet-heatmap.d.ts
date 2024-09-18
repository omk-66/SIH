import "leaflet";

// Extending leaflet's L namespace to include heatLayer
declare module "leaflet" {
    function heatLayer(latlngs: number[][], options?: { radius?: number }): any;
}
