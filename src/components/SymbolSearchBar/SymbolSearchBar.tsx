import { List, ListItem, ListItemText } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usingFakeData } from "../../config";
import { sleep } from "../../demoData/demoData";
import useDebounce from "../../hooks/useDebounce";
import { mapSymbolDataToStockInfo } from "../../mappers/SymbolDataDtoMapper";
import SymbolData from "../../models/SymbolDataDto";
import { getStockSymbol } from "../../service/StockService/StockService";
import {
  useStockChartDispatch,
  useStockChartState,
} from "../context/StockChartContext";
import { Types } from "../context/StockChartReducer";
import MaterialThemeProvider from "../MaterialThemeProvider/MaterialThemeProvider";

const SymbolSearchBarWrapper = styled.div`
  width: 200px;
`;

const useStyles = makeStyles(() => ({
  root: {
    width: 200,
    overflow: "auto",
    maxHeight: 500,
    color: "white",
    position: "absolute",
    zIndex: 10,
    background: "rgba(31, 31, 31, 0.95)",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    "& .MuiListItemText-secondary": {
      fontSize: "12px",
    },
  },
}));

const SymbolSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SymbolData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const classes = useStyles();

  const { stockInfo } = useStockChartState();
  const symbol = stockInfo?.symbol ?? "";
  const dispatch = useStockChartDispatch();

  const setStockSymbol = (newSymbol: SymbolData) => {
    setResults([]);
    setSearchTerm(newSymbol.symbol);
    dispatch({
      type: Types.SetStock,
      payload: mapSymbolDataToStockInfo(newSymbol),
    });
  };

  useEffect(() => {
    async function searchSymbols() {
      setIsSearching(true);
      const results = await getStockSymbol(debouncedSearchTerm);
      if (usingFakeData) {
        await sleep(1000);
      }
      setIsSearching(false);
      setResults(results || []);
    }
    if (
      debouncedSearchTerm &&
      debouncedSearchTerm !== symbol &&
      searchTerm !== symbol
    ) {
      searchSymbols();
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm, symbol, searchTerm]);
  return (
    <SymbolSearchBarWrapper>
      <MaterialThemeProvider>
        <TextField
          label="Symbol"
          fullWidth={true}
          placeholder="Search for a symbol..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <>
                {isSearching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
              </>
            ),
          }}
        />
        {results.length ? (
          <List className={classes.root} component="nav">
            {results.map((result, i) => (
              <ListItem key={i} button onClick={() => setStockSymbol(result)}>
                <ListItemText
                  primary={result.symbol}
                  secondary={`${result.exchangeShortName} ${
                    result.currency ? `| ${result.currency}` : ""
                  }`}
                />
              </ListItem>
            ))}
          </List>
        ) : null}
      </MaterialThemeProvider>
    </SymbolSearchBarWrapper>
  );
};

export default SymbolSearchBar;
