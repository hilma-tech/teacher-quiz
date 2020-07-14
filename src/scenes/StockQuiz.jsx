import React, { Component } from 'react';
import '../styles/scss/stock-quiz.scss';
import { Navbar, ListUnit, PlusBtn } from '../components/PageTools';


export default class StockQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [
                {
                    category: 'Capital City', unitName: '123456',
                    ansNum: 25
                },
                {
                    category: 'Capital City', unitName: '123456',
                    ansNum: 25
                },
                {
                    category: 'Capital City', unitName: '123456',
                    ansNum: 25
                },
                {
                    category: 'Capital City', unitName: '123456',
                    ansNum: 25
                },
                {
                    category: 'Capital City', unitName: '123456',
                    ansNum: 25
                },
                {
                    category: 'Capital City', unitName: '123456',
                    ansNum: 25
                },
            ]
        }
    }


    render() {
        const { quizzes } = this.state;

        return (
            <div className="stock-quiz">
                <Navbar icon='menu' />

                <h1>Questionnaires</h1>

                {quizzes.map(({ category, ansNum, unitName }) =>
                    <ListUnit
                        mode={1}
                        info={{
                            title: category,
                            subTitle: unitName,
                            numInfo: ansNum
                        }} />
                )}

                <PlusBtn redirect="create-challenge" />
            </div>
        )
    }
}


