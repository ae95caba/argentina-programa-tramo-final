function ISO8601DateStringToHHMMString(timeString) {
  const convertedDate = new Date(timeString);
  const hours = convertedDate.getHours().toString().padStart(2, "0");
  const minutes = convertedDate.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export { ISO8601DateStringToHHMMString };
