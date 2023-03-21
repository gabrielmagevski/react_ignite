import { Post } from './components/Post';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css'
import './global.css';

function App() {

  const posts = [
    {
      id: 1,
      author: {
        avatarUrl: 'https://github.com/gabrielmagevski.png',
        name: 'Gabriel',
        role: 'Developer Front-end'
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa!' },
        { type: 'paragraph', content: 'Estou no ignite!' },
        { type: 'link', content: 'jane.design/doctorcare' },
      ],
      publishAt: new Date('2023-02-10 12:00:00')
    },
    {
      id: 2,
      author: {
        avatarUrl: 'https://github.com/diego3g.png',
        name: 'Diego Fernandes',
        role: 'CTO @Rocketseat'
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa!' },
        { type: 'paragraph', content: 'Estou no ignite!' },
        { type: 'link', content: 'jane.design/doctorcare' },
      ],
      publishAt: new Date('2023-02-02 12:00:00')
    },
  ]

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map(post => {
              return (
                <Post
                  author={post.author}
                  content={post.content}
                  publishAt={post.publishAt}
                />
              )
            })
          }
        </main>
      </div>
    </div>
  )
}

export default App
