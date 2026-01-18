import { useWeather } from "../hooks/useWeather";
import { Place } from "../model/place";
import { useAddressModal } from "../../address/context/AddressModalContext";

export function Detail({place} : {place: Place}) {
  const { openModal, closeModal } = useAddressModal();

  const { todayWeatherData, currentTemp, todayMinTemp, todayMaxTemp } =
    useWeather({ x: place.lat, y: place.lng });

  return <div>
 
  <div>
    <button type="button" onClick={openModal}>
      주소 검색 열기
    </button>
    <button type="button" onClick={closeModal}>
      주소 검색 닫기
    </button>
  </div>

  <div>현재 기온: {currentTemp ?? '-'} °C</div>
  <div>당일 최저: {todayMinTemp ?? '-'} °C</div>
  <div>당일 최고: {todayMaxTemp ?? '-'} °C</div> 
  <div>현지 위치 주소 : {place.address ?? '-'}</div>
  {todayWeatherData?.map((item) => (
    <div key={item.fcstDate}>
      {item.category === 'TMP' && (
      <>
      <div>현재 위치 주소: {item.fcstDate === '20260117' ? '2026년 1월 17일' : item.fcstDate === '20260118' ? '2026년 1월 18일' : '-'}</div>
      <div>현재 위치 주소: {item.fcstTime ?? '-'}</div>
      <div>현재 위치 주소: {item.fcstValue ?? '-'} °C</div>
      </>
      )}
    </div>
  ))}
</div>;
}
 