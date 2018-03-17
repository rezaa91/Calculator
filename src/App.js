import React from 'react';
import './App.css';


//components
import Screen from './component/screen.js';
import Btn from './component/btn.js';


class Layout extends React.Component{
    render(){
        return(
            <div className="wrapper">
                <Screen />
            
                <br />
            
                <Btn character="C" class="clear" />
                <Btn character="/" class="btn_wrapper signs special_char" />
            
                <br />
            
                <Btn character="1" class="btn_wrapper" />
                <Btn character="2" class="btn_wrapper" />
                <Btn character="3" class="btn_wrapper" />
                <Btn character="*" class="btn_wrapper signs special_char" />
                
                <br />
                <Btn character="4" class="btn_wrapper" />
                <Btn character="5" class="btn_wrapper" />
                <Btn character="6" class="btn_wrapper" />
                <Btn character="-" class="btn_wrapper signs special_char" />
                
                <br />
            
                <Btn character="7" class="btn_wrapper" />
                <Btn character="8" class="btn_wrapper" />
                <Btn character="9" class="btn_wrapper" />
                <Btn character="+" class="btn_wrapper signs special_char" />
            
                <br />    
            
                <Btn character="+/-" class="btn_wrapper plus_minus" />
                <Btn character="0" class="btn_wrapper" />
                <Btn character="." class="btn_wrapper special_char" />
                <Btn character="=" class="btn_wrapper equals" />
            
            </div>
        );
    }
}

export default Layout;
