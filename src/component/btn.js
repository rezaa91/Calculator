import React from 'react';


//THINGS TO DO
//cache dom positions globally to component to stop having to cache in each code block





class Btn extends React.Component{
    
    //get value of btn pressed by user
    getValue = (e) => { //get value from which ever btn pressed
        let btnVal = e.target.textContent; //store btn value in var
        let sumWrapper = document.getElementById('sum'); //cache sum wrapper location
        let displayAnswer = document.getElementById('answer'); //cache answer location
        
        //revert sum value back to zero
        if(displayAnswer.textContent !== "0"){
            displayAnswer.textContent = 0;
        }
        
        
        //store special characters in obj
        let returnVals = {
            plus: "+",
            minus: "-",
            multiply: "*",
            divide: "/",
            equals: "=",
            decimal: '.',
            zero: '0'
        }
        
        
        //do not display special char in sumWrapper if no previous number has been entered
        for(let key in returnVals){
            let obj = returnVals[key];
            for(let prop in obj){
                if((sumWrapper.textContent === "" && btnVal === obj[prop])){ //return if special char entered before digit
                    return;
                }
            }
        }
        
        //get +/- location
        let plus_minus = document.getElementsByClassName('btn_wrapper')[13];
        //if +/- has been previously made disabled, the undisable it
        if(plus_minus.firstChild.disabled){
            plus_minus.firstChild.disabled = false;
        }
        
        
        
        this.printVal(e,btnVal); //print value to sumWrapper
    }
    
    
    //print value of btn pressed to sum wrapper
    printVal = (e,val) => {
        let sumWrapper = document.getElementById('sum'); //cache DOM location to place sum
        let displaySum = document.getElementById('answer'); //cache DOM location of answer
        
        //if value is +/- btn - show negative sign
        if(val === '+/-'){
            val = '-';
            e.target.disabled = true;
        }
        
        
        if(val === "C"){ //if 'cancel' btn pressed - reset sum
            sumWrapper.textContent = ""; //remove value from sum
            displaySum.textContent = 0; //revert sum back to init value
            return;
        } // end of cancel IF
        
        if(val === "="){ //if equals sign pressed, calculate current sum 
            //if last btn pressed is a special char - do not run calculate
            let length = sumWrapper.textContent.length; //get length of sum
            let lastChar = sumWrapper.textContent[length-1]; //store last character in sum
            //store special chars in obj
            let returnVals = {
                plus: "+",
                minus: "-",
                multiply: "*",
                divide: "/"
            }
            
            for(let key in returnVals){
                let obj = returnVals[key];
                for(let prop in obj){
                    if(lastChar === obj[prop]){ // if last character is a special char, return
                        return;
                    }
                }
            }
            
            this.calculateSum(); //run calculateSum function
            sumWrapper.textContent = ""; //remove value
            return;
        } //end of equals IF
        
        sumWrapper.textContent += val; //display sum in sumWrapper
    }
    
    
    //calculate sum and display answer in DOM
    calculateSum = () => { //calculate the sum and display results        
        let displaySum = document.getElementById('answer'); //cache location of answer
        let sumWrapper = document.getElementById('sum'); //cache location of sum        
        let getCurrentSum = sumWrapper.textContent; //get current sum
        let answer = eval(getCurrentSum); //work out sum
        
        displaySum.textContent = parseFloat(answer); //display answer
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

