import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Dashboard from '../components/Dashboard/Dashboard';
import { GET_STATUSES } from '../lib/queries';
import { useQuery } from '@apollo/client';
import Spinner from '../components/ui/Spinner/Spinner';
import { NexusGenFieldTypes } from '../graphql-server/generated/types';
import Header from '../components/ui/Header/Header';
import Footer from '../components/ui/Footer/Footer';

export default function Home() {
  const { loading, error, data } =
    useQuery<NexusGenFieldTypes['Query']>(GET_STATUSES);
  if (loading) return <Spinner dimensions={200} alt={'Logo spinner'} />;
  if (error) return <p>Error :{error.message}(</p>;

  const statusOptions = data.Status;
  return (
    <div className={styles.container}>
      <Head>
        <title>Task Manager App</title>
        <meta name='description' content='Manage your tasks!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className={styles.main}>
        <Dashboard statusOptions={statusOptions} />
      </main>

      <Footer />
    </div>
  );
}
