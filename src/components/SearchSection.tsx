import { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import { MdSearchOff } from 'react-icons/md';
import { CountriesOrdened } from '../hooks/useFilterCountries';
import { CountriesResults } from './CountriesResults';

interface Props {
    state: CountriesOrdened | undefined;
    gbCont: boolean;
    searched: string;
}
const Main = styled.main`
   padding: 2rem;
   margin-top: 2rem;
`;
const IconEmpty = styled.div`
   margin: 3rem auto;
   display:flex;
   justify-content:center;
   align-items: center;
   div{
       margin:auto;
       align-items:center;
       display:flex;
       justify-content:center;
    }
   h2{
       color: grey;
   }
`;

export const SearchSection: FC<Props> = ({ state, gbCont,searched }) => {
    
    useEffect( () => {
        console.log(searched);
    },[searched]);
    return (
        <Main>
            {
                (state) ?
                    (state.groupsCountries.map(group => (
                        <div key={(gbCont) ? group.continent!.name : group.language!.name}>
                            {
                                (group.countries.length > 0) &&
                                <CountriesResults
                                    key={(gbCont) ? group.continent!.code : group.language!.code}
                                    countries={group.countries}
                                    order={(gbCont) ? group.continent!.name : group.language!.name}
                                />
                            }
                        </div>
                    ))) :
                    (
                        <IconEmpty>
                            <div>
                                <MdSearchOff size='10rem' color='grey' />
                                <h2>Search for a country</h2>
                            </div>
                        </IconEmpty>
                    )
            }
        </Main>
    )
}
