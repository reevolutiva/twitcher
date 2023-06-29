import { Suspense, useEffect, useState } from "react";
import Loader from "../Loader";
import SelectDynamic from "../fields/SelectDynamic";
import DateTimeDynamic from "../fields/DateTimeDynamic";
import BadgeEditor from "../fields/BadgeEditor";
import Select from "../fields/Select";
import SerieNameField from "./SerieNameField";
import SelectAutocomplete from "../fields/SelectAutocomplete";

const ScheduleCard = () => {
    const [serieList,setSerieList] = useState([]);
    const [recurring, setRecurring] = useState(true);
    const [tab1Data,setTab1Data] = useState({
        "twchr_schedule_card_input--is_recurrig":"",
        "twchr_schedule_card_input--title":"",
        "twchr_schedule_card_input--serie__name":"",
        "twchr_schedule_card_input--dateTime":"",
        "twchr_schedule_card_input--duration":"",
        "twchr_date_time_slot":""
    });

    const radioManage = (e) =>{
        const nodo = e.target;
        let label = [...nodo.parentElement.parentElement.querySelectorAll("input")];
        label = label.map(e => { return {"value":e.value,"checked":e.checked}});

        label.forEach(e => {
            if (e.checked){
                setRecurring(e.value == "true");
            }
        });
    }
    
    useEffect(()=>{
        wp.apiRequest({
            path:'twchr/v1/twchr_get_serie',
            method:'GET',
          }).then(data => {
            setSerieList(data);
          }); 
    },[]);


    useEffect(()=>{
        const $term_serie = [];
        

        JSON.parse(TWCHR_CPT_DATA["$term_serie"]).forEach(element => {
            const res = {
                name: element.name,
                id:element.term_id,
                origin: element.taxonomy
            }

            $term_serie.push(res);
        });

 
        const data = {
            "twchr_schedule_card_input--is_recurrig":TWCHR_CPT_DATA["$is_recurring"] == '' ? false : true,
            "twchr_schedule_card_input--title":TWCHR_CPT_DATA["$title"],
            "twchr_schedule_card_input--serie__name":TWCHR_CPT_DATA["$serie"],
            "twchr_schedule_card_input--dateTime":TWCHR_CPT_DATA["$date_time"],
            "twchr_schedule_card_input--duration":TWCHR_CPT_DATA["$duration"],
            "twchr_date_time_slot":TWCHR_CPT_DATA["$twchr_date_time_slot"].length > 0 ? JSON.parse(TWCHR_CPT_DATA["$twchr_date_time_slot"]) : ""
        };

        setTab1Data(data);

    },[]);

    return ( 
        <Suspense fallback={ <Loader />}>
            <section className="silde-1">
                <div className="twchr_car_tab1">
                    <div className="twchr-card-row is_recurring">
                        <label>Recurring</label>
                        <div className="is-recurring-input-group">
                            <section>
                                <label>
                                    <p>Yes</p>
                                    <input type="radio" name="twchr_schedule_card_input--is_recurrig" value="true" onClick={()=> setRecurring(true)} checked={recurring ? true : ''} />
                                </label>
                                <label>
                                    <p>No</p>
                                    <input type="radio" name="twchr_schedule_card_input--is_recurrig" value="false" onClick={()=> setRecurring(false)} checked={recurring ? '' : true}/>
                                </label>
                            </section>
                        </div>
            
                        <div className="status">
                            <h4>Programed</h4>
                        </div>
                        <picture className="twchr-schedule-card-status-container">
                                    <div>
                                        <img src={TWCHR_CPT_DATA["$twchr_twicth_twitch_cat_img"]} alt="Twitcher Stream Category Thumbnail" />
                                        <h5></h5>
                                    </div> 
                        </picture>
                        <p>¿Is this streaming part of a serie or recurrent streaming?</p>
                    </div>

                    {
                            recurring ?
                                <SerieNameField serieList={serieList} serieDefault="test"/>
                            : 
                                <>
                                <div className="twchr-card-row serie">
                                    <label 
                                            for="twchr_schedule_card_input--serie__name" 
                                            id="twchr_schedule_card_input--serie__name--label">
                                            Streaming Title
                                    </label>
                                    <input type="text" value="" />
                                    <p id="twchr_card_button_create_new_serie">
                                        <a target="_<blank" 
                                            href={`${location.origin}/edit-tags.php?taxonomy=serie&post_type=twchr_streams&from_cpt_id`}>Create or Edit serie</a>
                                    </p>
                                </div>
                                <div className="twchr-card-row">
                                    <label for="twchr_schedule_card_input--dateTime">Streaming Date & Time</label>
                                    <DateTimeDynamic 
                                        name="twchr_schedule_card_input--dateTime"
                                        value={"ola"}
                                        dateTime={true}
                                    />                
                                </div>
                                </>
                    }
                    <div className="twchr-card-row tw-category" >
                        <label for="twchr_schedule_card_input--category">Twitch category</label>
                        <SelectAutocomplete />
                        { 
                            JSON.parse(TWCHR_CPT_DATA["$term_cat_twcht"]).length > 0 ?
                            <div className="twchr_cards_input_badges">
                                <badges id="twchr_term_serie_list">
                                    <span>{`${JSON.parse(TWCHR_CPT_DATA["$term_cat_twcht"])[0].name}`}</span>
                                </badges>
                            </div>
                            :''
                        }           
                    </div>
                    <div className="twchr-card-row" >
                        <label for="twchr_schedule_card_input--duration">Duration (mins)</label>
                        <input 
                            id="twchr_schedule_card_input--duration"  
                            name="twchr_schedule_card_input--duration"	
                            className="twchr_schedule_card_input" 
                            type="number" 
                            value={tab1Data["twchr_schedule_card_input--duration"]} />
                        
                    </div>	
                    <p id="twchr_twtich_schedule_response" ></p>
                    <input type="hidden" name="twchr_stream_twtich_schedule_id" id="twchr_stream_twtich_schedule_id" value ="" />  
                </div>
            </section>
            <button className="twchr-btn-general" id="twchr-modal-schedule__btn">save</button>
        </Suspense>
     );
}
 
export default ScheduleCard;