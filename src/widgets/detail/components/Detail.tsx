import {
  BookmarkIcon as BookmarkOutline,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { useWeather } from '../../../entities/weather/hooks/useWeather';
import type { Place } from '../../../shared/model/place';
import { useAddressModal } from '../../../features/addressModal/context/AddressModalContext';
import { Link } from 'react-router-dom';
import { useFavoriteAddress } from '../../../features/favorite/hooks/useFavoriteAddress';
import { ROUTES } from '../../../shared/constants/routes';
import { formatAddress } from '../../../shared/utils/formatAddress';
import { dateUtils } from '../../../entities/weather/utils/dateUtils';
import { weatherUtils } from '../../../entities/weather/utils/weatherUtils';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';
import { useTimelineScroll } from '../hooks/useTimelineScroll';
import FavoriteWeathers from '../../favoriteWeathers/FavoriteWeathers';

const getTimelineIcon = (skyCode: number | null, ptyCode: number | null) => {
  if (ptyCode && ptyCode !== 0) {
    if ([2, 3, 6, 7].includes(ptyCode)) {
      return (
        <img
          src='/icons/snow.png'
          alt='cloud-rain'
          className='h-6 w-6 invert brightness-200'
        />
      );
    }
    return (
      <img
        src='/icons/rain.png'
        alt='cloud-rain'
        className='h-6 w-6 invert brightness-200'
      />
    );
  }
  if (skyCode === 3) {
    return (
      <img
        src='/icons/sunCloud.png'
        alt='cloud-rain'
        className='h-6 w-6 invert brightness-200'
      />
    );
  }
  if (skyCode === 4) {
    return <CloudIcon className='h-6 w-6 text-white/80' />;
  }
  return <SunIcon className='h-6 w-6 text-white/80' />;
};

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

  const { formatDate } = dateUtils();
  const { getTodayTemps } = weatherUtils();
  const today = formatDate(new Date());
  const { timeline } = getTodayTemps(todayWeatherData ?? [], today);
  const { containerRef, scrollTimeline } = useTimelineScroll();

  const isWeatherMissing =
    !isCurrentWeatherLoading &&
    !isTodayWeatherLoading &&
    currentTemp === null &&
    todayMinTemp === null &&
    todayMaxTemp === null;

  return (
    <div className='relative h-[calc(100vh-110px)] w-full rounded-2xl bg-linear-to-b from-blue-400 to-blue-600 p-[3px] text-white'>
      <div className='mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 rounded-2xl p-2 lg:flex-row lg:items-start'>
        <FavoriteWeathers variant='sidebar' selectedPlace={place} />

        <div className='flex w-full min-w-0 flex-1 flex-col items-center'>
          {/* 상단 액션 바 */}
          <div className='w-full flex justify-between items-start mb-10'>
            {/* 즐겨찾기 섹션 (좌측) */}
            <div className='flex items-center gap-2'>
              <Link
                to={ROUTES.favoriteWeathers}
                className='text-3xl drop-shadow-md lg:hidden'
                aria-label='즐겨찾기 목록'
              >
                <ListBulletIcon className='h-8 w-8 text-white' />
              </Link>
              <button
                type='button'
                onClick={isFavorite ? removeFavorite : openAliasEditor}
                className='text-3xl drop-shadow-md'
              >
                {/* 북마크 아이콘*/}
                {isFavorite ? (
                  <BookmarkSolid className='h-8 w-8 text-white' />
                ) : (
                  <BookmarkOutline className='h-8 w-8 text-white' />
                )}
              </button>

              {/* 별칭 섹션 */}
              {isEditingAlias && (
                <div className='flex bg-white/20 backdrop-blur-md rounded-lg p-1 animate-fadeIn'>
                  <input
                    type='text'
                    value={alias}
                    maxLength={6}
                    onChange={(e) => setAlias(e.target.value.slice(0, 6))}
                    placeholder='별칭 입력'
                    className='bg-transparent border-none outline-none px-2 text-sm w-24 placeholder:text-blue-100'
                  />
                  <button
                    type='button'
                    onClick={saveFavorite}
                    className='px-2 text-sm font-bold'
                  >
                    저장
                  </button>
                  <button
                    type='button'
                    onClick={closeAliasEditor}
                    className='px-2 text-sm'
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* 주소 검색 버튼 (우측 상단 + 모양) */}
            <button type='button' onClick={openModal}>
              <MagnifyingGlassIcon className='h-9 w-9 text-white' />
            </button>
          </div>

          {/* 중앙 날씨 정보 */}
          <div className='flex flex-col items-center flex-1 mt-6'>
            {/* 별칭 노출 (주소 위) */}
            <div className='text-sm font-medium mb-1 opacity-90 flex items-center gap-1'>
              {isFavorite && <span>{place.alias || alias}</span>}
            </div>

            <h1 className='text-lg font-semibold mb-2 text-center'>
              {formatAddress(place.address) || '-'}
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

          {/* 시간별 날씨 그래프 */}
          <div className='w-full mt-6 border-t border-white/20 pt-4 pb-6'>
            {isTodayWeatherLoading ? (
              <div className='h-32 flex items-center justify-center text-white/50 italic'>
                <LoadingSpinner />
              </div>
            ) : timeline.length === 0 ? (
              <div className='h-32 flex items-center justify-center text-white/50 italic'>
                시간대별 날씨 정보가 없습니다
              </div>
            ) : (
              <div className='flex items-center gap-3'>
                <button
                  type='button'
                  onClick={() => scrollTimeline('left')}
                  aria-label='이전 시간대'
                  className='shrink-0 rounded-full bg-white/10 p-2 text-white/80 backdrop-blur-md hover:bg-white/20'
                >
                  <ChevronLeftIcon className='h-5 w-5' />
                </button>
                <div
                  ref={containerRef}
                  className='flex w-full gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                >
                  {timeline.map((item) => {
                    const hour = String(item.fcstTime).slice(0, 2);
                    return (
                      <div
                        key={`${item.fcstDate}-${item.fcstTime}`}
                        className='min-w-[72px] flex flex-col items-center gap-2'
                      >
                        <span className='text-sm text-white/90'>{hour}시</span>
                        <div className='flex items-center gap-2'>
                          {getTimelineIcon(item.skyCode, item.ptyCode)}
                        </div>
                        <span className='text-lg font-semibold'>
                          {item.fcstValue}°
                        </span>
                      </div>
                    );
                  })}
                </div>
                <button
                  type='button'
                  onClick={() => scrollTimeline('right')}
                  aria-label='다음 시간대'
                  className='shrink-0 rounded-full bg-white/10 p-2 text-white/80 backdrop-blur-md hover:bg-white/20'
                >
                  <ChevronRightIcon className='h-5 w-5' />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
