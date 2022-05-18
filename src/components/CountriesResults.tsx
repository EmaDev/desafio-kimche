import { FC } from 'react';
import { Country} from '../interfaces/CountriesInterfaces';
import { CountryCard } from './CountryCard';
import { Container, GroupTitle } from './CountryCard.element';

interface Props {
    countries: Country[];
    order: string;
}


export const CountriesResults: FC<Props> = ({ countries, order }) => {

    return (
        <>
            {
                (countries.length > 0) &&
                <>
                    <GroupTitle>{order}</GroupTitle>
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
