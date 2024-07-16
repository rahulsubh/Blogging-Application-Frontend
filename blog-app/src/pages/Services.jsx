import React from 'react'
import Base from '../components/Base'
import userContext from '../context/userContext'

function Services() {
    return (
        <userContext.Consumer>
            {
                (user) => (
                    <Base>
                    <h1>this is services page</h1>
                    <h1>Welcome {user.user.login && user.user.data?.name}</h1>
                    </Base>

                )
            }
        </userContext.Consumer>
    )
}

export default Services