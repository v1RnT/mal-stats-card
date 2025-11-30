import MalLogo from "../assets/icons/mal-icon.svg";
import { getStyles } from "./StatsCard.styles";

import { STATUS_COLORS } from "../lib/status-colors";
import { ListItemProps } from "../types/ListItemProps";
import { StatsCardProps } from "../types/StatsCardProps";
import { LayoutType } from "../enums/LayoutType";
import { MediaType } from "../enums/MediaType";
import { ThemeType } from "../enums/ThemeType";

const ListItem = ({ color, text, count, styles }: ListItemProps) => (
  <div style={styles.container}>
    <div style={styles.dot(color)} />
    <span style={styles.text}>{text}</span>
    <span style={styles.count}>{count}</span>
  </div>
);

export const StatsCard = ({
  type,
  stats,
  theme = ThemeType.Dark,
  layout = LayoutType.Full,
}: StatsCardProps) => {
  const isAnime = type === MediaType.Anime;
  const s = getStyles(theme, layout);

  const activeCount = isAnime ? stats.watching : stats.reading;
  const plannedCount = isAnime ? stats.plan_to_watch : stats.plan_to_read;

  const iconSize = layout === LayoutType.Full ? 18 : 12;

  return (
    <div style={s.wrapper}>
      <div
        style={{
          ...s.rowBetween,
          marginBottom:
            layout === LayoutType.Line ? 4 : s.rowBetween.marginBottom || 8,
        }}
      >
        <div style={s.logoGroup}>
          <MalLogo width={iconSize} height={iconSize} />
          <span style={s.headerText}>
            {isAnime ? "Anime Stats" : "Manga Stats"}
          </span>
        </div>
        <span style={s.subText}>{stats.username}</span>
      </div>

      <div
        style={{
          ...s.rowBetween,
          marginBottom: layout === LayoutType.Line ? 4 : 8,
        }}
      >
        <div style={s.row}>
          <span style={s.label}>Days: </span>
          <span style={s.value}>
            {isAnime ? stats.days_watched : stats.days_read}
          </span>
        </div>
        <div style={s.row}>
          <span style={s.label}>Score: </span>
          <span style={s.value}>{stats.mean_score}</span>
        </div>
        {(layout === LayoutType.Mini || layout === LayoutType.Line) && (
          <div style={s.row}>
            <span style={s.label}>Total: </span>
            <span style={s.value}>{stats.total_entries}</span>
          </div>
        )}
      </div>

      <div
        style={{
          ...s.graphContainer,
          marginBottom: layout === LayoutType.Line ? 0 : 8,
        }}
      >
        {activeCount > 0 && (
          <div
            style={{
              display: "flex",
              height: "100%",
              backgroundColor: STATUS_COLORS.watching,
              flex: activeCount,
            }}
          />
        )}
        {stats.completed > 0 && (
          <div
            style={{
              display: "flex",
              height: "100%",
              backgroundColor: STATUS_COLORS.completed,
              flex: stats.completed,
            }}
          />
        )}
        {stats.on_hold > 0 && (
          <div
            style={{
              display: "flex",
              height: "100%",
              backgroundColor: STATUS_COLORS.on_hold,
              flex: stats.on_hold,
            }}
          />
        )}
        {stats.dropped > 0 && (
          <div
            style={{
              display: "flex",
              height: "100%",
              backgroundColor: STATUS_COLORS.dropped,
              flex: stats.dropped,
            }}
          />
        )}
        {plannedCount > 0 && (
          <div
            style={{
              display: "flex",
              height: "100%",
              backgroundColor: STATUS_COLORS.plan_to_watch,
              flex: plannedCount,
            }}
          />
        )}
      </div>

      {layout !== LayoutType.Line && (
        <div style={s.rowBetween}>
          <div style={{ ...s.col, width: "48%" }}>
            <ListItem
              styles={s.listItem}
              color={STATUS_COLORS.watching}
              count={activeCount}
              text={isAnime ? "Watching" : "Reading"}
            />
            <ListItem
              styles={s.listItem}
              color={STATUS_COLORS.completed}
              count={stats.completed}
              text="Completed"
            />
            <ListItem
              styles={s.listItem}
              color={STATUS_COLORS.on_hold}
              count={stats.on_hold}
              text="On-Hold"
            />
            <ListItem
              styles={s.listItem}
              color={STATUS_COLORS.dropped}
              count={stats.dropped}
              text="Dropped"
            />
            <ListItem
              styles={s.listItem}
              color={STATUS_COLORS.plan_to_watch}
              count={plannedCount}
              text={isAnime ? "Plan to Watch" : "Plan to Read"}
            />
          </div>

          <div style={{ ...s.col, width: "45%" }}>
            {layout === LayoutType.Full && (
              <div style={{ ...s.rowBetween, marginBottom: 4 }}>
                <span style={s.label}>Total Entries</span>
                <span style={s.value}>{stats.total_entries}</span>
              </div>
            )}
            <div style={{ ...s.rowBetween, marginBottom: 4 }}>
              <span style={s.label}>{isAnime ? "Rewatched" : "Reread"}</span>
              <span style={s.value}>
                {isAnime ? stats.rewatched : stats.reread}
              </span>
            </div>
            <div style={{ ...s.rowBetween, marginBottom: 4 }}>
              <span style={s.label}>{isAnime ? "Episodes" : "Chapters"}</span>
              <span style={s.value}>
                {isAnime ? stats.episodes_watched : stats.chapters_read}
              </span>
            </div>
            {!isAnime && (
              <div style={s.rowBetween}>
                <span style={s.label}>Volumes</span>
                <span style={s.value}>{stats.volumes}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
