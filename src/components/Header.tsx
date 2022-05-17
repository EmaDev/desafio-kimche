import styled from 'styled-components';
import { BiSearchAlt } from 'react-icons/bi';

interface Props {
    children: any;
    obCont: boolean;
    changeOrderBy: (option: boolean) => void;
}
const ButtonsContainer = styled.div`
   align-items:center;
   margin:auto;

   h4{
       margin:0;
       padding: 0;
       font-size: 2.5rem;
       font-weight: bold;
       color: var(--negro);
   }
   @media(min-width: 600px){
    display: flex;
    justify-content: center;
   }
`;
const Divider = styled.div`flex: 1;`;
const Input = styled.div`
    display: grid;
    grid-template-columns: 15% 85%;
    align-items: center;
    margin: 2rem auto;
    padding: .2rem 1rem;
    border: 1px solid var(--negro);
    border-radius: 20px;
    background-color: var(--grisClaro);

    input{
        border-style: none;
        padding: 1rem 0;
        background-color: transparent;
    }
`;

const Buttons = styled.div` 
   display: flex;
   justify-content: center;

   @media(max-width: 600px){
       margin-top: 2rem;
   }
`;
const Button = styled.button`
    margin: 0 .5rem;
    padding: 1rem 3rem;
    width: 100%;
    border-radius: 10px;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--negro);
`;


export const Header = ({ children, changeOrderBy, obCont }: Props) => {

    return (
        <header>
            <h1>Country Search</h1>
            <Input>
                <BiSearchAlt size='2.5rem' />
                {children}
            </Input>
            <ButtonsContainer>
                <h4>Group by</h4>
                <Divider />

                <Buttons>
                    <Button onClick={() => changeOrderBy(false)}
                        style={{ backgroundColor: (obCont) ? 'var(--grisClaro)' : 'var(--azul)' }}
                    >Language</Button>
                    <Button onClick={() => changeOrderBy(true)}
                        style={{ backgroundColor: (obCont) ? 'var(--azul)' : 'var(--grisClaro)' }}
                    >Continent</Button>
                </Buttons>

            </ButtonsContainer>
        </header>
    )
}


