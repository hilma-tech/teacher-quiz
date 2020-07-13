import React from 'react';
import '../styles/scss/opening-page.scss';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/PageTools';


export default function OpeningPage() {
    return (
        <div className="opening-page">
            {/* <Menu /> */}
            <Navbar icon='menu' />

            <div className="title">
                <h1>English</h1>
                <p>with</p>
                <h1>Alexa</h1>
            </div>

            <div className="buttons">
                <Link to="/stock-quiz">
                    <div className="blue">Questionnaires</div>
                </Link>

                <Link to="/student-list">
                    <div className="pink">Students</div>
                </Link>

                <Link to="/question">
                    <div className="blue">Question</div>
                </Link>
            </div>

        </div>
    )
}