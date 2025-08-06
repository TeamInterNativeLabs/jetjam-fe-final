export const formatDate = (value) => {
  const date = new Date(value);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};

export const queryParams = (data) => {
  if (data) {
    let queryStrings = Object.entries(data).map(([key, value]) => {
      console.log(typeof value);
      if (value) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
      return "";
    });

    queryStrings = queryStrings.filter((item) => item !== "");
    queryStrings = queryStrings?.length ? queryStrings.join("&") : "";

    return `?${queryStrings}`;
  }

  return "";
};

export const formatSecondsToHHMM = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(secs).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const formatSecondsToString = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} Hour${hours > 1 ? "s" : ""}`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} Minute${minutes > 1 ? "s" : ""}`);
  }

  if (secs > 0) {
    parts.push(`${secs} Second${secs > 1 ? "s" : ""}`);
  }

  return parts.length > 0 ? parts.join(" ") : "0 Seconds";
};
