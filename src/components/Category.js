import React from 'react'
import styled from 'styled-components'

export const Category = ({ category, handlePagination }) => {
  const { title, alias } = category
  return (
    <StyledCategory onClick={() => handlePagination(0, alias, true)}>
      {title}
    </StyledCategory>
  )
}

const StyledCategory = styled.div`
  /* margin-bottom: 1em; */
  &:hover {
    color: orangered;
    cursor: pointer;
  }
`
