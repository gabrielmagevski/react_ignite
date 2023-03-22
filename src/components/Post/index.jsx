import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Comment } from '../Comment';
import { Avatar } from '../Avatar';
import styles from './Post.module.css';

export function Post({ author, content, publishAt }) {
  const [comments, setComments] = useState(['Que legal'])
  const [newCommentCreated, setNewCommentCreated] = useState('')

  const publishedAtFormatted = format(publishAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  });

  const publishedAtDateRelativeToNow = formatDistanceToNow(publishAt, {
    locale: ptBR,
    addSuffix: true
  })

  const handleCreatedNewComment = (event) => {
    event.preventDefault();

    setComments([...comments, newCommentCreated])
    setNewCommentCreated('')
  }

  const handleOnchangeNewComment = (event) => {
    setNewCommentCreated(event.target.value)
  }

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
            if (line.type === 'paragraph') return <p key={line.content}>{line.content}</p>
            else if (line.type === 'link') return <p key={line.content}><a href="">{line.content}</a></p>
          })
        }
      </div>


      <form onSubmit={handleCreatedNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder='Deixe um comentário'
          value={newCommentCreated}
          onChange={handleOnchangeNewComment}
        />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {
          comments.map(comment => {
            return (
              <Comment key={comment} content={comment} />
            )
          })
        }
      </div>
    </article>
  )
}