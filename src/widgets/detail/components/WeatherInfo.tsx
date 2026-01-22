interface WeatherInfoProps {
  isFavorite: boolean;
  alias: string;
  formattedAddress: string;
  isWeatherMissing: boolean;
  currentTemp: number | string | null;
  todayMaxTemp: number | string | null;
  todayMinTemp: number | string | null;
  placeAlias?: string | null;
}

export const WeatherInfo = ({
  isFavorite,
  alias,
  formattedAddress,
  isWeatherMissing,
  currentTemp,
  todayMaxTemp,
  todayMinTemp,
  placeAlias,
}: WeatherInfoProps) => {
  return (
    <div className='flex flex-col items-center flex-1 mt-6'>
      <div className='text-sm font-medium mb-1 opacity-90 flex items-center gap-1'>
        {isFavorite && <span>{placeAlias || alias}</span>}
      </div>

      <h1 className='text-lg font-semibold mb-2 text-center'>
        {formattedAddress}
      </h1>

      {isWeatherMissing ? (
        <div className='mt-6 text-sm text-white/80'>
          해당 장소의 날씨 정보가 제공되지 않습니다.
        </div>
      ) : (
        <>
          <div className='mb-4 inline-flex items-start text-8xl font-thin leading-none'>
            <span>{currentTemp ?? '-'}</span>
            <span className='ml-2 text-4xl'>°</span>
          </div>

          <div className='flex w-full items-center justify-center gap-4 opacity-90 text-center'>
            <p>최고 : {todayMaxTemp ?? '-'}°</p>
            <p>최저 : {todayMinTemp ?? '-'}°</p>
          </div>
        </>
      )}
    </div>
  );
};
