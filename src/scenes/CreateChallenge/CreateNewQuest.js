import React, { useState, useEffect } from 'react';
import { QuestUnit } from '../PageTools'
import './CreateChallenge.scss';
import { reaction } from 'mobx';
import { Chip } from '@material-ui/core';

export default function CreateNewQuest(props) {
    return (
        <div className='create-new-quest'>

            <Choose />
            {/* <QuestUnit enOnly={true}/> */}
        </div>
    );
}

const Choose = () => (
    <div className="choose unit">
        <p className='choose__p'>Choose:</p>
        <div>
            <img
                className='choose__img'
                type="text"
                src='images/qTextIcon.svg'
            // onClick={addQuestSection}
            />
            <img
                className='choose__img'
                type="record"
                src='images/qMicIcon.svg'
            // onClick={addQuestSection}
            />
        </div>
    </div>
);

const RecordQuest = () => {
    return (
        <div>

        </div>
    )
}

