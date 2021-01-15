function getToday() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    return (curr_year + "-" + curr_month + "-" + curr_date);
}


export { getToday };