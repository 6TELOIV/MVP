import React, {useState} from 'react';


const Search = (props) => {

    const [house, setHouseName] = useState('');
    const [sign, setSign] = useState('');
    const [text, setText] = useState('');
    
    
    const handleSubmit = () => {

        props.filterUpdate({
            house: house, 
            sign: sign, 
            text: text, 
        });
    }
    
    const filter = (event) => {
        
        
        var house_1 = event.substring(
            event.lastIndexOf("h=") + 1, 
            event.lastIndexOf(" ")
        );

        setHouseName(house_1)

       var sign_1 = event.substring(
            event.lastIndexOf("s=") + 1, 
            event.lastIndexOf(" ")
        );
        setSign(sign_1)

        var text_1 = event.substring(
            event.lastIndexOf("t=") + 1, 
            event.lastIndexOf(":")
        );
        setText(text_1)

       
    }


    return (
        <form onSubmit={e => {e.preventDefault(); handleSubmit()}}>
            <input onChange={event => filter(event)} type="string" placeholder="Type to Filter"/>
            <button type="submit"> Search item</button>
        </form>
    );

};

export default Search;
