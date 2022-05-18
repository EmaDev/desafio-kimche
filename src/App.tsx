import { useEffect, useRef, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import {themes} from './themes/theme';
import { Country } from './interfaces/CountriesInterfaces';
import { useFilterCountries } from './hooks/useFilterCountries';
import { Header } from './components/Header';
import { SearchSection } from './components/SearchSection';
import { Spinner } from './components/Spinner';
import './spinner.css';
import { Theme } from './interfaces/themeInterface';
import { Switch } from './components/Switch';

interface queryResp {
  countries: Country[];
}
const ALL_COUNTRIES = gql`
     query{
       countries{
         code,
         name,
         capital,
         native,
         emoji,
         continent{
           code
         },
         languages{
           code
         }
       }
}`

function App() {

  const [stateCountries, setStateCountries] = useState<Country[]>([]);
  const { filterState, stateFiltered, resetState } = useFilterCountries();
  const result = useQuery<queryResp>(ALL_COUNTRIES);
  const [themeState, setThemeState] = useState<Theme>(themes.light);
  const [groupByContinent, setGroupByContinent] = useState<boolean>(true);
  const refInput:any = useRef(null);

  useEffect(() => {
    if (result.data) {
      setStateCountries(result.data.countries);
    }
  }, [result]);

  const searchForName = ({ target }: any) => {

    if (target.value.trim().length === 0) {
      return resetState();
    }
    filterState(stateCountries, target.value, groupByContinent);
  }

  const changeOrderBy = (option: boolean) => {
    resetState();
    setGroupByContinent(option);
    if(refInput.current.value){
      filterState(stateCountries, refInput.current.value, option);
    }
  }
  
  if (result.loading) return <Spinner/>

  return (
    <ThemeProvider theme={themeState} >
      <div className="container">
        <Switch theme={themeState.type} setTheme={setThemeState}/>

        <Header changeOrderBy={changeOrderBy} obCont={groupByContinent}>
          <input type={'text'} 
            placeholder='Countries that include letters'
            onChange={searchForName}
            ref={refInput}
          />
        </Header>

        <SearchSection state={stateFiltered} gbCont={groupByContinent}/>
      </div>
    </ThemeProvider>
  );
}

export default App;
