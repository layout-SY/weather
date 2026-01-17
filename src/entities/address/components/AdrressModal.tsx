import React, { useMemo, useState } from 'react';
import { useQueryWithKakaoGeoAddress } from '../hooks/useQueryWithKakaoGeoAddress';
import { latLngToGridXY } from '../utils/latLngToGridXY';

export function AddressModal() {
  const [searchQuery, setSearchQuery] = useState('');

  const params = useMemo(
    () => ({
      query: searchQuery,
      analyze_type: 'similar' as const,
      page: 1,
      size: 10,
    }),
    [searchQuery]
  );

  const { data, isLoading, error } = useQueryWithKakaoGeoAddress(params);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const address = formData.get('address') as string;
    setSearchQuery(address.trim());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' name='address' placeholder='주소를 검색하세요' />
        <button type='submit'>검색</button>
      </form>
      {isLoading && <p>검색 중...</p>}
      {error && <p>검색 실패</p>}
      {data && (
        <ul>
          {data.map((item) => {
            const lat = Number(item.y);
            const lng = Number(item.x);
            const grid =
              Number.isFinite(lat) && Number.isFinite(lng)
                ? latLngToGridXY({ lat, lng })
                : null;
            return (
              <li key={`${item.address_name}-${item.x}-${item.y}`}>
                {item.address_name}
                {grid && (
                  <>
                    {' '}
                    · x: {grid.x}, y: {grid.y}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
