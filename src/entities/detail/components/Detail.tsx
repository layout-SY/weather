import { useWeather } from '../hooks/useWeather';
import { Place } from '../model/place';
import { useAddressModal } from '../../address/context/AddressModalContext';
import { Link } from 'react-router-dom';
import { useFavoriteAddress } from '../../favorite/hooks/useFavoriteAddress';
import { ROUTES } from '../../../pages/routes/routingConstants';
import { formatAddress } from '../../../shared/utils/formatAddress';
import { FavoriteWeathers } from '../../../pages/favoriteWeathers/FavoriteWeathers';
import {
  BookmarkIcon as BookmarkOutline,
  ListBulletIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';

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
    isCurrentWeatherLoading,
    isTodayWeatherLoading,
  } = useWeather({ x: place.lat, y: place.lng });


  const isWeatherMissing =
    !isCurrentWeatherLoading &&
    !isTodayWeatherLoading &&
    currentTemp === null &&
    todayMinTemp === null &&
    todayMaxTemp === null;

  return (
    <div className="relative h-[calc(100vh-110px)] w-full rounded-2xl bg-linear-to-b from-blue-400 to-blue-600 p-[3px] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 rounded-2xl p-2 lg:flex-row lg:items-start">
        <FavoriteWeathers variant="sidebar" />

        <div className="flex w-full min-w-0 flex-1 flex-col items-center">
          {/* 상단 액션 바 */}
          <div className="w-full flex justify-between items-start mb-10">
            {/* 즐겨찾기 섹션 (좌측) */}
            <div className="flex items-center gap-2">
              <Link
                to={ROUTES.favoriteWeathers}
                className="text-3xl drop-shadow-md lg:hidden"
                aria-label="즐겨찾기 목록"
              >
                <ListBulletIcon className="h-8 w-8 text-white" />
              </Link>
              <button
                type="button"
                onClick={isFavorite ? removeFavorite : openAliasEditor}
                className="text-3xl drop-shadow-md"
              >
                {/* 북마크 아이콘*/}
                {isFavorite ? (
                  <BookmarkSolid className="h-8 w-8 text-white" />
                ) : (
                  <BookmarkOutline className="h-8 w-8 text-white" />
                )}
              </button>

              {isEditingAlias && (
                <div className="flex bg-white/20 backdrop-blur-md rounded-lg p-1 animate-fadeIn">
                  <input
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    placeholder="별칭 입력"
                    className="bg-transparent border-none outline-none px-2 text-sm w-24 placeholder:text-blue-100"
                  />
                  <button type="button" onClick={saveFavorite} className="px-2 text-sm font-bold">저장</button>
                  <button type="button" onClick={closeAliasEditor} className="px-2 text-sm">✕</button>
                </div>
              )}
            </div>

            {/* 주소 검색 버튼 (우측 상단 + 모양) */}
            <button
              type="button"
              onClick={openModal}
            >
              <MagnifyingGlassIcon className="h-9 w-9 text-white" />
            </button>
          </div>

          {/* 중앙 날씨 정보 */}
          <div className="flex flex-col items-center flex-1 mt-6">
            {/* 별칭 노출 (주소 위) */}
            <div className="text-sm font-medium mb-1 opacity-90 flex items-center gap-1">
              {isFavorite && <span>{place.alias || alias}</span>}
            </div>

            <h1 className="text-lg font-semibold mb-2 text-center">
              {formatAddress(place.address) || '-'}
            </h1>

            {isWeatherMissing ? (
              <div className="mt-6 text-sm text-white/80">
                해당 장소의 날씨 정보가 제공되지 않습니다.
              </div>
            ) : (
              <>
                <div className="mb-4 inline-flex items-start text-8xl font-thin leading-none">
                  <span>{currentTemp ?? '-'}</span>
                  <span className="ml-2 text-4xl">°</span>
                </div>

                <div className="flex w-full items-center justify-center gap-4 opacity-90 text-center">
                  <p>최고 : {todayMaxTemp ?? '-'}°</p>
                  <p>최저 : {todayMinTemp ?? '-'}°</p>
                </div>
              </>
            )}
          </div>

          {/* 시간별 날씨 그래프 영역 (구현 제외, 영역만 구분) */}
          <div className="w-full mt-6 border-t border-white/20 pt-4 pb-6">
            <div className="h-32 flex items-center justify-center text-white/50 italic">
              [시간별 날씨 그래프 영역]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}