export default function formatDate(date: Date){
    const dateString = date.toISOString().split('T')[0];
    return dateString;
}

function convertToTimestamp(date: any){
    let [yr, mo, dt] = date.split('-');
    mo = mo -1;
    return new Date(yr, mo, dt).getTime()/(1000*60*60*24);
}

export function calculateTimeLapseInDays(start:string, end:string){
    // start: 2012-01-12
    return convertToTimestamp(end) - convertToTimestamp(start);
}



// console.log(calculateTimeLapseInDays('2012-01-12', '2012-01-13'));

export function futureDate(date: string, lapse: number){ 
    const d = convertToTimestamp(date);
    const newDate = new Date((d + lapse)*24*60*60*1000);
    return formatDate(newDate);

}