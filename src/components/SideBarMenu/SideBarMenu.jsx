import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import './SideBarMenu.scss'

export default function SideBarMenu({ isOpen, onCloseMenu }) {
    return (
        <div>
            <Drawer className="side-bar-menu" anchor={"left"} open={isOpen} /*onClose={onCloseMenu}*/>
                <div className="menu-content">
                    <div className="close-menu-icon">
                        <HighlightOff onClick={onCloseMenu} />
                    </div>
                    <div className="menu-links">
                        <div>
                            <Link to='/' className="link">
                                Home
                            </Link>
                        </div>
                        <div>
                            <Link to='/list-of-quiz' className="link">
                                questionnaire
                            </Link>
                        </div>
                        <div>
                            <Link to='/student-list' className="link">
                                Students
                            </Link>
                        </div>
                        <div>
                            <Link to='/question' className="link">
                                question
                            </Link>
                        </div>
                        <div>
                            <Link to='/' className="link">
                                settings
                            </Link>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

