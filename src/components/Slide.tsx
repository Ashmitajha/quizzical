import { IconType } from 'react-icons'
import styled from 'styled-components'

export interface Props {
  icon: IconType
  name: string
  selected: boolean
  onClick: () => void
}

const Slide = ({ icon: Icon, name, selected, onClick }: Props) => {
  return (
    <StyledSlide onClick={onClick} data-selected={selected}>
      <Icon size={28} />
      <Label>{name}</Label>
    </StyledSlide>
  )
}

export default Slide

const StyledSlide = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  border-radius: 6px;
  padding: 6px;
  text-align: center;
  background-color: var(--qn-bg-color);
  outline: 0;
  border: 0;
  cursor: pointer;
  transition-duration: 0.1s;
  transition-property: background-color, color, border-color, opacity,
    box-shadow;
  transition-timing-function: ease-out;
  box-shadow: var(--qn-border-color) 0px 0px 0px 1px inset;

  &:hover:not([data-selected='true']) {
    background-color: var(--qn-bg-color-hover);
  }

  &[data-selected='true'] {
    background-color: var(--qn-bg-selected-color);
    box-shadow: var(--qn-border-color) 0px 0px 0px 2px inset;
  }

  svg {
    color: var(--qn-text-color);
  }
`

const Label = styled.div`
  margin-top: 12px;
  font-size: 14px;
  color: var(--qn-text-color);
`
