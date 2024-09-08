import styled from 'styled-components'

export interface Props {
  index: number
  value: string
  onClick: () => void
  selected: boolean
}

export const Option = ({ index, value, onClick, selected }: Props) => {
  const indexKey = String.fromCharCode(index + 65)

  return (
    <Base role="radio" onClick={onClick} data-selected={selected}>
      <KeyHint className="center" data-selected={selected}>
        {indexKey}
      </KeyHint>
      <Choice dangerouslySetInnerHTML={{ __html: value }} />
    </Base>
  )
}

const Base = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: var(--qn-bg-color);
  box-shadow: var(--qn-border-color) 0px 0px 0px 1px inset;
  color: var(--qn-text-color);
  max-width: 100%;
  min-height: 40px;
  padding: 4px 8px;
  transition-duration: 0.1s;
  transition-property: background-color, color, border-color, opacity,
    box-shadow;
  transition-timing-function: ease-out;
  width: 100%;
  word-break: break-word;
  cursor: pointer;
  opacity: 1;

  &:hover:not([data-selected='true']) {
    background-color: var(--qn-bg-color-hover);
  }

  &[data-selected='true'] {
    background-color: var(--qn-bg-selected-color);
    box-shadow: var(--qn-border-color) 0px 0px 0px 2px inset;
  }
`

const KeyHint = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 2px;
  border: 1px solid var(--qn-border-color);
  font-size: 12px;
  line-height: 16px;
  font-family: sans-serif;
  background-color: rgba(255, 255, 255, 0.8);
  color: var(--qn-text-color);

  &[data-selected='true'] {
    background-color: var(--qn-text-color);
    color: #fff;
  }
`

const Choice = styled.div`
  font-size: 20px;
  line-height: 28px;
  margin-left: 8px;
`
