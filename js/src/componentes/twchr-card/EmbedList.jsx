import React,{useState,useEffect} from 'react';
import { tchr_get_clips } from "../../twchr-async-function";
import twchr_check from "../../assets/twchr_check.png";
import moment from 'moment-js';

const EmbedList = () => {
    const [embedList,setEmbedList] = useState([]);
    useEffect(()=>{
        tchr_get_clips(
            TWCHR_CPT_ADMIN_VAR.twchr_app_token,
            TWCHR_CPT_ADMIN_VAR.twchr_keys["client-id"],
            TWCHR_CPT_ADMIN_VAR.twitcher_data_broadcaster.id,
            e =>{
                wp.apiRequest({
                    path:'twchr/v1/twchr_get_streaming',
                    method:'GET',
                  }).then(data => {
                    const nuevo = [];
                    e.forEach(i => {
                        if(data.find(r =>r.twchr_id == i.id)){
                            i.saved = true;
                        }else{
                            i.saved = false;
                        }
                        nuevo.push(i);
                        
                    });
                    setEmbedList(nuevo);
                  }); 
                //(e);
            }
          )
    },[]);

    return (
        <stream class="twchr_modal_get_videos">    
                    <div id="twchr_button_get_videos__content">
                        <ul class="twchr-modal-selection__list">
                            <li>Streaming name</li>
                            <li>Date</li>
                            <li>Already saved?</li>
                            <li>Import</li>
                        </ul>
                        <div class="content">
                        {
                            embedList.map((e,i) =>  <section className='twchr_modal_video_ajax'>
                                <label data-twchrDataPosition={i} for={`twchr_videos_ajax-${e.title}`}>
                                    <span>{e.title}</span>
                                    <span>
                                        {moment(e.created_at).format("DD-MM-YYYY")}
                                    </span>
                                    <span>
                                        {
                                            e.saved ?
                                                <img src={twchr_check} />
                                            : ''
                                        }
                                    </span>
                                </label>
                                <input type={location.href.includes("post-new.php?post_type=twchr_streams") ? 'checkbox' : 'radio'} data-position={i} id={`twchr_videos_ajax-${e.title}`} className='twchr_videos_ajax' name={`twchr_videos_ajax-${e.title}`} value={e.id}  />
                            </section> )
                    }
                </div>              
            </div>
        </stream>
    )
}
 
export default EmbedList;