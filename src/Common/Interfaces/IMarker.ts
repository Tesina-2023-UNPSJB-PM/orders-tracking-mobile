export interface IMarker {
  key: string;
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  iconName: string;
  iconColor: string;
  iconSrc: any;
}
