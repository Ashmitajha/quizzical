import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import queryString from 'query-string'

import { IQuestion, QuizDifficulty } from '../../types'
import Question from '../Question'
import Loader from '../Loader'
import Button from '../Button'
import Progress from '../Progress'
import Counter from '../Question/Counter'
import { FaCheckCircle } from 'react-icons/fa'
import { FaCircleXmark } from 'react-icons/fa6'

export interface QuizOptions {
  category: number
  count: number
  difficulty: QuizDifficulty
  name: string
}

const Quiz = () => {
  const location = useLocation()

  const queryParams = queryString.parse(location.search)
  const rawOp = queryParams?.o as string

  const getOptions = (o: string) => {
    try {
      const op = JSON.parse(atob(o)) as QuizOptions
      if (!op.category || !op.count || !op.difficulty || !op.name) {
        return null
      }

      return op
    } catch (e) {
      return null
    }
  }

  const options = getOptions(rawOp)
  if (!options) {
    window.location.href = '/'
    return null
  }

  const { category, difficulty, count, name } = options

  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [error, setError] = useState<string | null>(null)
  // Always start from first question
  const [curQuestion, setCurQuestion] = useState(0)

  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<Record<number, number>>({})

  const handleNext = (index: number) => {
    // Save answer for cur question and change question
    setAnswers((prev) => ({ ...prev, [curQuestion]: index }))

    // Check if questions are over
    if (curQuestion === count - 1) {
      setShowResult(true)
      return
    }

    setCurQuestion(curQuestion + 1)
  }

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch(
        `https://opentdb.com/api.php?amount=${count}&category=${category}&difficulty=${difficulty}&type=multiple`
      )

      if (!resp.ok) {
        setError(
          `Failed to get questions for "${name}" category, try refreshing`
        )
        return
      }

      const data = await resp.json()

      if (data.response_code !== 0) {
        setError(
          `Quiz server is experiencing too many requests, try again in a moment`
        )
        return
      }

      const questions: IQuestion[] = []

      data.results.forEach(
        (qn: {
          correct_answer: string
          question: string
          incorrect_answers: string[]
        }) => {
          const correctIndex = Math.floor(
            Math.random() * (qn.incorrect_answers.length + 1)
          )

          qn.incorrect_answers.splice(correctIndex, 0, qn.correct_answer)

          questions.push({
            question: qn.question,
            options: qn.incorrect_answers,
            answer: correctIndex,
          })
        }
      )

      setQuestions(questions)
    }

    getData()
  }, [])

  const getTotalCorrectAnswers = () => {
    let correct = 0
    for (let i = 0; i < count; i++) {
      if (questions[i].answer === answers[i]) {
        correct += 1
      }
    }

    return correct
  }

  if (error) {
    return (
      <div className="size-f center" style={{ flexDirection: 'column' }}>
        <Message>😓 {error}</Message>
        <Button
          style={{ marginTop: 12 }}
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </div>
    )
  }

  if (!error && questions.length == 0) {
    return (
      <div className="size-f center" style={{ flexDirection: 'column' }}>
        <Loader />
        <Message>Loading</Message>
      </div>
    )
  }

  return (
    <>
      <Header>
        <h2 className="font-display">Quizzical</h2>
        <HeaderCounter>
          {showResult ? (
            'Results'
          ) : (
            <>
              {curQuestion + 1} / {count}
            </>
          )}
        </HeaderCounter>
        <div></div>
      </Header>
      {showResult ? (
        <div className="d-flex col align-center" style={{ marginTop: 20 }}>
          <Progress
            percent={(getTotalCorrectAnswers() / count) * 100}
            label={`${getTotalCorrectAnswers()} / ${count}`}
          />
          <AnswersContainer>
            {questions.map((qn, idx) => {
              const answeredCorrect = qn.answer === answers[idx]

              return (
                <div key={idx}>
                  <div className="d-flex align-center">
                    <Counter count={idx + 1} />
                    <AnswerQuestion
                      dangerouslySetInnerHTML={{ __html: qn.question }}
                    />
                  </div>
                  {answeredCorrect ? (
                    <AnswerGroup>
                      <FaCheckCircle color="#A8E6BD" />
                      {qn.options[qn.answer]}
                    </AnswerGroup>
                  ) : (
                    <AnswerGroup>
                      <AnswerGroupItem>
                        <FaCircleXmark color="#EB5147" />{' '}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: qn.options[answers[idx]],
                          }}
                        />
                      </AnswerGroupItem>
                      <AnswerGroupItem>
                        <FaCheckCircle color="#A8E6BD" />
                        <span
                          dangerouslySetInnerHTML={{
                            __html: qn.options[qn.answer],
                          }}
                        />
                      </AnswerGroupItem>
                    </AnswerGroup>
                  )}
                </div>
              )
            })}
          </AnswersContainer>
        </div>
      ) : (
        <Question
          {...questions[curQuestion]}
          onNext={handleNext}
          count={curQuestion + 1}
          isSubmit={curQuestion === count - 1}
        />
      )}
    </>
  )
}

export default Quiz

const Message = styled.span`
  font-size: 16px;
  margin-top: 12px;
`

const Header = styled.header`
  height: 56px;
  border-bottom: 1px solid rgb(214, 217, 220);
  display: flex;
  align-items: center;
  padding-inline: 32px;
`

const HeaderCounter = styled.div`
  margin: 0 auto;
`

const AnswersContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const AnswerQuestion = styled.div`
  font-family: 'PlayFair Display';
  font-size: 18px;
  margin-left: 10px;
  margin-bottom: 4px;
  font-weight: 500;
`

const AnswerGroup = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 38px;
`

const AnswerGroupItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`
