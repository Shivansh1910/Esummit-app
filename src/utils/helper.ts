import { Platform } from 'react-native';

export const getTime = (time: Date | undefined) => {
  if (!time) return '';
  return new Date(time).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const filterData = (
  data: any,
  filterCategory: string,
  filterDay: string[],
  filterVenue: string,
) => {
  return data
    .filter(item => {
      if (filterCategory === '') {
        return item;
      } else if (item.category === filterCategory) {
        return item;
      }
    })
    .filter(item => {
      if (filterDay.length === 0) {
        return item;
      } else {
        if (filterDay.includes(item.day)) {
          return item;
        }
      }
    })
    .filter(item => {
      if (filterVenue === '') {
        return item;
      } else if (item.venue === filterVenue) {
        return item;
      }
    });
};

export const mapUrl = (latitude: string, longitude: string, name:string) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${latitude},${longitude}`;
  const label = name;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });
  return url;
};
