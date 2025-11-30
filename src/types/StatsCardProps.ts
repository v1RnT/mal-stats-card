import { LayoutType } from "../enums/LayoutType";
import { MediaType } from "../enums/MediaType";
import { ThemeType } from "../enums/ThemeType";
import { UserStats } from "./UserStats";

export interface StatsCardProps {
  username: string;
  type: MediaType;
  stats: UserStats;
  theme?: ThemeType;
  layout?: LayoutType;
}
