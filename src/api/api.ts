import { UserStats } from "../types/UserStats";

export async function fetchUserStats(
  username: string,
  type: "anime" | "manga"
): Promise<UserStats> {
  const statsUrl = `https://api.jikan.moe/v4/users/${username}/statistics`;
  const profileUrl = `https://api.jikan.moe/v4/users/${username}`;

  const [statsRes, profileRes] = await Promise.all([
    fetch(statsUrl, { next: { revalidate: 60 } }),
    fetch(profileUrl, { next: { revalidate: 60 } }),
  ]);

  if (!statsRes.ok) {
    throw new Error(statsRes.status === 404 ? "User not found" : "API Error");
  }

  const statsJson = await statsRes.json();
  const profileJson = profileRes.ok ? await profileRes.json() : { data: {} };

  const data = statsJson.data[type];
  const profile = profileJson.data;

  return {
    days_watched: data.days_watched,
    days_read: data.days_read,
    mean_score: data.mean_score,
    completed: data.completed,
    watching: data.watching,
    reading: data.reading,
    on_hold: data.on_hold,
    dropped: data.dropped,
    plan_to_watch: data.plan_to_watch,
    plan_to_read: data.plan_to_read,
    total_entries: data.total_entries,
    rewatched: data.rewatched,
    reread: data.reread,
    episodes_watched: data.episodes_watched,
    chapters_read: data.chapters_read,
    volumes: data.volumes_read,

    username: profile.username,
  };
}
