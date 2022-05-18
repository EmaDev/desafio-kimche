import { FC } from 'react';
import { MdSearchOff } from 'react-icons/md';
import { CountriesOrdened } from '../hooks/useFilterCountries';
import { CountriesResults } from './CountriesResults';
import { IconEmpty, Main } from './SearchSection.element';

interface Props {
    state: CountriesOrdened | undefined;
    gbCont: boolean;
}

export const SearchSection: FC<Props> = ({ state, gbCont}) => {
    
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
