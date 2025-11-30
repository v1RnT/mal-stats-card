import { LayoutType } from "./LayoutType";
import { MediaType } from "./MediaType";
import { ThemeType } from "./ThemeType";
import { UserStats } from "./UserStats";

export interface StatsCardProps {
  username: string;
  type: MediaType;
  stats: UserStats;
  theme?: ThemeType;
  layout?: LayoutType;
}
