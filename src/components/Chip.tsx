import styled from 'styled-components'

export interface Props {
  label: string
  selected: boolean
  onClick: () => void
}

const Chip = ({ label, selected, onClick }: Props) => {
  return (
    <StyledChip onClick={onClick} data-selected={selected}>
      {label}
    </StyledChip>
  )
}

export default Chip

const StyledChip = styled.div`
  --color: var(--qn-text-color);
  padding: 6px;
  border-radius: 15px;
  font-size: 14px;
  color: var(--color);
  border-width: 1px;
  border-style: solid;
  border-color: var(--color);
  min-width: 80px;
  text-align: center;
  height: 30px;
  cursor: pointer;
  transition-duration: 0.1s;
  transition-property: background-color, color;
  transition-timing-function: ease-out;

  &[data-selected='true'] {
    background-color: var(--color);
    color: #fff;
  }
`
