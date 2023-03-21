import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Comment } from '../Comment';
import { Avatar } from '../Avatar';
import styles from './Post.module.css';

export function Post({ author, content, publishAt }) {
  const publishedAtFormatted = format(publishAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  });

  const publishedAtDateRelativeToNow = formatDistanceToNow(publishAt, {
    locale: ptBR,
    addSuffix: true
  })

  return (
    <article className={styles.post}>
      <header className={styles.headerPost}>
        <div className={styles.author}>
          <Avatar
            src={author.avatarUrl}
            alt="image-profile"
          />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedAtFormatted} dateTime={publishAt.toISOString()}>{publishedAtDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {
          content.map(line => {
            if (line.type === 'paragraph') return <p>{line.content}</p>
            else if (line.type === 'link') return <p><a href="">{line.content}</a></p>
          })
        }
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