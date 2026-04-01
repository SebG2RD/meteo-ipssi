import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./WeatherChart.module.css";

function WeatherChart({ data }) {
  const chartData = data.map((city) => ({
    name: city.name,
    Température: Math.round(city.main.temp),
    Min: Math.round(city.main.temp_min),
    Max: Math.round(city.main.temp_max),
  }));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Comparaison des températures</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" tick={{ fill: "var(--text)", fontSize: 12 }} />
          <YAxis unit="°C" tick={{ fill: "var(--text)", fontSize: 12 }} />
          <Tooltip
            formatter={(value) => `${value}°C`}
            contentStyle={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="Température" fill="#aa3bff" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Min" fill="#60a5fa" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Max" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeatherChart;
