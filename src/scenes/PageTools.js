import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/PageTools.scss';
import { TextareaAutosize, Slide, Chip } from '@material-ui/core';
import { Menu, ArrowBack, Clear, Add, Star, MoreHoriz } from '@material-ui/icons';
import SideBarMenu from '../components/SideBarMenu/SideBarMenu';
import Recorder from '../components/Recorder/Recorder';

export const Navbar = ({ mode, iconFn, rightIcons = '' }) => {
    const [open, setOpen] = useState(false);

    const icon = (() => {
        //1-menu 2-back 3-clear
        switch (mode) {
            case 1: return (
                <React.Fragment>
                    <Menu onClick={() => setOpen(true)} />
                    <SideBarMenu isOpen={open} onCloseMenu={() => setOpen(false)} />
                </React.Fragment>);
            case 2: return <ArrowBack onClick={iconFn} />;
            case 3: return <Clear onClick={iconFn} />
            default: console.log('icon wasnt found'); return;
        }
    })()

    const style = mode === 4 ? { zIndex: 5, position: 'absolute' } : {};

    return (
        <div className='pageTools_navbar' style={style}>
            {icon}
            {rightIcons}
        </div>);
}


export const ListUnit = ({
    mode,//1-quiz, 2-student
    info: { title, subTitle, numInfo, id },
    index,
    onClick
}) => {
    const [startAnimation, setStartAnimation] = React.useState(false)

    useEffect(() => {
        setTimeout(() => { setStartAnimation(true) }, 180 * (index));
    }, [])

    const niIcon = (() => {
        switch (mode) {
            case 1: return <img src='images/conversation-blue.svg' />
            case 2: return <Star />
            default: return;
        }
    })()
    return (
        <Slide direction="right"
            {...(startAnimation ? { timeout: (300) } : {})}
            in={startAnimation} mountOnEnter unmountOnExit>
            <div className="pageTools_listUnit" onClick={onClick ? () => onClick(id) : () => { }} >
                <div className='stInfo' >
                    <h3>{title}</h3>
                    {subTitle && <h4>{subTitle}</h4>}
                </div>

                <div className="numInfo">
                    <p>{numInfo}</p>
                    {niIcon}
                </div>
            </div>
        </Slide>
    );
}


export const PlusBtn = ({ redirect }) => {
    return (
        <Link
            className="pageTools_plusBtn scale-in-center"
            to={redirect}>
            <Add />
        </Link>
    );
}


export const QuestUnit = ({
    mode = true,//true- watch, false- edit
    rightIcon = '',
    enOnly = false,
    type,//1-text, 2-record
    quest: { qVal, setQuests },
    index,
    // ans: { ansArr, setAns }
}) => {
    const [startAnimation, setStartAnimation] = React.useState(false)

    useEffect(() => {
        setTimeout(() => { setStartAnimation(true) }, 180 * (index));
    }, [])

    const AnswerSection = () => {
        return (
            <Fragment>
                <p className='answer-header'>Answer</p>
                {/* <div className='chips'>
                    {ansArr.map(ans =>
                        <Chip label={ans} onDelete={() => { }} />
                    )}
                </div> */}
            </Fragment>
        );
    }

    const RecordAnswer = ({
        inputVal, onChangeInputVal
    }) => {

        const [level, setLevel] = useState(1);

        return (
            <Fragment>
                <CInput
                    label='Question title'
                    placeholder='Add question placeholder'
                    value={inputVal}
                    onChange={onChangeInputVal} />
            </Fragment>
        );

    }

    return (
        <Slide direction="right"
            {...(startAnimation ? { timeout: (300) } : {})}
            in={startAnimation} mountOnEnter unmountOnExit>
            <div className="pageTools_questUnit unit">
                {/* <MoreHoriz /> */}

                <CInput
                    value={qVal}
                    placeholder="Please specify your question"
                    disabled={mode}
                    label='Question' />
                {enOnly && <p className='only-en'>*Only in english</p>}

                {/* <RecordAnswer /> */}

                <AnswerSection />
            </div>
        </Slide>

    )
}



export const CInput = ({ value, onChange, label, placeholder = '', disabled = false }) => {
    const Speaker = () => (
        <div className='speaker'>
            <img src='/images/speaker.svg' />
        </div>
    );

    return (
        <div className='pageTools_cInput'>
            <label>{label}</label>
            <TextareaAutosize
                rowsMin={1}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={disabled} />
            {/* <Speaker /> */}
        </div>
    )
}