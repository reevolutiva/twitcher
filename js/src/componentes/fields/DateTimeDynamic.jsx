const DateTimeDynamic = (props) => {
    return ( 
        <div>
            {
                props.dateTime ?
                <div>
                    <input type="datetime-local" name={props.name} />
                </div>
                :
                <div>
                    <input type="text" name={props.name} id="" value={props.value} />
                </div>
            }
        
        </div>
     );
}
 
export default DateTimeDynamic;