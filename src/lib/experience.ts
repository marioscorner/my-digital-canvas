type Experience = {
  isCurrent?: boolean;
  startDate?: unknown;
};

const START_DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

export const isValidExperienceStartDate = (value: unknown): value is string =>
  typeof value === "string" && START_DATE_PATTERN.test(value);

export const sortExperiences = <T extends Experience>(experiences: T[]) =>
  [...experiences].sort((first, second) => {
    const currentDifference = Number(second.isCurrent === true) - Number(first.isCurrent === true);
    if (currentDifference !== 0) return currentDifference;

    const firstStartDate = isValidExperienceStartDate(first.startDate) ? first.startDate : "";
    const secondStartDate = isValidExperienceStartDate(second.startDate) ? second.startDate : "";

    if (firstStartDate === secondStartDate) return 0;
    return firstStartDate > secondStartDate ? -1 : 1;
  });

export const formatCurrentExperiencePeriod = (startDate: unknown, language: string) => {
  const currentLabel = language === "es" ? "Actual" : "Present";
  if (!isValidExperienceStartDate(startDate)) return currentLabel;

  const [year, month] = startDate.split("-").map(Number);
  const formattedStartDate = new Intl.DateTimeFormat(language === "es" ? "es-ES" : "en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));

  return `${formattedStartDate} - ${currentLabel}`;
};
