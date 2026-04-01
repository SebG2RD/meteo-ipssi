import styles from "./WeatherCard.module.css";

function WeatherCard({ data }) {
  const { name, main, weather, wind, sys } = data;
  const icon = weather[0].icon;
  const description = weather[0].description;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.city}>{name}</h2>
          <span className={styles.country}>{sys.country}</span>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className={styles.icon}
        />
      </div>

      <p className={styles.temp}>{Math.round(main.temp)}°C</p>
      <p className={styles.description}>{description}</p>
      <p className={styles.feelsLike}>
        Ressenti : {Math.round(main.feels_like)}°C
      </p>

      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Humidité</span>
          <span className={styles.detailValue}>{main.humidity}%</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Vent</span>
          <span className={styles.detailValue}>
            {Math.round(wind.speed * 3.6)} km/h
          </span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Min / Max</span>
          <span className={styles.detailValue}>
            {Math.round(main.temp_min)}° / {Math.round(main.temp_max)}°
          </span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
