import React from 'react';
import {Segment, Header} from 'semantic-ui-react'

const Title = () => (
    <>
    <Segment style={{
        margin:'0',
        background:'url("./images/Library.jpeg")no-repeat center',
        backgroundSize:'cover'
        }}>
        <Header textAlign='center' as='h1' style={{backgroundColor:'rgba(255,255,255,0.2'}}>
            (React) Google Books Search
        
            <Header.Subheader as='h3'>
            Search for and Save Books of Interest
            </Header.Subheader>
        </Header>
    </Segment>
    </>
)

export default Title;