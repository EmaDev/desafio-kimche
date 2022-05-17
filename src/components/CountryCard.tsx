import { FC, useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { Country, Language, State } from '../interfaces/CountriesInterfaces';
import { Spinner } from './Spinner';


interface Props {
  country: Country;
}
const GET_COUNTRY = gql`
  query GetCountryByCode($codeToSearch: ID!){
    country(code: $codeToSearch){
      phone,
      currency,
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
const Card = styled.div`
  padding: 1rem;
  background-color: var(--grisClaro);
  margin: 1rem;
  border: 1px solid var(--negro);
  border-radius: 8px;
`;
const CountryName = styled.div`
  display: flex;
  align-itmes: center;
  p{
    font-size: 2rem;
    margin: 0 .5rem;
    padding:0;
  }
  h2{
    margin: 0;
    padding: 0;
    font-weight: bold;
    font-size: 2rem;
   }
`;
const CountryAtribute = styled.p`
   margin: .3rem;
   font-size: 1.7rem;
   font-weigth: bold;
   span{
     font-size: 1.6rem;
     font-weight:bold;
   }
`;
const Button = styled.button`
   display: block;
   width: 100%;
   margin-top: 1.5rem;
   padding: .5rem 1rem;
   border-radius: 10px; 
   background-color: var(--grisOscuro);
   border-style: none;
   border: 1px solid var(--negro);
`;

const exa = () => {
  
}
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


  const showDataArray2 = (data: any,field:string ) => {
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
        {/*TODO: Mostrar emoji*/}
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
