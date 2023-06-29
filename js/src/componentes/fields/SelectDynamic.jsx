import { useEffect, useState } from "react";

const SelectDynamic = ({nameField, selecField, selectMode=false}) => {
    const [select,setSelect] = useState([
        {name:"undefined", value:"undefined"}
    ])

    const [txt,setTxt] = useState("");

    return ( 
        <div>
            {
                selectMode ?
                <div>
                    <select name={nameField}>
                        {
                            selecField.map(row => <option value={row.name}>{row.name}</option>)
                        }
                    </select>
                </div>
                : <div>
                    <input type="text" value={txt} name={nameField} onChange={e => setTxt(e.target.value)} />    
                  </div>
            }
        </div>
    );
}
 
export default SelectDynamic;