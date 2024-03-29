# A simple stock chart finder and display

![Screenshot](https://andris.gauracs.com/images/78f4a285-3e8d-479a-9fdd-00937460372f.gif)

This sample project provides the ability to search for individual stocks and display their financial data charts for different time periods.

<hr></hr>

## Demo

https://andrisgauracs.github.io/react-simple-stock-charts/

## Libraries used

- [Recharts](https://recharts.org/en-US/)
- [Axios](https://github.com/axios/axios)
- [Material UI](https://material-ui.com/)

## API providers

- [Aplha Vantage](https://www.alphavantage.co/) - for retrieving financial data charts
- [Financial Modeling Prep](https://financialmodelingprep.com/developer) - for stock symbol lookup

## Installation

```sh
$ yarn
```

## Run the project

```sh
$ yarn start
```

## Live mode / demo mode

By default the app runs with demo data provided in the project.
To switch to live mode, you need to retrieve the API keys from the two API providers mentioned, and replace them in the `config.ts` file:

```
export const ALPHA_VANTAGE_API_KEY = "{YOUR_API_KEY}";
export const FINANCIAL_MODELING_PREP_API_KEY = "{YOUR_API_KEY}";
```

## License

MIT
