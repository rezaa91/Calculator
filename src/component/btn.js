import React from 'react';


//THINGS TO DO
//cache dom positions globally to component to stop having to cache in each code block

class Btn extends React.Component{
    
    getValue = (e) => { //get value from which ever btn pressed
        let btnVal = e.target.textContent; //store btn value in var
        this.printVal(btnVal)
    }
    
    printVal = (val) => {
        let sumWrapper = document.getElementById('sum'); //cache DOM location to place sum
        
        if(val === "C"){ //if 'cancel' btn pressed - reset sum
            sumWrapper.textContent = ""; //remove value
            return;
        }
        if(val === "="){ //if equals sign pressed, calculate current sum
            this.calculateSum(); //run calculateSum function
            sumWrapper.textContent = ""; //remove value
            return;
        }
        sumWrapper.textContent += val; //display sum in sumWrapper
    }
    
    calculateSum = () => { //calculate the sum and display results
        let getCurrentSum = document.getElementById('sum').textContent;
        getCurrentSum = getCurrentSum.split('+'); //TEST CODE - REMOVE

        console.log(parseFloat(getCurrentSum[0])+parseFloat(getCurrentSum[1])); //PLACEHOLDER - REMOVE
        let answer = parseFloat(getCurrentSum[0])+parseFloat(getCurrentSum[1]); //PLACEHOLDER - REMOVE
        
        let displaySum = document.getElementById('answer');
        displaySum.textContent = answer;
    }
    
    render(){
        return(
            <div className={this.props.class}>
                <button onClick={this.getValue}>{this.props.character}</button>            
            </div>
        );
    }
}


export default Btn;

