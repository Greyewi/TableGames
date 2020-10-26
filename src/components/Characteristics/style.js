import styled from 'styled-components'

export const AddCharacteristicContainer = styled.header`
  width: calc(100% - 20px);
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
`

export const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 320px;
  @media (min-width: 780px) {
    width: 500px;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
  width: 100%;
`
