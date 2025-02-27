const DEFAULT_NUMBER_FORMAT_OPTIONS: Intl.NumberFormatOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const currencyFormatter = (
  value: number,
  locals = "de-DE",
  options = DEFAULT_NUMBER_FORMAT_OPTIONS
) => {
  return new Intl.NumberFormat(locals, options).format(value);
};
