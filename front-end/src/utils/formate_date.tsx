export const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
  
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
  
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    hours = hours % 12 || 12;
  
    return `${day} ${month} ${year} ${hours}:${minutes}${ampm}`;
  };
  