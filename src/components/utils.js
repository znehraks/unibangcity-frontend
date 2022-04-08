export const unitTransformer = (value) => {
  return value >= 10000
    ? `${Math.floor(value / 10000)}억 ${
        value % 10000 === 0 ? "(원)" : `${value % 10000}(만 원)`
      }`
    : `${value}(만 원)`;
};
