import {css} from 'styled-components'

// -------------------------------------------------------------
// Base.
// -------------------------------------------------------------

const boxModel = css`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`

const typography = css`
  html {
    font-size: var(--typographic-rhythm);
    font-family: var(--font-body-stack);
    line-height: var(--font-body-line-height);
  }

  body {
    font-size: var(--typographic-size);
  }
`

const fullBodyViewportHeight = css`
  body {
    position: relative;
    min-height: 100vh;
    margin: 0;
  }
`

const colors = css`
  html {
    color: var(--color-page-content);
    background: var(--color-page-overscroll);
  }
  body {
    background: var(--color-page-background);
  }

  ::selection {
    color: var(--color-selection-foreground);
    background: var(--color-selection-background);
  }
`

export default css`
  ${boxModel}
  ${typography}
  ${fullBodyViewportHeight}
  ${colors}
`
