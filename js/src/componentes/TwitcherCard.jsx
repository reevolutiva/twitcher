import twitch_logo from '../assets/twitch_logo.png';
import twitch_logo_white from '../assets/twitcht_white.png';
import yt_logo from '../assets/youtube_white.png';
import twchr_logo from '../assets/Isologo_twitcher.svg';
import yt_logo_white from '../assets/youtube_white.png';
import ScheduleCard from './twchr-card/SchedulesCard';
import { useEffect, useState } from 'react';
import EmbedCard from './twchr-card/EmbedCard';
const TwitcherCard = () => {
	const [tab,setTable] = useState("schedule");
	const [slide,setSlide] = useState(<ScheduleCard/>);

	useEffect(()=>{
		if(TWCHR_CPT_DATA["$twchr-from-api_id"].length > 0){
			setTable("embed");
		}
	},[]);

	useEffect(()=>{
		switch (tab) {
			case "schedule":
					setSlide(<ScheduleCard/>);
				break;
			case "embed":
				setSlide(<EmbedCard />);
				break;
		
			default:
				break;
		}
	},[tab]);

    return ( 
        <div className="twchr_custom_card--contain" >
	
			<div className="twchr-tab-card-bar">
				<div className={tab == "embed" ? "twchr-tab-card twchr-tab-card-embed" : "twchr-tab-card twchr-tab-card-embed disabled"} onClick={e => setTable("schedule")}>
					<img src={twitch_logo} alt="twitch" />
					<h3>Schedule streamings and series</h3>
				</div>
				<div className={tab == "schedule" ? "twchr-tab-card twchr-tab-card-embed" : "twchr-tab-card twchr-tab-card-embed disabled"} onClick={e => setTable("embed")}>
					<img src={twitch_logo_white} alt="twitch" />
					<img src={yt_logo_white} alt="twitch" />
					<h3>Embed past streaming or VOD</h3>
				</div>
				
			</div>
			<div className="custom_card_row">
                {slide}
			</div>
			{
				TWCHR_CPT_DATA["$twchr-from-api_duration"].length > 0 ?
					<>
						<div>
							<h2 className='twchr_streaming_states_bage'>Status: <span style={{backgroundColor:"var(--twchr-blue)"}}>{TWCHR_CPT_DATA["$twchr_streaming_states"][0].name}</span></h2>
							<div>
								<p><span>Duración: </span>{`${TWCHR_CPT_DATA["$twchr-from-api_duration"]}`}</p>
								<figure>
									<img src={TWCHR_CPT_DATA["$twchr-from-api_thumbnail_url"].replace("{width}","250").replace("{height}","150")} />
								</figure>
							</div>
						</div>
						<div className="twchr-card-img-footer">
							<img src={twchr_logo} alt="logo twitcher" />
						</div>
					</>
				: ''
			}
		
	</div>
     );
}
 
export default TwitcherCard;