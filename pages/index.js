import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
          &ensp;
          <Link href="/login">
            <a>Login</a>
          </Link>
        </h1>
      </main>
    </div>
  );
}
