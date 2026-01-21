import { useWeather } from '../hooks/useWeather';
import { Place } from '../model/place';
import { useAddressModal } from '../../address/context/AddressModalContext';
import { useFavoriteAddress } from '../../favorite/hooks/useFavoriteAddress';

export function Detail({ place }: { place: Place }) {
  const { openModal, closeModal } = useAddressModal();
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
  const { todayWeatherData, currentTemp, todayMinTemp, todayMaxTemp } =
    useWeather({ x: place.lat, y: place.lng });

  return (
    <div>
      <div>
        <button type='button' onClick={openModal}>
          주소 검색 열기
        </button>
        <button type='button' onClick={closeModal}>
          주소 검색 닫기
        </button>
      </div>
      <div>
        <div>별칭: {place.alias || alias || '-'}</div>
        {!isEditingAlias && (
          <button
            type='button'
            onClick={isFavorite ? removeFavorite : openAliasEditor}
          >
            {isFavorite ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기'}
          </button>
        )}
        {isFavorite && !isEditingAlias && (
          <button type='button' onClick={openAliasEditor}>
            별칭 수정하기
          </button>
        )}
        {isEditingAlias && (
          <div>
            <label>
              별칭(선택):{' '}
              <input
                type='text'
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder='예: 우리집'
              />
            </label>
            <button type='button' onClick={saveFavorite}>
              저장
            </button>
            <button type='button' onClick={closeAliasEditor}>
              취소
            </button>
          </div>
        )}
      </div>

      <div>현재 기온: {currentTemp ?? '-'} °C</div>
      <div>당일 최저: {todayMinTemp ?? '-'} °C</div>
      <div>당일 최고: {todayMaxTemp ?? '-'} °C</div>
      <div>현지 위치 주소 : {place.address ?? '-'}</div>
      {todayWeatherData?.map((item) => (
        <div key={item.fcstDate}>
          {item.category === 'TMP' && (
            <>
              <div>현재 위치 날짜: {item.fcstDate ?? '-'}</div>
              <div>현재 위치 시간: {item.fcstTime ?? '-'}</div>
              <div>현재 위치 기온: {item.fcstValue ?? '-'} °C</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
