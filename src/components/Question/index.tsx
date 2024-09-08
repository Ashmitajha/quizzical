import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Counter from './Counter'
import { Option } from './Option'
import { IQuestion } from '../../types'
import Button from '../Button'

export type Props = IQuestion & {
  onNext: (index: number) => void
  count: number
  isSubmit: boolean
}

const Question = ({
  question: qn,
  options,
  onNext,
  count,
  isSubmit,
}: Props) => {
  const [selected, setSelected] = useState(-1)

  const keyMap = options.reduce<Record<string, number>>((a, _, i) => {
    a[String.fromCharCode(i + 65)] = i
    return a
  }, {})

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase()

    if (keyMap[key] !== undefined) {
      handleClick(keyMap[key])
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const handleClick = (index: number) => {
    setSelected(index)
  }

  const handleNext = () => {
    onNext(selected)
    setSelected(-1)
  }

  return (
    <div className="d-flex col justify-center size-f">
      <ContentWrapper>
        <div className="d-flex">
          <Counter count={count} />
          <Title dangerouslySetInnerHTML={{ __html: qn }} />
        </div>
        <SpaceWrapper>
          <div role="radiogroup">
            <OptionList>
              {options.map((op, idx) => (
                <OptionListItem key={idx}>
                  <Option
                    index={idx}
                    value={op}
                    onClick={() => handleClick(idx)}
                    selected={selected === idx}
                  />
                </OptionListItem>
              ))}
            </OptionList>
          </div>
          <ActionWrapper>
            {selected !== -1 && (
              <Button onClick={handleNext}>
                {isSubmit ? 'Submit' : 'Next'}
              </Button>
            )}
          </ActionWrapper>
        </SpaceWrapper>
      </ContentWrapper>
    </div>
  )
}

export default Question

const ContentWrapper = styled.div`
  padding-inline: 40px;
  width: 100%;
  max-width: 720px;
  margin: 0px auto;
`

const Title = styled.div`
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  margin-left: 16px;
`

const OptionList = styled.ul`
  max-width: 100%;
  min-width: 168px;
  display: inline-flex;
  flex-flow: column wrap;
  align-items: stretch;
  user-select: none;
  margin-block-end: -8px;
  margin-inline-end: 8px;
  list-style: none;
`

const OptionListItem = styled.li`
  margin-block-end: 8px;
  list-style: none;
  display: block;
  outline: none;
  transition: none;
  width: 100%;
  min-width: 150px;
`

const SpaceWrapper = styled.div`
  margin-block-start: 32px;
  margin-inline-start: 42px;
`

const ActionWrapper = styled.div`
  margin-top: 24px;
  min-height: 40px;
`
