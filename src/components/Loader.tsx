import styled from 'styled-components'

const Loader = () => {
  return <StyledLoader />
}

export default Loader

const StyledLoader = styled.div`
  height: 4px;
  width: 130px;
  --c: no-repeat linear-gradient(var(--qn-text-color) 0 0);
  background: var(--c), var(--c), var(--qn-bg-selected-color);
  background-size: 60% 100%;
  animation: l16 3s infinite;

  @keyframes l16 {
    0% {
      background-position:
        -150% 0,
        -150% 0;
    }
    66% {
      background-position:
        250% 0,
        -150% 0;
    }
    100% {
      background-position:
        250% 0,
        250% 0;
    }
  }
`
