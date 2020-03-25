import React, {useState} from 'react';


const Search = (props) => {

//State Variables for different fields
    const [house, setHouseName] = useState('');
    const [sign, setSign] = useState('');
    const [text, setText] = useState('');
    const [moon, setMoon] = useState(''); 
    
//Submit function that allows you to pass filtered fields from this component into filterUpdate function    
    const handleSubmit = () => {

        props.filterUpdate({
            house: house, 
            sign: sign, 
            moon: moon, 
            text: text, 
        });
    }
//Filter function that filters the different fields and then sets the state variables     
    const filter = (event) => {

    //House field
        var val = event.target.value;
        
        if (val.toLowerCase().indexOf("h=") === -1){

           var house_1 = null; 
        }
        else {

          house_1 = val.substring(
            val.lastIndexOf("h=") + 1, 
            val.lastIndexOf(" ")
            
           );
           val.replace(house_1, ""); 
           parseInt(house_1)
        }

       setHouseName(house_1)

    //Sign field
        if (val.toLowerCase().indexOf("s=") === -1){

        var sign_1 = null; 
        }

        else {

         sign_1 = val.substring(
            val.lastIndexOf("s=") + 1, 
            val.lastIndexOf(" ")
        );

        val.replace(sign_1, ""); 
        parseInt(sign_1) 

       } 

        setSign(sign_1)

    //Moon field

        if (val.toLowerCase().indexOf("m=") === -1){

            var moon_1 = null; 
            }
        
        else {
            moon_1 = val.substring(
                val.lastIndexOf("m=") + 1, 
                val.lastIndexOf(" ")
            );
            val.replace(moon_1, ""); 
            parseInt(moon_1) 

            if (moon_1 > 8 || moon_1 < 1){
                moon_1 = null; 
            }
        }

        setMoon(moon_1); 
    //Text field

        if (val === -1){

            var text_1 = null; 
            }

         else{
            text_1 = val; 
            }

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
 