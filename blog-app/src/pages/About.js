import React from 'react'
import userContext from '../context/userContext'
import Base from '../components/Base'

function About() {
  return (
    <userContext.Consumer>
      {(object) => (
        <Base>
        <h1>this is about page</h1>
        <p>we are building blog website</p>
        {console.log(object)}
        <h1>Welcome user: {object.user && object.user.data?.name}</h1>
        </Base>
      )}
    </userContext.Consumer>
  )
}

export default About