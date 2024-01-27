import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Dashboard from '../components/Dashboard/Dashboard';
import { GET_STATUSES } from '../lib/queries';
import { useQuery } from '@apollo/client';
import Spinner from '../components/ui/Spinner';
import { NexusGenFieldTypes } from '../graphql-server/generated/types';
import Sidebar from '../components/common/Sidebar';

export default function Home() {
  const { loading, error, data } =
    useQuery<NexusGenFieldTypes['Query']>(GET_STATUSES);
  if (loading) return <Spinner />;
  if (error) return <p>Error :{error.message}(</p>;

  const statusOptions = data.Status;
  return (
    <div className={styles.container}>
      <Head>
        <title>Task Manager App</title>
        <meta name='description' content='Manage your tasks!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <h1>Welcome to the Task Manager</h1>
        <p>Username</p>
        <p>Logout</p>
      </header>
      <main className={styles.main}>
        <Sidebar />
        <Dashboard statusOptions={statusOptions} />
      </main>
      <footer>
        <p>Credentials</p>
        <p>Date</p>
        <p>Authorship</p>
      </footer>
    </div>
  );
}
