import { useState } from "react";
import { getCategorysTwitch } from "../../twchr-async-function";

const SelectAutocomplete = () => {
    const [opt,setOpt] = useState([]);
    const [value,setValue] = useState("");
    const [clases,setClases] = useState("twchr_modal");

    function query(params) {
        getCategorysTwitch(
            TWCHR_CPT_ADMIN_VAR.twchr_app_token, 
            TWCHR_CPT_ADMIN_VAR.twchr_keys["client-id"], 
            params, (e)=>{
                setOpt(e);
        });
    }
    return ( <div className="twchr-select-autocomplete">
                <input type="text" onChange={e => {query(e.target.value); setValue(e.target.value);setClases("twchr_modal active")}} value={value} />
                <modal className={clases}>
                    {
                        opt.map(input => <label onClick={e => {setValue(input.name); clases == "twchr_modal active" ? setClases("twchr_modal") : setClases("twchr_modal active")} }> <p>{input.name}</p> <input type="radio" name={"twchr-select-autocomplete"} value={input.id}/> </label>)
                    }
                </modal>
            </div> );
}
 
export default SelectAutocomplete;