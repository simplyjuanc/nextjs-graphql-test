import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Dashboard from '../components/Dashboard/Dashboard';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Task Manager App</title>
        <meta name='description' content='Manage your tasks!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Dashboard />
      </main>
    </div>
  );
}

/*         
<h1 className={styles.title}>Welcome to the Task Manager</h1>

<p className={styles.description}>Please read the README.md</p>

<p className={styles.description}>
  GraphQL API located at
  <a href="/api/graphql" target="_blank">
    <code className={styles.code}>pages/api/graphql.js</code>
  </a>
</p>

<p className={styles.description}>
  <a href="/task/1" target="_blank">
    First task
  </a>
</p> 
*/
