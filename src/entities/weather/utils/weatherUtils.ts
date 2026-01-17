import type {
  UltraSrtNcstResponse,
  VilageFcstResponse,
} from '../model/VFSInterface';

export const weatherUtils = () => {
  const getCurrentTemp = (items: UltraSrtNcstResponse[]) => {
    const current = items.find((item) => item.category === 'T1H');
    return current?.obsrValue ?? null;
  };

  const getTodayTemps = (items: VilageFcstResponse[], today: string) => {
    const todayItems = items.filter((item) => String(item.fcstDate) === today);

    const minItem = todayItems.find((item) => item.category === 'TMN');
    const maxItem = todayItems.find((item) => item.category === 'TMX');
    const timeline = todayItems
      .filter((item) => item.category === 'TMP')
      .sort((a, b) => Number(a.fcstTime) - Number(b.fcstTime));

    return {
      min: minItem?.fcstValue ?? null,
      max: maxItem?.fcstValue ?? null,
      timeline,
    };
  };
  return {
    getCurrentTemp,
    getTodayTemps,
  };
};
