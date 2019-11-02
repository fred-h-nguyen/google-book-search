import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

    state = { activeItem: 'googleBooks' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    style = {
        padding: '.25em',
        marginBottom: '0px'
    }

    render() {
        const { activeItem } = this.state;
        return (
            <Segment inverted style={this.style}>
                <Menu inverted pointing secondary compact>
                    <Link
                        to='/'>
                        <Menu.Item
                            name='Google Books'
                            active={activeItem === 'Google Books'}
                            onClick={this.handleItemClick}
                            style={{ fontSize: '.8em' }}
                        />
                    </Link>
                    <Link
                        to='/'>
                        <Menu.Item
                            name='Search'
                            active={activeItem === 'Search'}
                            onClick={this.handleItemClick}
                            style={{ fontSize: '.8em' }}
                        />
                    </Link>
                    <Link
                        to='/saved'>
                        <Menu.Item
                            name='Saved'
                            active={activeItem === 'Saved'}
                            onClick={this.handleItemClick}
                            style={{ fontSize: '.8em' }}
                        />
                    </Link>
                </Menu>
            </Segment>
        )
    }
}

export default Navbar