import type React from "react";

export interface ListItemProps {
  color: string;
  text: string;
  count: number;
  styles: {
    container: React.CSSProperties;
    dot: (color: string) => React.CSSProperties;
    text: React.CSSProperties;
    count: React.CSSProperties;
  };
}
