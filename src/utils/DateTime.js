import moment from 'moment';
export default function DateTime() {
  function getTimeAgo(getDateTime) {
    const now = moment(); // Current timestamp
    const postTime = moment(getDateTime); // Timestamp from MongoDB

    const diffInSeconds = now.diff(postTime, 'seconds');
    const diffInMinutes = now.diff(postTime, 'minutes');
    const diffInHours = now.diff(postTime, 'hours');
    // const diffInDays = now.diff(postTime, 'days');
    // const diffInMonth = now.diff(postTime, 'months');
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      let postTimeAgo = postTime.format('LL');
      return `${postTimeAgo}`;
    }
  }

  // comments time
  function getCommentTimeAgo(getDateTime) {
    const now = moment(); // Current timestamp
    const postTime = moment(getDateTime); // Timestamp from MongoDB

    const diffInSeconds = now.diff(postTime, 'seconds');
    const diffInMinutes = now.diff(postTime, 'minutes');
    const diffInHours = now.diff(postTime, 'hours');
    const diffInDays = now.diff(postTime, 'days');
    const diffInMonth = now.diff(postTime, 'months');
    if (diffInSeconds < 60) {
      return `${diffInSeconds} s`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} m`;
    } else if (diffInHours < 24) {
      return `${diffInHours} h`;
    } else if (diffInDays < 7) {
      return `${diffInDays} d`;
    } else {
      if (diffInMonth === 0) {
        return `1m`;
      } else {
        return `${diffInMonth} m`;
      }
    }
  }

  // create mongoDB time format
  function getCurrentDateTimeISO() {
    const now = new Date();

    // Get date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    // Get time components
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    // Get timezone offset
    const timezoneOffset = now.getTimezoneOffset();
    const timezoneHours = Math.floor(Math.abs(timezoneOffset) / 60);
    const timezoneMinutes = Math.abs(timezoneOffset) % 60;
    const timezoneSign = timezoneOffset < 0 ? '+' : '-';

    // Create the ISO 8601 formatted string
    const isoDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}${String(
      timezoneHours,
    ).padStart(2, '0')}:${String(timezoneMinutes).padStart(2, '0')}`;

    return isoDateTime;
  }

  return {
    getTimeAgo,
    getCommentTimeAgo,
    getCurrentDateTimeISO,
  };
}
