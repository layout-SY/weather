import {
  PTY_CODE_LABELS,
  SKY_CODE_LABELS,
} from '../constants/weatherStateConstants';
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
    const skyByTime = new Map<string, number>();
    const ptyByTime = new Map<string, number>();
    todayItems.forEach((item) => {
      if (item.category === 'SKY') {
        skyByTime.set(item.fcstTime, Number(item.fcstValue));
      }
      if (item.category === 'PTY') {
        ptyByTime.set(item.fcstTime, Number(item.fcstValue));
      }
    });
    const timeline = todayItems
      .filter((item) => item.category === 'TMP')
      .sort((a, b) => Number(a.fcstTime) - Number(b.fcstTime))
      .map((item) => {
        const skyCode = skyByTime.get(item.fcstTime);
        const ptyCode = ptyByTime.get(item.fcstTime);
        return {
          ...item,
          skyCode: skyCode ?? null,
          skyLabel:
            skyCode !== undefined ? SKY_CODE_LABELS[skyCode] ?? null : null,
          ptyCode: ptyCode ?? null,
          ptyLabel:
            ptyCode !== undefined ? PTY_CODE_LABELS[ptyCode] ?? null : null,
        };
      });

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
