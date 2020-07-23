import React, { useEffect } from 'react';
import '../styles/scss/opening-page.scss';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/PageTools';
import superFetch from '../superFetch';

export default function OpeningPage() {
    useEffect(() => {
        (async () => {
            console.log('you are here', await superFetch('/challenges/hello'));
            const [res, err] = await superFetch('/challenges/hello');
            console.log('res: ', res);
        })()
    }, [])


    return (
        <div className="opening-page">
            {/* <Menu /> */}
            <Navbar mode={1} />

            <div className="title">
                <h1>English</h1>
                <p>with</p>
                <h1>Alexa</h1>
            </div>

            <div className="buttons">
                <Link to="/list-of-quiz">
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