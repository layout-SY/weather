import { ActionBar } from './ActionBar';
import { FavoriteSidebar } from './FavoriteSidebar';
import { TimelineSection } from './TimelineSection';
import { WeatherInfo } from './WeatherInfo';
import { useWeather } from '../../../entities/weather/hooks/useWeather';
import type { Place } from '../../../shared/model/place';
import { useAddressModal } from '../../../features/addressModal/context/AddressModalContext';
import { useFavoriteAddress } from '../../../features/favorite/hooks/useFavoriteAddress';
import { formatAddress } from '../../../shared/utils/formatAddress';
import { weatherUtils } from '../../../entities/weather/utils/weatherUtils';
import { useWindowSize } from '../../../shared/hooks/useWindowSize';
import { useTimelineScroll } from '../hooks/useTimelineScroll';

export function Detail({ place }: { place: Place }) {
  const { openModal } = useAddressModal();
  const {
    alias,
    isFavorite,
    isEditingAlias,
    openAliasEditor,
    closeAliasEditor,
    saveFavorite,
    removeFavorite,
    setAlias,
  } = useFavoriteAddress(place);

  const {
    currentTemp,
    todayMinTemp,
    todayMaxTemp,
    todayWeatherData,
    isCurrentWeatherLoading,
    isTodayWeatherLoading,
  } = useWeather({ x: place.lat, y: place.lng });

  const { getTodayTemps } = weatherUtils();
  const { timeline } = getTodayTemps(todayWeatherData ?? []);
  const { containerRef, scrollTimeline } = useTimelineScroll();
  const { width } = useWindowSize();

  const isWeatherMissing =
    !isCurrentWeatherLoading &&
    !isTodayWeatherLoading &&
    currentTemp === null &&
    todayMinTemp === null &&
    todayMaxTemp === null;

  return (
    <div className='relative h-[calc(100vh-110px)] w-full rounded-2xl bg-linear-to-b from-blue-400 to-blue-600 p-[3px] text-white'>
      <div className='mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 rounded-2xl p-2 lg:flex-row lg:items-start'>
        <FavoriteSidebar isDesktop={width >= 1024} place={place} />

        <div className='flex w-full min-w-0 flex-1 flex-col items-center'>
          <ActionBar
            isFavorite={isFavorite}
            isEditingAlias={isEditingAlias}
            alias={alias}
            openAliasEditor={openAliasEditor}
            closeAliasEditor={closeAliasEditor}
            saveFavorite={saveFavorite}
            removeFavorite={removeFavorite}
            setAlias={setAlias}
            openModal={openModal}
          />

          <WeatherInfo
            isFavorite={isFavorite}
            alias={alias}
            formattedAddress={formatAddress(place.address) || '-'}
            isWeatherMissing={isWeatherMissing}
            currentTemp={currentTemp}
            todayMaxTemp={todayMaxTemp}
            todayMinTemp={todayMinTemp}
            placeAlias={place.alias}
          />

          <TimelineSection
            isTodayWeatherLoading={isTodayWeatherLoading}
            timeline={timeline}
            containerRef={containerRef}
            scrollTimeline={scrollTimeline}
          />
        </div>
      </div>
    </div>
  );
}
