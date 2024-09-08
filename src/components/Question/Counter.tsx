import styled from 'styled-components'

export interface Props {
  count: number
}

const Counter = ({ count }: Props) => {
  return (
    <div className="d-flex align-center">
      <Count>{count}</Count>
      <Arrow />
    </div>
  )
}

export default Counter

const Count = styled.span`
  font-size: 14px;
  margin-right: 4px;
  color: var(--qn-text-color);
`

const Arrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="var(--qn-text-color)"
      viewBox="0 0 16 16"
    >
      <path d="M8.47 1.97a.75.75 0 0 1 1.06 0l4.897 4.896a1.25 1.25 0 0 1 0 1.768L9.53 13.53a.75.75 0 0 1-1.06-1.06l3.97-3.97H1.75a.75.75 0 1 1 0-1.5h10.69L8.47 3.03a.75.75 0 0 1 0-1.06"></path>
    </svg>
  )
}
