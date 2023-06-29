import { useEffect, useState } from "react";
import EmbedList from "./EmbedList";

const MetaBox = ()=>{
    return (
        <div class="twchr_car_tab3">	
            <label> <p>Youtbe URL</p> 
                    <input id="twchr-yt-url-link" type="text" name='twchr_streams__yt-link-video-src' class="twchr_schedule_card_input" value="" />
            </label>
        </div>
    )
}




const EmbedCard = () => {    
    const [src,setSrc] = useState("tw");
    const [content,setContent] = useState(<EmbedList/>);

    useEffect(()=>{
        if(src == "tw"){
            setContent(<EmbedList />);
        }

        if(src == "yt"){
            setContent(<MetaBox />);
        }
    },[src]);
    function magangeEmbed(event) {
        event.preventDefault();
        wp.apiRequest({
            path:'twchr/v1/twchr_get_streaming',
            method:'GET',
          }).then(data =>{
            let getParameters = '?post_type=twchr_streams&get_thing=videos' // Creo la primera parte de la nueva ruta
            let arrayCVS = '';
            data.forEach(e =>{
                const nodo = event.target;
                let inputs = [...nodo.parentElement.parentElement.querySelectorAll(".twchr_modal_video_ajax")];
                inputs = inputs.map(r => {
                    return {checked: r.querySelector("input").checked,  value: r.querySelector("input").value,nodo: r.querySelector("label span:first-of-type").textContent};
                });
        
                inputs.forEach((r,i)=>{
                    if(r.checked){
                        
                        if(e.twchr_id == r.value){
                            if(i == inputs.length - 1){
                                arrayCVS += `${e.twchr_id},`;
                            }else{
                                arrayCVS += `${e.twchr_id}`;
                            }
                            
                            
                        }
                           
                    }
                });
            });
            getParameters += `&streams_id=${arrayCVS}`;
            let newURL = location.origin+location.pathname+getParameters;
            document.querySelector("#titlewrap input").value = newURL;
            console.log(newURL);
            //location.href=newURL;
          });
        
    }

    return ( 
        <section>
				<div className="twchr_card_embed_menu">
					<span>Embed from</span>
					<span>
						<input onClick={() => setSrc("tw")} className="twchr_button_get_videos" type="radio" name="twchr-card-src-priority" id="twchr-card-src-priority--tw" value="tw" checked={src == "tw" ? true : ''}/>
						<label for="twchr-card-src-priority--tw"><img src="" alt="" />Twitch</label>
					</span>
					<span>
						<input onClick={() => setSrc("yt")} type="radio" name="twchr-card-src-priority" id="twchr-card-src-priority--yt" value="yt" checked={src == "yt" ? true : ''}/>
						<label for="twchr-card-src-priority--yt"><img src="" alt=""/> Youtube</label>
					</span>
				</div>             
                {content}
				<div className="silde-2">	
					<button onClick={ e => magangeEmbed(e)} id="twchr-modal-selection__btn">Asign and Embed</button>
				</div>
					
			</section>
    );
}
 
export default EmbedCard;