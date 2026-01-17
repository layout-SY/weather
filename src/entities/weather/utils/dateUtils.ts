export const dateUtils = () => {
    const pad2 = (value: number) => String(value).padStart(2, '0');


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

      return {
        pad2,
        formatDate,
        getUltraSrtNcstBase,
        getVilageBase,
      };
}