
export default function formatDate(date: Date){
    const dateString = date.toISOString().split('T')[0];
    return dateString;
}