// the function this file is for utils, several utils

function generateRandomDate(){
    const startDate = '2023-01-01'; // Start date
    const endDate = '2024-01-01'; // End date

    const startTimestamp=new Date(startDate).getTime();
    const endTimestamp=new Date(endDate).getTime();

    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
    const randomDate=new Date(randomTimestamp);

    return randomDate;
}