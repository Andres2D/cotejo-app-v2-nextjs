import countriesFlag from "../constants/countries-flags"

export const getCountryFlag = (name: string) => {
  const country = countriesFlag.filter(c => c.name === name);
  return country[0].flag;
}
