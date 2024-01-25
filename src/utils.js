function timeFormat(defaultFormatDate) {
  let formattedDate =
    String(defaultFormatDate).slice(0, 4) +
    "/" +
    String(defaultFormatDate).slice(5, 7) +
    "/" +
    String(defaultFormatDate).slice(8, 10) +
    " " +
    String(defaultFormatDate).slice(11, 19);

  return formattedDate;
}

function parseArray(string) {
  const parts = string.split(",");
  return parts.map((item) => item.trim());
}

function formatArray(arr) {
  if (Array.isArray(arr)) {
    return arr.join(", ");
  } else if (arr) {
    return String(arr);
  } else {
    return "";
  }
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function isAlmostEmpty(obj) {
  return Object.keys(obj).length <= 1;
}

function jobIsIncomplete(job) {
  return ["submitted", "running", "validated"].includes(job.status);
}

export { timeFormat, parseArray, formatArray, isEmpty, isAlmostEmpty, jobIsIncomplete };
