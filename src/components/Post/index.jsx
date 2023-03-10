import { Comment } from '../Comment';
import { Avatar } from '../Avatar';
import styles from './Post.module.css';

export function Post() {

  return (
    <article className={styles.post}>
      <header className={styles.headerPost}>
        <div className={styles.author}>
          <Avatar
            src="https://github.com/gabrielmagevski.png"
            alt="image-profile"
          />
          <div className={styles.authorInfo}>
            <strong>Gabriel Magevski</strong>
            <span>Web Developer</span>
          </div>
        </div>

        <time title="31 de outubro às 08:00h" dateTime="2022-05-11 08:00:00">Publicado há 1h</time>
      </header>

      <div className={styles.content}>
        <p>Fala galeraa 👋</p>
        <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat</p>
        <p><a href='#'>jane.design/doctorcare</a></p>
        <p>
          <a href='#'>#novoprojeto</a> {' '}
          <a href='#'>#nlw </a> {' '}
          <a href='#'>#rocketseat</a>
        </p>
      </div>


      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          placeholder='Deixe um comentário'
        />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
      </div>
    </article>
  )
}