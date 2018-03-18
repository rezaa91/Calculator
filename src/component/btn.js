import React from 'react';


//THINGS TO DO
//cache dom positions globally to component to stop having to cache in each code block


class Btn extends React.Component{
    
    //get value of btn pressed by user
    getValue = (e) => { //get value from which ever btn pressed
        let btnVal = e.target.textContent; //store btn value in var
        let sumWrapper = document.getElementById('sum'); //cache sum wrapper location
        let displayAnswer = document.getElementById('answer'); //cache answer location
        let specialChar = document.getElementsByClassName('special_char'); //cache DOM location of special characters
        let plus_minus = document.getElementsByClassName('plus_minus')[0]; //cache DOM location of +/- char
        
        
        
        
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
                if((sumWrapper.textContent === "" && btnVal === obj[prop])){ //'return' if special char entered before digit
                    return;
                }
            }
        }
        
        
        //undisable all special characters
        for(let i = 0; i<specialChar.length; i++){
            specialChar[i].firstChild.disabled = false;
        }
        plus_minus.firstChild.disabled = false;
        
        
        
        
        //only allow one decimal point per number
        if(btnVal === '.'){
            let regExp = /[^0-9]./g; //this reg exp finds individual numbers
            let getCurrentSum = sumWrapper.textContent; //get current sum value
            let seperators = ['+','-','*','/']; //split current sum value by the values in this array
            getCurrentSum = getCurrentSum.split(new RegExp('[-+*/?]','g')); //split current sum by seperators
            
            let ifDec = regExp.test(getCurrentSum[getCurrentSum.length-1]); //if individual number, matches regExp var 
            
            if(ifDec){
                return; //return
            }
        }
        
        

        this.printVal(btnVal); //print value to sumWrapper
    }
    
    
    
    
    //print value of btn pressed to sum wrapper
    printVal = (val) => {
        let sumWrapper = document.getElementById('sum'); //cache DOM location to place sum
        let displaySum = document.getElementById('answer'); //cache DOM location of answer
        let specialChar = document.getElementsByClassName('special_char'); //cache DOM location of special characters
        let plus_minus = document.getElementsByClassName('plus_minus')[0]; //cache DOM location of +/- char
        let length = sumWrapper.textContent.length; //get length of sum wrapper
        
        //disable special characters if value is a special character 
        for(let i = 0; i<specialChar.length; i++){
            if(val === specialChar[i].firstChild.textContent){
                for(let i = 0; i<specialChar.length; i++){
                    specialChar[i].firstChild.disabled = true;
                }
            }
            //if btn pressed after special char is a zero - do not allow any more than 1 zero being pressed and return
            if(val === '0' && sumWrapper.textContent[length-2] === specialChar[i].firstChild.textContent && sumWrapper.textContent[length-1] === '0'){
                return;
            }
        }
        
        
        
        for(let i = 0; i < specialChar.length; i++){
            //if current input val is not a special character incl zero - continue if statement
            if(val !== specialChar[i].firstChild.textContent && val !== document.getElementsByClassName('equals')[0].firstChild.textContent){
                
                //replace zero with new val if cur value is not zero, last btn pressed was zero, and prior to last btn pressed was special char                
                if(val !== '0' && sumWrapper.textContent[length-1] === '0' && sumWrapper.textContent[length-2] === specialChar[i].firstChild.textContent){
                    //replace zero with new val
                    let getZero = sumWrapper.textContent[length-1]; //get zero
                    let newVal = sumWrapper.textContent.replace(getZero, ''); //replace zero with empty string    
                    sumWrapper.textContent = newVal; //display new val
                } 
            }            
        }
        
        
        //display negative sign if btn pressed was +/-
        if(val === '+/-'){
            val = '-';
            plus_minus.firstChild.disabled = true; //disable +/- btn
        }
        
        
       

        if(val === "C"){ //if 'cancel' btn pressed - reset sum
            sumWrapper.textContent = ""; //remove value from sum
            displaySum.textContent = 0; //revert sum back to init value
            return;
        } // end of cancel IF
        
        if(val === "="){ //if equals sign pressed, calculate current sum - aslong as last character not a special character (see returnVals obj below)
            
            //if last btn pressed is a special char - do not run calculate
            let length = sumWrapper.textContent.length; //get length of sum
            let lastChar = sumWrapper.textContent[length-1]; //store last character in sum
            
            //store special chars in obj
            let returnVals = {
                plus: "+",
                minus: "-",
                multiply: "*",
                divide: "/",
                decimal:"."
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
        answer = parseFloat(answer);
        
        displaySum.textContent = answer; //display answer
        sumWrapper.textContent = ''; //remove text from sum wrapper
    }
    
    //render function
    render(){
        return(
            <div className={this.props.class}>
                <button onClick={this.getValue}>{this.props.character}</button>            
            </div>
        );
    }
}


export default Btn;

