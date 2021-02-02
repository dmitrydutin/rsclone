export function getDateString(date, language) {
    const newDate = new Date(date);
    const months =
        language === 'english'
            ? [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
              ]
            : [
                  'Января',
                  'Февраля',
                  'Марта',
                  'Апреля',
                  'Мая',
                  'Июня',
                  'Июля',
                  'Августа',
                  'Сентября',
                  'Октября',
                  'Ноября',
                  'Декабря',
              ];
    return `${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`;
}
