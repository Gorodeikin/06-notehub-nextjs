import styles from './Footer.module.css';

export const Footer = () => (
    <footer className={styles.footer}>
    <div className={styles.content}>
      <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
      <div className={styles.wrap}>
        <p>Developer: your name</p>
        <p>
          Contact us:
          <a href="mailto:student@notehub.app">student@notehub.app</a>
        </p>
      </div>
    </div>
  </footer>
);