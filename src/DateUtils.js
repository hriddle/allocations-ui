export const getUTCDate = date => new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
export const isDateInThePast = workingDate => getUTCDate(new Date(workingDate)) < getUTCDate(new Date());