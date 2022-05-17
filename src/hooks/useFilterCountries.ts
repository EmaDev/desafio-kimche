import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { capitalizeText } from '../helpers/helpers';
import { Continent, Country, Language } from '../interfaces/CountriesInterfaces';

interface GroupByOptions {
    allContinents: Continent[];
    allLanguages: Language[];
}
export interface CountriesOrdened {
    ordenBy: 'Continent' | 'Language';
    groupsCountries: CountriesGroup[];
}
interface CountriesGroup {
    continent?: Continent;
    language?:Language;
    countries: Country[];
}
interface CountriesGroupContinent {
    continent: Continent;
    countries: Country[];
}

const ALL_LANGUAGES = gql`
   query {
     languages{
        code,
        name,
        native
     }
    }
`;
const ALL_CONTINENTS = gql`
   query {
    continents{
        code,
        name
     }
    }
`;
export const useFilterCountries = () => {

    const [stateFiltered, setStateFiltered] = useState<CountriesOrdened>();
    const [stateOptionGroup, setStateOptionGroup] = useState<GroupByOptions>({ allContinents: [], allLanguages: [] });
    const resultContinents = useQuery(ALL_CONTINENTS);
    const resultLanguges = useQuery(ALL_LANGUAGES);
    const { allContinents, allLanguages } = stateOptionGroup;

    useEffect(() => {
        if (resultContinents.data && resultLanguges.data) {
            setStateOptionGroup({
                allContinents: resultContinents.data.continents,
                allLanguages: resultLanguges.data.languages
            })
        }

    }, [resultContinents, resultLanguges]);
    const resetState = () => {
        setStateFiltered(undefined);
    }

    const filterCountriesByOption = (state: Country[], groupByContinent: boolean) => {
        if (groupByContinent) {
             const filtrado:CountriesOrdened = {
                ordenBy: 'Continent',
                groupsCountries: [
                    ...allContinents.map(conti => (
                        {
                            continent: conti,
                            countries: []
                        }
                    ))
                ]
            }
            filtrado.groupsCountries.forEach(group => {
                state.forEach(country => {
                    if (country.continent.code === group.continent?.code) {
                        group.countries.push(country);
                    }
                });
            });
            setStateFiltered(filtrado);
        } else {
            const filtrado: CountriesOrdened = {
                ordenBy: 'Language',
                groupsCountries: [
                    ...allLanguages.map(lang => (
                        {
                            language: lang,
                            countries: []
                        }
                    ))
                ]
            }
            filtrado.groupsCountries.forEach(group => {
                state.forEach(country => {
                    country.languages.forEach( lang => {
                        if (lang.code === group.language?.code) {
                            group.countries.push(country);
                        }
                    })
                    
                });
            });
            setStateFiltered(filtrado);
            
        }
    }

    const filterState = (state: Country[], textValue: string, byContinent:boolean) => {

        const stateFiltrado: Country[] =
            state.filter(country =>
                country.name.includes(textValue.toLowerCase()) ||
                country.name.includes(capitalizeText(textValue)))
        filterCountriesByOption(stateFiltrado, byContinent);

    }

    return { stateFiltered, filterState, resetState };
}
