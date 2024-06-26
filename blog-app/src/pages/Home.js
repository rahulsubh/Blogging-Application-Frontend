import React from 'react'
import { Container } from 'reactstrap'
import Base from '../components/Base'
import NewFeed from '../components/NewFeed'

function Home() {
    return (
        <Base>
            <Container className="mt-3">
                <NewFeed />
            </Container>
        </Base>
    )
}

export default Home