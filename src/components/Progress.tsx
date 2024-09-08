import { useEffect, useState } from 'react'
import styled from 'styled-components'

export interface Props {
  percent: number
  label: string
}

const Progress = ({ percent, label }: Props) => {
  const [currentPercent, setCurrentPercent] = useState(0)

  useEffect(() => {
    const duration = 2500
    const start = performance.now()

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1)
      setCurrentPercent(progress * percent)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [percent])

  return (
    <StyledProgress>
      <Overflow>
        <Bar
          style={{
            transform: `rotate(${45 + currentPercent * 1.8}deg)`,
            transition: 'transform 0s',
          }}
        />
      </Overflow>
      <Label>{label}</Label>
    </StyledProgress>
  )
}

export default Progress

const StyledProgress = styled.div`
  position: relative;
  margin: 4px;
  text-align: center;
  float: left;
`

const Overflow = styled.div`
  position: relative;
  overflow: hidden;
  width: 120px;
  height: 60px;
  margin-bottom: -14px;
`

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 5px solid #eee;
  border-bottom-color: #a8e6bd;
  border-right-color: #a8e6bd;
`

const Label = styled.span`
  font-weight: 600;
  font-size: 16px;
`
