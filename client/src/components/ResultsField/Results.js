import React from 'react';
import { Segment, Image, Button, Header, Grid } from 'semantic-ui-react'

const Results = props => {
    return (
        <Segment>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="14">
                        <Header>
                            {props.title}
                            <Header.Subheader>
                                Written by: {props.authors}
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                    <Grid.Column width='1'>
                        <Button size='mini' as='a' href={props.link} target='_blank'>View</Button>
                    </Grid.Column>
                    {props.children}
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width='4'>
                        <Image src={props.image} />
                    </Grid.Column>
                    <Grid.Column width='12'>
                        <p>{props.description}</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default Results;