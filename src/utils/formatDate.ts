import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export default function formatDate(val: any) {
  return dayjs(val).format(DATE_TIME_FORMAT)
}
