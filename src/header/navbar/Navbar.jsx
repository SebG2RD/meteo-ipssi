import styles from "./Navbar.module.css";

function Navbar({ theme, onThemeChange }) {
  const nextTheme = theme === "dark" ? "soft" : "dark";

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>⛅</span>
          <span className={styles.title}>WeatherBoard</span>
        </div>
        <div className={styles.actions}>
          <span className={styles.badge}>OpenWeatherMap API</span>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={() => onThemeChange(nextTheme)}
            aria-label={`Basculer vers le thème ${nextTheme}`}
          >
            {theme === "dark" ? "Dark" : "Soft"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
