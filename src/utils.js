


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



export function currentDateFileFormat()
{let currentdate = new Date();
  return  currentdate.getDate() + "_"
    + (currentdate.getMonth()+1)  + "_"
    + currentdate.getFullYear() + "_"
    + currentdate.getHours() + "_"
    + currentdate.getMinutes() + "_"
    + currentdate.getSeconds();

}

export function isItemInArray(array, item) {
  for (var i = 0; i < array.length; i++) {
    var count=0;
    for (var j = 0; j < item.length; j++) { 

      if (array[i][j] === item[j]) {
            count++;
        }
        if(count===item.length)
        {return i; }
      }
  }

  return -1;   // Not found
}