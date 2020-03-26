import React, {useState} from 'react';


const Search = (props) => {

//State Variables for different fields
    const [house, setHouseName] = useState(0);
    const [sign, setSign] = useState(0);
    const [text, setText] = useState('');
    const [moon, setMoon] = useState(0); 
    
//Submit function that allows you to pass filtered fields from this component into filterUpdate function    
    const handleSubmit = () => {

        props.setFilterHoroscope({
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
           setHouseName(null) 
        }
        else {
           var house_1 = val.substring(val.lastIndexOf("h="));
           var house_2 = house_1.substring(0,house_1.indexOf(" "));
           var house_3 = house_2.substring(2);
           val = val.replace(house_2+" ", "");
           setHouseName(parseInt(house_3))         
        }


    //Sign field
        if (val.toLowerCase().indexOf("s=") === -1){
            setSign(null) 
        }
        else {
            var sign_1 = val.substring(val.lastIndexOf("s="));
            var sign_2 = sign_1.substring(0,sign_1.indexOf(" "));
            var sign_3 = sign_2.substring(2);
            val = val.replace(sign_2+" ", "");
            setSign(parseInt(sign_3))         
        }

    //Moon field

        if (val.toLowerCase().indexOf("m=") === -1){
            setMoon(null);
            }
        
        else {
            var moon_1 = val.substring(val.lastIndexOf("m="));
            var moon_2 = moon_1.substring(0,moon_1.indexOf(" "));
            var moon_3 = moon_2.substring(2);
            var ok = parseInt(moon_3)
            val = val.replace(moon_2+" ", "");
            if (ok > 8 || ok < 1){
                ok = null; 
            }
            setMoon(ok); 
        }

    //Text field

        if (val === -1){

            var text_1 = ''; 
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
 