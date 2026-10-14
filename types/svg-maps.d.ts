declare module '@svg-maps/india' {
  export interface Location {
    id: string;
    name: string;
    path: string;
  }
  export interface IndiaMapData {
    label: string;
    viewBox: string;
    locations: Location[];
  }
  const IndiaMapData: IndiaMapData;
  export default IndiaMapData;
}
