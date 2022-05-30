export const memoize = <T>(func) => {
  const cache: { [key in string]: T } = {};
  let queryDbCount = 0;
  let callCount = 0;

  return (...args) => {
    const key = args[0];

    if (!cache[key]) {
      cache[key] = func(...args);

      queryDbCount++;
    }

    callCount++;

    console.log('callCount:' + callCount);
    console.log('queryDbCount:' + queryDbCount);

    return cache[key];
  };
};
