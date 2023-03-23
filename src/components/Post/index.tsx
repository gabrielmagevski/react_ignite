import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Comment } from "../Comment";
import { Avatar } from "../Avatar";
import styles from "./Post.module.css";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

interface PostProps {
  author: Author;
  content: Content[];
  publishAt: Date;
}

export function Post({ author, content, publishAt }: PostProps) {
  const [comments, setComments] = useState(["Que legal", "teste"]);
  const [newCommentCreated, setNewCommentCreated] = useState("");

  const deleteComment = (commentsToDelete: string) => {
    const isCommentDelete = comments.filter((comment) => {
      return comment !== commentsToDelete;
    });

    setComments(isCommentDelete);
  };

  const publishedAtFormatted = format(publishAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedAtDateRelativeToNow = formatDistanceToNow(publishAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const handleCreatedNewComment = (event: FormEvent) => {
    event.preventDefault();

    setComments([...comments, newCommentCreated]);
    setNewCommentCreated("");
  };

  const handleOnchangeNewComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentCreated(event.target.value);
    event.target.setCustomValidity("");
  };

  const handleNewCommentInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity("Este campo é obrigatório");
  };

  const isTextAreaEmpty = newCommentCreated.length === 0;

  return (
    <article className={styles.post}>
      <header className={styles.headerPost}>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} alt="image-profile" />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedAtFormatted} dateTime={publishAt.toISOString()}>
          {publishedAtDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") return <p key={line.content}>{line.content}</p>;
          else if (line.type === "link")
            return (
              <p key={line.content}>
                <a href="">{line.content}</a>
              </p>
            );
        })}
      </div>

      <form onSubmit={handleCreatedNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentCreated}
          onChange={handleOnchangeNewComment}
          required
          onInvalid={handleNewCommentInvalid}
        />
        <footer>
          <button type="submit" disabled={isTextAreaEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return <Comment key={comment} content={comment} onDeleteComment={deleteComment} />;
        })}
      </div>
    </article>
  );
}
