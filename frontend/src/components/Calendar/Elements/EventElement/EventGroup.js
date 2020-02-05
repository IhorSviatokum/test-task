import React from 'react';
import classes from './EventGroup.module.css'

const eventGroup = props => {

    return (
        <div className={classes.EventGroup} >
            {props.children}
        </div>
    )
}

export default eventGroup