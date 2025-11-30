import { LayoutType } from "../types/LayoutType";

export const LAYOUT_CONFIG: Record<
  LayoutType,
  { defaultW: number; defaultH: number; minW: number; minH: number }
> = {
  full: {
    defaultW: 300,
    defaultH: 200,
    minW: 300,
    minH: 200,
  },
  mini: {
    defaultW: 200,
    defaultH: 125,
    minW: 200,
    minH: 125,
  },
  line: {
    defaultW: 200,
    defaultH: 75,
    minW: 150,
    minH: 50,
  },
};
