import { parsingUtils } from '../utils/parsingUtils';
import { useUltraSrtNcst, useVilageFcst } from './useQueryWithWeather';

export function useWeatherInterface() {
  const now = new Date();
  const { getUltraSrtNcstBase, getVilageBase, formatDate } = parsingUtils();
  const ncstBase = getUltraSrtNcstBase(now);
  const vilageBase = getVilageBase(now);
  const today = formatDate(now);

  const ncstQuery = useUltraSrtNcst({
    ...ncstBase,
    nx: 57,
    ny: 129,
    numOfRows: 10,
    pageNo: 1,
    dataType: 'JSON',
  });

  // const ultraSrtFcstQuery = useUltraSrtFcst({
  //   ...ncstBase,
  //   nx: 60,
  //   ny: 126,
  //   numOfRows: 10,
  //   pageNo: 1,
  //   dataType: 'JSON',
  // });

  const vilageQuery = useVilageFcst({
    ...vilageBase,
    nx: 57,
    ny: 129,
    numOfRows: 500,
    pageNo: 1,
    dataType: 'JSON',
  });

  return { ncstQuery, vilageQuery, today };
}
