import React, { Component } from 'react';
import '../styles/scss/opening-page.scss';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';


function OpeningPage() {

    return (
        <div className="opening-page">
            <MenuIcon />
            <h1>ללמוד אנגלית עם אלקסה</h1>
            <div className="buttons">
                <Link to="/stock-quiz" className="link">
                <div className="quiz-list-btn">מאגר השאלונים</div>
                </Link>
                <Link to="/student-list" className="link">
                <div className="student-list-btn">רשימת תלמידים</div>
                </Link>
            </div>

        </div>
    )
}

export default OpeningPage;