export interface ShowImage {
  id: number;
  type: string;
  main: boolean;
  resolutions: {
    original?: {
      url: string;
      width: number;
      height: number;
    };
    medium?: {
      url: string;
      width: number;
      height: number;
    };
  };
}
