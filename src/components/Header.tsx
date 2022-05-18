import { BiSearchAlt } from 'react-icons/bi';
import { Button, Buttons, ButtonsContainer, Divider, Input, Title } from './Header.element';

interface Props {
    children: any;
    obCont: boolean;
    changeOrderBy: (option: boolean) => void;
}

export const Header = ({ children, changeOrderBy, obCont }: Props) => {

    return (
        <header>
            <Title>Country Search</Title>
            <Input>
                <BiSearchAlt size='2.5rem' />
                {children}
            </Input>
            <ButtonsContainer>
                <h4>Group by</h4>
                <Divider/>
                <Buttons>
                    <Button onClick={() => changeOrderBy(false)}
                    active={obCont ? true : false }
                    >Language</Button>
                    <Button onClick={() => changeOrderBy(true)}
                    active={obCont ? false : true }  
                    >Continent</Button>
                </Buttons>

            </ButtonsContainer>
        </header>
    )
}


