import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Country, Language } from '../interfaces/CountriesInterfaces';
import { CountryCard } from './CountryCard';

interface Props {
    countries: Country[];
    order: string;
}

const Container = styled.div`
   @media( min-width: 540px ) {
    display: grid;
    grid-template-columns: 50% 50%;
   }
`;

export const CountriesResults: FC<Props> = ({ countries, order }) => {

    return (
        <>
            {
                (countries.length > 0) &&
                <>
                    <h1>{order}</h1>
                    <Container>
                        {
                            countries.map(country => (
                                <CountryCard key={country.code} country={country} />
                            ))
                        }
                    </Container>
                </>

            }
        </>
    )
}
