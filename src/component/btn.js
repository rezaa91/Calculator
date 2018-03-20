import React from 'react';


//THINGS TO DO
//cache dom positions globally to component to stop having to cache in each code block


class Btn extends React.Component{
    
    //init functio
    init = () => {
        let displayAnswer = document.getElementById('answer'); //cache answer location
        let specialChar = document.getElementsByClassName('special_char'); //cache DOM location of special characters
        let plus_minus = document.getElementsByClassName('plus_minus')[0]; //cache DOM location of +/- char
        
        //reset answer value
        displayAnswer.textContent = 0;
        
        
        //undisable all special characters
        for(let i = 0; i<specialChar.length; i++){
            specialChar[i].firstChild.disabled = false;
        }
        plus_minus.firstChild.disabled = false;
    }
    
    
    //get value of btn pressed by user
    getValue = (e) => { //get value from which ever btn pressed
        //run init function
        this.init();
        
        //store btn value and sum wrapper in var
        let btnVal = e.target.textContent; //store btn value in var
        let sumWrapper = document.getElementById('sum'); //cache sum wrapper location
        
        
        //store special characters in obj
        let returnVals = {
            plus: "+",
            minus: "-",
            multiply: "*",
            divide: "/",
            equals: "=",
            decimal: '.'
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

        
        //only allow one decimal point per number
        if(btnVal === '.'){
            let regExp = /[^0-9]./g; //this reg exp finds individual numbers
            let getCurrentSum = sumWrapper.textContent; //get current sum value
            getCurrentSum = getCurrentSum.split(new RegExp('[-+*/?]','g')); //split current sum by seperators
            
            let ifDec = regExp.test(getCurrentSum[getCurrentSum.length-1]); //if individual number, matches regExp var 
            
            if(ifDec){
                return; //return
            }
        }
        
        
        //only allow 1 zero to be entered on start up
        if(btnVal === '0' && sumWrapper.textContent[sumWrapper.textContent.length-1] === '0' && sumWrapper.textContent.length <2){
            return;
        }
        
        
        
        //if zero is entered prior to another number, and number is not a decimal, replace zero with new inputted value
        let numbers = ['1','2','3','4','5','6','7','8','9']; //store all numbers in arr
        let chars = ['+','-','*','/','+/-',undefined]; //store all possible chars to appear 2 before 0 which will need replacing
    
        for(let i = 0; i<numbers.length; i++){
            //if value is a number, and the last inputted char was a zero
            if(btnVal === numbers[i] && sumWrapper.textContent[sumWrapper.textContent.length - 1] === '0'){
                for(let j = 0; j<chars.length; j++){
                    //if the char before the zero was any of the arr char values, replace the zero with the current btnVal
                    if(sumWrapper.textContent[sumWrapper.textContent.length-2] === chars[j]){
                        let newString = sumWrapper.textContent.substring(0, sumWrapper.textContent.lastIndexOf('0')) + btnVal + sumWrapper.textContent.substring(sumWrapper.textContent.lastIndexOf('0')+1);
                        sumWrapper.textContent = newString.substring(0,newString.length-1);
                    }
                }
            }
        }
        
        
        

        this.printVal(btnVal); //print value to sumWrapper
    }
    
    
    
    
    //print value of btn pressed to sum wrapper
    printVal = (val) => {
        let sumWrapper = document.getElementById('sum'); //cache DOM location to place sum
        let specialChar = document.getElementsByClassName('special_char'); //cache DOM location of special characters
        let plus_minus = document.getElementsByClassName('plus_minus')[0]; //cache DOM location of +/- char
        let length = sumWrapper.textContent.length; //get length of sum wrapper
        
        //disable special characters if value is a special character - as 2+ special characters can not appear in a row
        for(let i = 0; i<specialChar.length; i++){
            if(val === specialChar[i].firstChild.textContent){
                for(let i = 0; i<specialChar.length; i++){
                    specialChar[i].firstChild.disabled = true;
                }
            }
            //if btn pressed after special char is a zero - do not allow any more than 1 zero being pressed and return (unless special character is a decimal point)
            if(val === '0' && sumWrapper.textContent[length-2] !== specialChar[4].firstChild.textContent && sumWrapper.textContent[length-2] === specialChar[i].firstChild.textContent && sumWrapper.textContent[length-1] === '0'){
                return;
            }
        }
        
        
        //display negative sign if btn pressed was +/-
        if(val === '+/-'){
            val = '-';
            plus_minus.firstChild.disabled = true; //disable +/- btn
        }

        

        if(val === "C"){ //if 'cancel' btn pressed - reset sum
            sumWrapper.textContent = ""; //remove value from sum
            this.init(); //run init function
            return; //return
        } // end of cancel IF
        
        
        
        
        if(val === "="){ //if equals sign pressed, calculate current sum - aslong as last character not a special character (see returnVals obj below)
            
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
            
            //if last btn pressed is a special char - do not run calculate
            for(let key in returnVals){
                let obj = returnVals[key];
                for(let prop in obj){
                    if(lastChar === obj[prop]){ // if last character is a special char, return
                        return;
                    }
                }
            }
            
            
            this.calculateSum(); //run calculateSum function
            sumWrapper.textContent = ""; //remove value from sum wrapper
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


//export btn
export default Btn;

