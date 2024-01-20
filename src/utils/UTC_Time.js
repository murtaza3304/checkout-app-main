import moment from 'moment-timezone';
import {getTimeZone} from 'react-native-localize';
export default function UTC_Time() {
  // get utc time
  function currentUtcTime() {
    const utcMoment = moment.utc();
    return utcMoment;
  }

  // convert utc time
  function convertUTC_Time(getTime) {
    const desiredTimeZone = getTimeZone();
    const utcMoment = moment(getTime);
    const countryMoment = utcMoment.tz(desiredTimeZone);
    const formattedTime = countryMoment.format('LT');
    return formattedTime;
  }

  return {
    currentUtcTime,
    convertUTC_Time,
  };
}
