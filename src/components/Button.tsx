import styled from 'styled-components'

export interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const Button = ({ children, ...props }: Props) => {
  return (
    <StyledButton {...props}>
      <span>{children}</span>
    </StyledButton>
  )
}

export default Button

const StyledButton = styled.button`
  position: relative;
  line-height: initial;
  font-weight: 500;
  cursor: pointer;
  transition-duration: 0.1s;
  transition-property: background-color, color, border-color, opacity,
    box-shadow;
  transition-timing-function: ease-out;
  outline: none;
  border: 1px solid transparent;
  margin: 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 12px 0px;
  padding-block: 6px;
  padding-inline: 14px;
  min-height: 40px;
  background-color: var(--qn-text-color);
  color: #fff;
  border-radius: 4px;

  > span {
    font-size: 20px;
    line-height: 1;
  }

  &:hover {
    background-color: var(--btn-bg-color-hover);
  }
`
