export interface UserStats {
  days_watched: number;
  days_read: number;
  mean_score: number;
  completed: number;
  watching: number;
  reading: number;
  on_hold: number;
  dropped: number;
  plan_to_watch: number;
  plan_to_read: number;
  total_entries: number;
  rewatched: number;
  reread: number;
  episodes_watched: number;
  chapters_read: number;
  volumes: number;

  username: string;
}
