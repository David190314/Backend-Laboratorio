const date = new Date()
const objDate = {
    'year': date.getFullYear(),
    'month': date.getMonth()+1,
    'day':  date.getDate(),
    'hour': date.getHours(),
    'minutes': date.getMinutes()
}
export const fullDate = objDate.year+'-'+objDate.month+'-'+objDate.day+' '+objDate.hour+':'+objDate.minutes