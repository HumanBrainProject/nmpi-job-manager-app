


export function timeFormat(defaultFormatDate)
{
let formattedDate = String(defaultFormatDate).slice(0,4)+"/"+String(defaultFormatDate).slice(5,7)+"/"+String(defaultFormatDate).slice(8,10)+" "+String(defaultFormatDate).slice(11,19);

return formattedDate;

}


export function currentDate()
{let currentdate = new Date();
  return  currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

}
