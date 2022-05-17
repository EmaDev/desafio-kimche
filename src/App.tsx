import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Country } from './interfaces/CountriesInterfaces';
import { useFilterCountries } from './hooks/useFilterCountries';
import { useForm } from './hooks/useForm';
import { Header } from './components/Header';
import { SearchSection } from './components/SearchSection';
import './spinner.css';
import { Spinner } from './components/Spinner';

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
         emojiU,
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
  const [groupByContinent, setGroupByContinent] = useState<boolean>(true);
  const { values, handleInputChange, reset } = useForm({ countryName: '' });
  const { countryName }: any = values;

  useEffect(() => {
    if (result.data) {
      setStateCountries(result.data.countries);
    }
  }, [result]);

  const searchForName = ({ target }: any) => {
    handleInputChange(target);
    if (target.value.trim().length === 0) {
      return resetState();
    }
    filterState(stateCountries, target.value, groupByContinent);
  }

  const changeOrderBy = (option:boolean) => {
    reset();
    resetState();
    setGroupByContinent(option)
  }

  if (result.loading) return <Spinner/>
  if (result.error) return <h2>Error al cargar la informacion</h2>

  return (
    <div className="container">
      <Header changeOrderBy={changeOrderBy} obCont={groupByContinent}>
        <input type={'text'} placeholder='Countries that include letters'
          name='countryName'
          value={countryName}
          onChange={searchForName}
        />
      </Header>
      <SearchSection state={stateFiltered} gbCont={groupByContinent} searched={countryName}/>
    </div>
  );
}

export default App;
