import { FC, useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Country, Language} from '../interfaces/CountriesInterfaces';
import { Spinner } from './Spinner';
import { Card, CountryAtribute, CountryName,Button} from './CountryCard.element';


interface Props {
  country: Country;
}
const GET_COUNTRY = gql`
  query GetCountryByCode($codeToSearch: ID!){
    country(code: $codeToSearch){
      phone,
      currency,
      emojiU,
      languages{
        name
      }
      continent{
        name
      },
      states{
        name,
        code
      }
    }
  }
`

export const CountryCard: FC<Props> = ({ country }) => {

  const [showMore, setShowMore] = useState<boolean>(false);
  const [queryExcecuted, setQueryExcecuted] = useState<boolean>(false);
  const [countryData, setCountryData] = useState<Props>();
  const [getCountryData, result] = useLazyQuery(GET_COUNTRY);

  const showMoreData = (code: string) => {
    setShowMore(!showMore);
    
    if(!queryExcecuted){
      getCountryData({ variables: { codeToSearch: code } });
    }
  }

  useEffect(() => {
    if (result.data) {
      setCountryData(result.data)
    }
  }, [result]);

  const showDataArray = (data: Language[] | any,field:string ) => {
    let str = '';
    
    for( let i = 0; i < data.length; i++){
      if(i > 0){
        str += `, ${data[i].name}`;
      }else{
        str += data[i].name;
      }
    }
    return (
      <CountryAtribute><span>{field}: </span>{str}</CountryAtribute>
    )
  };

  return (
    <Card>
      <CountryName>
        <p>{country.emoji}</p>
        <h2>{country.name}</h2>
      </CountryName>
      <CountryAtribute><span>Capital: </span>{country.capital}</CountryAtribute>
      <CountryAtribute><span>Native: </span>{country.native}</CountryAtribute>
      {
        (showMore) &&
        <>
          {(countryData) ?
            <>
              <CountryAtribute><span>Currency: </span>{countryData.country.currency}</CountryAtribute>
              <CountryAtribute><span>Phone: </span>{countryData.country.phone}</CountryAtribute>
              <CountryAtribute><span>Emoji Unicode: </span>{countryData.country.emojiU}</CountryAtribute>
              {showDataArray(countryData.country.languages, 'Languages')}
              {showDataArray(countryData.country.states, 'States')}
            </>
            :
            <Spinner/>
          }
        </>
      }
      <Button onClick={() => showMoreData(country.code)}>
        {(showMore) ? 'Show less' : 'Show more'}
      </Button>

    </Card>
  )
}
