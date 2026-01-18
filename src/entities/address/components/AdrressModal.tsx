import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import districts from '../korea_districts.json';
import { useQueryWithKakaoGeoAddress } from '../hooks/useQueryWithKakaoGeo';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { useThrottle } from '../../../shared/hooks/useThrottle';
import { ROUTES } from '../../../pages/routes/routingConstants';
import { getAddressResults } from '../utils/searchUtils';
import { useAddressModal } from '../context/AddressModalContext';

export function AddressModal() {
  const { isOpen, closeModal } = useAddressModal();
  const [inputValue, setInputValue] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const debouncedQuery = useDebounce(inputValue, 150);
  const throttledQuery = useThrottle(debouncedQuery, 200);

  const results = useMemo(
    () => getAddressResults(districts as string[], throttledQuery, 20),
    [throttledQuery]
  );

  const {
    data: kakaoResults,
    isLoading: isKakaoLoading,
    error: kakaoError,
  } = useQueryWithKakaoGeoAddress({
    query: selectedAddress,
    analyze_type: 'similar',
    page: 1,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
      onClick={closeModal}
    >
      <div
        className='w-full max-w-xl rounded-lg bg-white p-4 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='mb-3 flex items-center justify-between text-lg font-semibold'>
          <span>주소 검색</span>
          <button
            type='button'
            onClick={closeModal}
            className='rounded px-2 py-1 text-sm text-gray-500 hover:bg-gray-100'
          >
            닫기
          </button>
        </div>
        <input
          type='text'
          name='address'
          placeholder='주소를 검색하세요'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500'
        />
        {throttledQuery.trim() && results.length === 0 && (
          <p className='mt-3 text-sm text-gray-500'>검색 결과가 없습니다.</p>
        )}
        {results.length > 0 && (
          <ul className='mt-3 max-h-64 overflow-y-auto rounded-md border border-gray-200 text-sm'>
            {results.map((item) => (
              <li
                key={item.label}
                onClick={() => setSelectedAddress(item.label)}
                className='cursor-pointer px-3 py-2 hover:bg-gray-50'
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
        {selectedAddress && (
          <div className='mt-4 rounded-md bg-gray-50 p-3 text-sm'>
            <h4 className='mb-1 font-semibold'>선택한 주소</h4>
            <p>{selectedAddress}</p>
            {isKakaoLoading && <p className='mt-2'>좌표 조회 중...</p>}
            {kakaoError && <p className='mt-2 text-red-600'>좌표 조회 실패</p>}
            {kakaoResults?.[0] && (
              <>
                <p className='mt-2'>
                  lat: {kakaoResults[0].y}, lng: {kakaoResults[0].x}
                </p>
                <Link
                  to={ROUTES.newWeather}
                  state={{
                    address: selectedAddress,
                    coords: { x: kakaoResults[0].x, y: kakaoResults[0].y },
                  }}
                  onClick={closeModal}
                  className='mt-3 inline-block rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700'
                >
                  새 날씨 페이지로 이동
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

