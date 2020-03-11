import React from 'react';
import logo from './logo.svg';
import './App.css';

class Button extends React.Component {
    constructor(props) {
        super(props)
        this.myClick = this.myClick.bind(this);
    }
    myClick() {
        document.querySelectorAll('.wrapper')[0].style.backgroundColor = '#F9F5FF';
    }
    render() {
        return ( <
            button onClick = { this.myClick }
            className = "clicker" > Изменить дизайн < /button>
        )
    }
}
export default Button;