import React from 'react'
import styles from './Avatar.module.css'

export function Avatar({ hasBorder = true, src, name = 'avatar-image' }) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
      alt={name}
    />
  )
}
