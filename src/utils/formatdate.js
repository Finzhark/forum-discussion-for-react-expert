const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);

  const daysInIndonesian = [
    'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu',
  ];
  const monthsInIndonesian = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];
  const dayName = daysInIndonesian[date.getDay()];
  const dayNumber = String(date.getDate()).padStart(2, '0');
  const monthName = monthsInIndonesian[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${dayName}, ${dayNumber} ${monthName} ${year} ${hours}:${minutes}`;
};

export default formatDate;
