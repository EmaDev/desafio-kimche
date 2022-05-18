import styled from "styled-components";

export const Divider = styled.div`flex: 1;`;
export const ButtonsContainer = styled.div`
   align-items:center;
   margin:auto;

   h4{
       margin:0;
       padding: 0;
       font-size: 2.5rem;
       font-weight: bold;
       color: ${({theme}) => theme.textPrimary};
   }
   @media(min-width: 600px){
    display: flex;
    justify-content: center;
   }
`;

export const Input = styled.div`
    display: grid;
    grid-template-columns: 15% 85%;
    align-items: center;
    margin: 2rem auto;
    padding: .2rem 1rem;
    border: 1px solid var(--negro);
    border-radius: 20px;
    background-color: ${({theme}) => theme.bgPrimary};
    color: ${({theme}) => theme.textPrimary};

    input{
        border-style: none;
        padding: 1rem 0;
        background-color: transparent;
        color: ${({theme}) => theme.textSecondary};;
    }
`;

export const Buttons = styled.div` 
   display: flex;
   justify-content: center;

   @media(max-width: 600px){
       margin-top: 2rem;
   }
`;

interface Button{
    active?: boolean; 
}
export const Button = styled.button<Button>`
    margin: 0 .5rem;
    padding: 1rem 3rem;
    width: 100%;
    border-radius: 20px;
    font-size: 1.5rem;
    font-weight: bold;
    background-color: ${({theme, active}) => 
    active ? theme.btNormal : theme.btActive};
    color: ${({theme}) => theme.textPrimary};
`;

export const Title = styled.h1`
  color: ${({theme}) => theme.textPrimary};
`;