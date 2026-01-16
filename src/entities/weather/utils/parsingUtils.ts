import type {
  UltraSrtNcstResponseParams,
  VilageFcstResponseParams,
} from '../model/VFSInterface';

const pad2 = (value: number) => String(value).padStart(2, '0');

export const parsingUtils = () => {
  const formatDate = (date: Date) =>
    `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}`;

  const getUltraSrtNcstBase = (now: Date) => {
    const base = new Date(now);
    if (base.getMinutes() < 10) {
      base.setHours(base.getHours() - 1);
    }
    base.setMinutes(0, 0, 0);
    return {
      base_date: formatDate(base),
      base_time: `${pad2(base.getHours())}00`,
    };
  };

  const getVilageBase = (now: Date) => {
    const base = new Date(now);
    base.setDate(base.getDate() - 1);
    return {
      base_date: formatDate(base),
      base_time: '2300',
    };
  };

  const getCurrentTemp = (items: UltraSrtNcstResponseParams[]) => {
    const current = items.find((item) => item.category === 'T1H');
    return current?.obsrValue ?? null;
  };

  const getTodayTemps = (items: VilageFcstResponseParams[], today: string) => {
    const todayItems = items.filter((item) => String(item.fcstDate) === today);

    const minItem = todayItems.find((item) => item.category === 'TMN');
    const maxItem = todayItems.find((item) => item.category === 'TMX');
    const timeline = todayItems
      .filter((item) => item.category === 'TMP')
      .sort((a, b) => a.fcstTime - b.fcstTime);

    return {
      min: minItem?.fcstValue ?? null,
      max: maxItem?.fcstValue ?? null,
      timeline,
    };
  };
  return {
    formatDate,
    getUltraSrtNcstBase,
    getVilageBase,
    getCurrentTemp,
    getTodayTemps,
  };
};
