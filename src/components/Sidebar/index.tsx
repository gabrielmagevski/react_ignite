import styles from './Sidebar.module.css';
import { PencilSimpleLine } from 'phosphor-react';
import { Avatar } from '../Avatar'

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src='https://images.unsplash.com/photo-1586824622693-889386d4d24d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=5'
        alt='Splash Image'
      />
      <div className={styles.profile}>
        <Avatar
          src={'https://github.com/gabrielmagevski.png'}
          alt={'Image Profile'}
        />
        <strong>Gabriel Magevski</strong>
        <strong>Web Developer</strong>
      </div>

      <footer>
        <a href='#'>
          <PencilSimpleLine size={20} />
          Editar o seu perfil
        </a>
      </footer>
    </aside>
  )
}