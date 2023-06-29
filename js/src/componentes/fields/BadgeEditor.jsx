import { useState } from "react";

const BadgeEditor = ({badgeView,opt}) => {
    const [mode,setMode] = useState(false);
    return ( 
        <div className="twchr_cards_input_badges ">
            {mode ?
                <select>
                    {opt.map(e => <option onClick={e => setMode(false)} value={e.value} >{e.name}</option>)}
                </select>
            :
            <badges onClick={e => setMode(true)} id="twchr_term_serie_list"><span>{badgeView}</span></badges>
            }
        </div>
     );
}
 
export default BadgeEditor;