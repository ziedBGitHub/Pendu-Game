import propTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'

import './KeybordItem.css'

const KeybordItem = ({ character, disable, onClick}) => (
    <Button disabled={disable} onClick={() => onClick(character)}>{ character }</Button>
)

KeybordItem.propTypes = {
    character : propTypes.string.isRequired,
    disable      : propTypes.bool.isRequired,
    
}
export default KeybordItem