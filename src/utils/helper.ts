export const getTime = (time: Date | undefined) => {
  if (!time) return '';
  return new Date(time).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};
