import React from 'react';
import '../styles/scss/opening-page.scss';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';


function OpeningPage() {

    return (
        <div className="opening-page">
            <MenuIcon />
            <div className="title">
            <h1 className="bold">English</h1>
            <h1>with</h1>
            <h1 className="bold">Alexa</h1>
            </div>
            <div className="buttons">
                <Link to="/stock-quiz" className="link">
                <div className="blue btn">Questionnaires</div>
                </Link>
                <Link to="/student-list" className="link">
                <div className="pink btn">Students</div>
                </Link>
                <Link to="/question" className="link">
                <div className="blue btn">Question</div>
                </Link>
            </div>

        </div>
    )
}

export default OpeningPage;