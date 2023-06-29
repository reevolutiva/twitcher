const Select = ({optList}) => {
    return ( 
        <select>
            {optList.map(opt => <option value={opt}>{opt}</option>)}
        </select>
     );
}
 
export default Select;