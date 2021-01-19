function formatDate(date){
    const dateString = date.toISOString().split('T')[0];
    return dateString;
}

function convertToTimestamp(date){
    let [yr, mo, dt] = date.split('-');
    mo = mo -1;
    return new Date(yr, mo, dt).getTime()/(1000*60*60*24);
}

function calculateTimeLapseInDays(start, end){
    // start: 2012-01-12
    return convertToTimestamp(end) - convertToTimestamp(start);
}



// console.log(calculateTimeLapseInDays('2012-01-12', '2012-01-13'))

function futureDate(date, lapse){ 
    const d = convertToTimestamp(date);
    const newd = (d + lapse)*24*60*60*1000;
    return formatDate(new Date(newd));

}

console.log(futureDate('2012-04-08', 28));