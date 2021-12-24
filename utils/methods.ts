// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#get_the_number_of_seconds_since_the_ecmascript_epoch
export const getTimestamp = (timestamp: number) => Math.floor(timestamp / 1000)
