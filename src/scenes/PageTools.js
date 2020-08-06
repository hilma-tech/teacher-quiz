import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/PageTools.scss';
import { TextareaAutosize } from '@material-ui/core';
import { Menu, ArrowBack, Clear, Add, Star, Delete, Edit, MoreHoriz } from '@material-ui/icons';
import SideBarMenu from '../components/SideBarMenu/SideBarMenu'
import { Slide } from '@material-ui/core';

export const Navbar = ({ mode, iconFn, editFn, delFn }) => {
    const [open, setOpen] = React.useState(false)

    const icon = (() => {
        //1-menu 2-back 3-clear 4-clear with icons
        switch (mode) {
            case 1: return (
                <div>
                    <Menu onClick={() => setOpen(true)} />
                    <SideBarMenu isOpen={open} onCloseMenu={() => setOpen(false)} />
                </div>);
            case 2: return <ArrowBack onClick={iconFn} />;
            case 3: return <Clear onClick={iconFn} />
            case 4: return (
                <React.Fragment>
                    <Clear onClick={iconFn} />
                    <div className='right'>
                        <Edit onClick={editFn} />
                        <Delete onClick={delFn} />
                    </div>
                </React.Fragment>
            );
            default: console.log('icon wasnt found'); return;
        }
    })()

    const style = mode === 4 ? { zIndex: 5, position: 'absolute' } : {};

    return (
        <div className='pageTools_navbar' style={style}>
            {icon}
        </div>);
}


export const ListUnit = ({
    mode,//1-quiz, 2-student
    info: { title, subTitle, numInfo },
    onClick
}) => {
    const niIcon = (() => {
        switch (mode) {
            case 1: return <img src='images/conversation-blue.svg' />
            case 2: return <Star />
            default: return;
        }
    })()
    return (
        <div className="pageTools_listUnit" onClick={onClick} >
            <div className='stInfo' >
                <h3>{title}</h3>
                {subTitle && <h4>{subTitle}</h4>}
            </div>

            <div className="numInfo">
                <p>{numInfo}</p>
                {niIcon}
            </div>
        </div>
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
    quest: { qVal, setQuests },
    index
    // ans: { ansArr, setAns }
}) => {
    const [startAnimation, setStartAnimation] = React.useState(false)


    const Speaker = () => (
        <div className='speaker'>
            <img src='/images/speaker.svg' />
        </div>
    );

    useEffect(() => {
        setTimeout(() => { setStartAnimation(true) }, 180 * (index));
    }, [])

    return (
        <Slide direction="right"
            {...(startAnimation ? { timeout: (300) } : {})}
            in={startAnimation} mountOnEnter unmountOnExit>
            <div className="pageTools_questUnit">
                <MoreHoriz />
                <p>Question</p>
                <TextareaAutosize
                    rowsMin={1}
                    // onChange={setQuests}
                    value={qVal}
                    placeholder="Please specify your question"
                    disabled={mode}
                    readOnly={mode} />
                {/* <Speaker /> */}
                <p>Answer</p>
                {/* 
            {ansArr &&
                ansArr.map((ans, i) => (
                    <div className="answer special-color">
                        <input
                            key={i}
                            value={ans}
                            onChange={setAns}
                        >
                        </input>
                    </div>
                ))} */}
            </div>
        </Slide>

    )
}
