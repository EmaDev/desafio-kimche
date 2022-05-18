import styled from "styled-components";

export const Card = styled.div`
  padding: 1rem;
  background-color: ${({theme}) => theme.bgSecondary};
  margin: 1rem;
  border: 1px solid var(--negro);
  border-radius: 8px;
  position:relative;
`;
export const CountryName = styled.div`
  display: flex;
  align-items: center;

  color: ${({theme}) => theme.textPrimary};
  p{
    font-size: 2.5rem;
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
export const CountryAtribute = styled.p`
   margin: .3rem;
   font-size: 1.7rem;
   font-weigth: bold;
   color: ${({theme}) => theme.textPrimary};
   span{
     font-size: 1.6rem;
     font-weight:bold;
   }
`;
export const Button = styled.button`
   width: 90%;
   display: block;
   margin: 1rem auto 0 auto;
   padding: 1rem;
   color: ${({theme}) => theme.textPrimary};
   background-color: ${({theme}) => theme.btActive};
   border-radius: 20px; 
   border: 1px solid var(--negro);
`;

export const Container = styled.div`
   @media( min-width: 540px ) {
    display: grid;
    grid-template-columns: 50% 50%;
   }
`;

export const GroupTitle = styled.h1`
   margin: .5rem 0;
   color: ${({theme}) => theme.textPrimary};
`;