import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './SideBarMenu.scss'

const SideBarMenu = ({ isOpen, onCloseMenu }) => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => { setOpen(isOpen); }, [isOpen])

    return (
        <div>
            <Drawer className="side-bar-menu" anchor={"left"} open={open} /*onClose={onCloseMenu}*/>
                <div className="menu-content">
                    <div className="close-menu-icon">
                        <HighlightOffIcon onClick={onCloseMenu} />
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

export default SideBarMenu;