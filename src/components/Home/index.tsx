import { useEffect, useState } from 'react'
import styled from 'styled-components'

import HomeBackground from '../../assets/home-bg.jpeg'
import Slide from '../Slide'
import { QuizCategories } from '../../constants/quiz-categories'
import Chip from '../Chip'
import { QuizDifficulty } from '../../types'
import { QuizOptions, QuizQuestionLimit } from '../../constants/quiz-options'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const randomCategory = Math.floor(Math.random() * QuizCategories.length)

  const navigate = useNavigate()

  const [category, setCategory] = useState(QuizCategories[randomCategory].id)
  const [questionCount, setQuestionCount] = useState(10)
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('easy')

  const getCategoryName = (id: number) => {
    const ctg = QuizCategories.filter((c) => c.id === id)[0]
    return ctg.name
  }

  const getDifficultyName = (d: QuizDifficulty) => {
    const dif = QuizOptions.filter((o) => o.value === d)[0]
    return dif.label
  }

  const getQuizOptions = () => {
    const options = {
      category,
      difficulty,
      count: questionCount,
      name: getCategoryName(category),
    }

    return btoa(JSON.stringify(options))
  }

  useEffect(() => {
    const { min, max } = QuizQuestionLimit[difficulty]
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    setQuestionCount(num)
  }, [difficulty])

  return (
    <Container>
      <div className="bg"></div>
      <Content>
        <h1 className="font-display">Quizzical</h1>

        <p className="font-display">
          Welcome! Test your knowledge with fun, challenging quizzes on various
          topics. Start your quiz adventure now!
        </p>

        <QuizOptionTitle>Topic</QuizOptionTitle>
        <CategoriesContainer>
          {QuizCategories.map((c, idx) => (
            <Slide
              key={idx}
              icon={c.icon}
              name={c.name}
              selected={category === c.id}
              onClick={() => setCategory(c.id)}
            />
          ))}
        </CategoriesContainer>

        <QuizOptionTitle>Difficulty</QuizOptionTitle>
        <div className="d-flex" style={{ gap: 12 }}>
          {QuizOptions.map((op, idx) => (
            <Chip
              key={idx}
              label={op.label}
              selected={difficulty === op.value}
              onClick={() => setDifficulty(op.value)}
            />
          ))}
        </div>

        <p className="font-display">
          You are attempting a quiz on{' '}
          <Indicator>{getCategoryName(category)}</Indicator> at{' '}
          <Indicator>{getDifficultyName(difficulty)}</Indicator> level. You will
          get{' '}
          <Indicator>
            {QuizQuestionLimit[difficulty].min} -{' '}
            {QuizQuestionLimit[difficulty].max}
          </Indicator>{' '}
          questions
        </p>

        <StartQuizContainer className="center">
          <Button onClick={() => navigate(`/quiz?o=${getQuizOptions()}`)}>
            Start Quiz
          </Button>
        </StartQuizContainer>
      </Content>
    </Container>
  )
}

export default Home

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;

  .bg {
    background-image: url(${HomeBackground});
  }
`

const Content = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;

  p {
    margin-top: 24px;
    font-size: 20px;
  }
`

const QuizOptionTitle = styled.div`
  margin-block: 20px;
  font-weight: 500;
  font-size: 18px;
`

const CategoriesContainer = styled.div`
  display: grid;
  grid-gap: 8px 8px;
  grid-auto-flow: row dense;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-auto-rows: 80px;
`

const StartQuizContainer = styled.div`
  margin-block: 32px;
`

const Indicator = styled.span`
  text-decoration: underline;
  text-decoration-color: var(--qn-text-color);
  text-decoration-thickness: 2px;
  font-style: italic;
  font-weight: 500;
`
