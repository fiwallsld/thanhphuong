function formatDate(date) {
  const subDate = date.split("T")[0].split("-");

  const day = +subDate[2] + 1;
  const res = `${day < 10 ? "0" : ""}${day}/${subDate[1]}/${subDate[0]}`;
  return res;
}

export default formatDate;
