import React from "react";
import styles from "./Avatar.module.css";

interface AvatarProps {
  hasBorder?: boolean;
  src: string;
  alt: string;
  name?: string;
}

export function Avatar({ hasBorder = true, src, name = "avatar-image" }: AvatarProps) {
  return <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} src={src} alt={name} />;
}
