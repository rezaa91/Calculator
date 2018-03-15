import React from 'react';


class Screen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: 0
        }
    }
    render(){
        return(
            <div id="screen">
                <div id="sum">{this.state.sum}</div>
                <div id="answer">{this.state.display}</div>
            </div>
        );
    }
}


export default Screen;
