import React from "react";
import { THEMES } from "../lib/themes";
import { ThemeType } from "../types/ThemeType";
import { LayoutType } from "../types/LayoutType";
import { SIZES } from "../lib/sizes";

export const getStyles = (
  themeName: ThemeType = "dark",
  layout: LayoutType = "full"
) => {
  const theme = THEMES[themeName] || THEMES.dark;
  const size = SIZES[layout] || SIZES.full;

  const flexRow = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  } as const;
  const flexCol = { display: "flex", flexDirection: "column" } as const;

  return {
    colors: theme,

    wrapper: {
      ...flexCol,
      width: "100%",
      height: "100%",
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: "Verdana, sans-serif",
      padding: `${size.padding}px`,
      border: themeName === "light" ? `1px solid ${theme.border}` : "none",
      justifyContent: layout === "line" ? "center" : "flex-start",
    } as React.CSSProperties,

    row: flexRow,
    col: flexCol,
    rowBetween: {
      ...flexRow,
      justifyContent: "space-between",
    } as React.CSSProperties,
    logoGroup: { ...flexRow, gap: size.gap } as React.CSSProperties,

    headerText: {
      fontSize: size.headerFn,
      fontWeight: 700,
    } as React.CSSProperties,
    subText: {
      fontSize: size.subFn,
      color: theme.textDim,
    } as React.CSSProperties,
    label: {
      fontSize: size.textFn,
      color: theme.textDim,
    } as React.CSSProperties,
    value: {
      fontSize: size.textFn,
      color: theme.text,
      fontWeight: 600,
      marginLeft: 3,
    } as React.CSSProperties,
    valueLarge: {
      fontSize: size.headerFn,
      color: theme.text,
      fontWeight: 600,
      marginLeft: 3,
    } as React.CSSProperties,

    graphContainer: {
      display: "flex",
      width: "100%",
      height: size.graphH,
      borderRadius: 2,
      overflow: "hidden",
      marginBottom: size.gap,
    } as React.CSSProperties,

    listItem: {
      container: {
        ...flexRow,
        marginBottom: 2,
        width: "100%",
      } as React.CSSProperties,
      dot: (color: string): React.CSSProperties => ({
        width: size.dot,
        height: size.dot,
        borderRadius: "50%",
        backgroundColor: color,
        marginRight: 4,
      }),
      text: {
        fontSize: size.textFn,
        color: theme.text,
        flex: 1,
      } as React.CSSProperties,
      count: {
        fontSize: size.textFn,
        color: theme.textDim,
      } as React.CSSProperties,
    },
  };
};
