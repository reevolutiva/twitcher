import { useEffect, useState } from "react";
import moment from "moment-js";


const SerieNameField = ({serieList, serieDefault}) => {
    const [chapter, setChapter] = useState([]);
    function setSelectManage(params) {
        const nuevo0 = [];
        
        serieList.forEach(row =>{
            if(row.term_id == params ){
                nuevo0.push(row.chapters);
            }
        });

        let nuevo1 = "";
        
        nuevo0.forEach(row => {
            const n = row.map(r =>{return {"name":r.title, "value":r.id,"start_time":moment(r.start_time).format("DD/MM/yyyy h:m"),"end_time":moment(r.end_time).format("DD/MM/yyyy h:m")}});
            nuevo1 = n;
        });

        setChapter(nuevo1);
    }

    return ( 
        <>
            <div className="twchr-card-row serie-name">
                <label for="twchr_schedule_card_input--title">Serie Name</label>
                <select onChange={e => setSelectManage(e.target.value)}>
                    {
                        serieList.map(element => 
                                <option value={element.term_id}>{element.name}</option>
                            )
                    }
                </select>
            </div>
            {
                chapter.length > 0 ?
                <div className="twchr-card-row serie-chapter">
                    <label for="twchr_schedule_card_input--title">Serie chapter</label>
                    <div className="twchr_cards_input_badges">
                        <select>
                            {
                                chapter.map(opt => <option value={opt.value}>{`${opt.name} - ${opt.start_time}`}</option>)
                            }
                        </select>
                    </div>
                </div>
                : <div className="twchr-card-row" >
                        <label 
                            for="twchr_schedule_card_input--serie__name" 
                            id="twchr_schedule_card_input--serie__name--label">
                            Chapter
                    </label>
                    {
                        TWCHR_CPT_DATA["$twchr_date_time_slot"].length > 0 ?
                        <div className="twchr_cards_input_badges">
                            <badges id="twchr_term_serie_list">
                                <span>{`${moment(JSON.parse(TWCHR_CPT_DATA["$twchr_date_time_slot"]).start_time).format("DD/MM/yyyy h:m")} - ${moment(JSON.parse(TWCHR_CPT_DATA["$twchr_date_time_slot"]).end_time).format("DD/MM/yyyy h:m")}`}</span>
                            </badges>
                        </div>
                        : ''
                    }
                    
                </div> 
            }
            
        </>
     );
}
 
export default SerieNameField;
            
            