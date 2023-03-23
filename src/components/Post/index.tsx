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

export interface PostType {
  id: number;
  author: Author;
  content: Content[];
  publishAt: Date;
}
interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(["Que legal", "teste"]);
  const [newCommentCreated, setNewCommentCreated] = useState("");

  const deleteComment = (commentsToDelete: string) => {
    const isCommentDelete = comments.filter((comment) => {
      return comment !== commentsToDelete;
    });

    setComments(isCommentDelete);
  };

  const publishedAtFormatted = format(post.publishAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedAtDateRelativeToNow = formatDistanceToNow(post.publishAt, {
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
          <Avatar src={post.author.avatarUrl} alt="image-profile" />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedAtFormatted} dateTime={post.publishAt.toISOString()}>
          {publishedAtDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((line) => {
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
