import { useWeatherInterface } from '../entities/weather/hooks/useWeatherInterface';
import { useGetWeatherData } from '../entities/weather/hooks/useGetWeatherData';
import './styles/App.css';

function App() {
  const { ncstQuery, vilageQuery, today } = useWeatherInterface();
  const { currentTemp, min, max, timeline } = useGetWeatherData(
    ncstQuery.data,
    vilageQuery.data,
    // ultraSrtFcstQuery.data,
    today
  );

  if (
    ncstQuery.isLoading ||
    vilageQuery.isLoading
    // ultraSrtFcstQuery.isLoading
  ) {
    return <div>Loading...</div>;
  }

  if (!ncstQuery.data || !vilageQuery.data) {
    return <div>No data</div>;
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <main>
          <h1>Weather</h1>
          <section>
            <h2>현재 기온</h2>
            <p>{currentTemp ?? '-'} °C</p>
          </section>
          <section>
            <h2>당일 최저/최고</h2>
            <p>최저: {min ?? '-'} °C</p>
            <p>최고: {max ?? '-'} °C</p>
          </section>
          <section>
            <h2>시간대별 기온(오늘)</h2>
            <ul>
              {timeline.map((item) => (
                <li key={`${item.fcstDate}-${item.fcstTime}`}>
                  {String(item.fcstTime).padStart(4, '0')} : {item.fcstValue} °C
                </li>
              ))}
            </ul>
          </section>
        </main>
      </header>
    </div>
  );
}

export default App;
