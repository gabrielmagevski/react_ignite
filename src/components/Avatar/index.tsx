import { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
  name?: string;
}

export function Avatar({ hasBorder = true, name = "avatar-image", ...rest }: AvatarProps) {
  return <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} alt={name} {...rest} />;
}
