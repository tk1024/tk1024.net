import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>tk1024.net</h1>
      <ul>
        <li>
          <a href="https://twitter.com/intent/user?user_id=177458221">
            Twitter
          </a>
        </li>
        <li>
          <a href="https://tk1024.tumblr.com">Tumblr</a>
        </li>
        <li>
          <a href="https://qiita.com/tk1024">Qiita</a>
        </li>
        <li>
          <a href="https://github.com/tk1024">Github</a>
        </li>
      </ul>
    </main>
  );
}
