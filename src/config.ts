/**
 * Get an API KEY from https://www.alphavantage.co
 * This API is used to retrieve infraday, weekly and monthly stock charts
 **/
export const ALPHA_VANTAGE_API_KEY = "{YOUR_API_KEY}";

/**
 * Get an API KEY from https://financialmodelingprep.com/developer
 * This API is used to retrieve basic information about stock symbols
 **/
export const FINANCIAL_MODELING_PREP_API_KEY = "{YOUR_API_KEY}";

// If no API keys are provided, the app will run in demo mode
export const usingFakeData =
  ALPHA_VANTAGE_API_KEY === "{YOUR_API_KEY}" ||
  FINANCIAL_MODELING_PREP_API_KEY === "{YOUR_API_KEY}";
