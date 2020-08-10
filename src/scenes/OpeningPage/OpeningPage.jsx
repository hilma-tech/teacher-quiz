import React, { useEffect } from 'react';
import './opening-page.scss';
import { Link } from 'react-router-dom';
import { Navbar } from '../PageTools';
import superFetch from '../../superFetch';

export default function OpeningPage() {
    useEffect(() => {
        (async () => {
            const [res, err] = await superFetch('/api/StudentGroups');
            console.log('res: ', res);
        })()
    }, [])

    return (
        <div className="opening-page page">
            {/* <Menu /> */}
            <Navbar mode={1} />

            <div className="title">
                <h1>English</h1>
                <p>with</p>
                <h1>Alexa</h1>
            </div>

            <div className="buttons">
                <Link className="link" to="/list-of-quiz">
                    <div className="blue">Questionnaires</div>
                </Link>

                <Link className="link" to="/student-list">
                    <div className="pink">Students</div>
                </Link>

                <Link className="link" to="/question">
                    <div className="blue">Question</div>
                </Link>
            </div>
        </div>
    )
}