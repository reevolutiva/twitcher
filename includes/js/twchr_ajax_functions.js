
// Funcion que obtiene los parametros GET con JS
/**
 * It fetches a URL and returns the response in the format you specify
 * @param url - The url to fetch from.
 * @param callback - The function to be called when the request is complete.
 * @param mode - json, blob, or text
 * @param [requestOptions=false] - This is an object that contains the request options.
 */
async function twchrFetchGet (url, callback, mode, requestOptions=false){
    let get;
    if(requestOptions != false){
        get = await fetch(url,requestOptions);
    }else{
        get = await fetch(url);
    }
    
    let response;
    switch (mode) {
      case "json":
        response = await get.json();
        break;
      case "blob":
        response = await get.blob();
        break;
      default:
        response = await get.text();
        break;
    }
    callback(response);
  }


/**
 * Trae una lista de categorias de twicht segun los filtra query
 * @param {*} appToken 
 * @param {*} client_id 
 * @param {*} query 
 * @param {*} callback 
 */
  const getCategorysTwitch = async (appToken, client_id, query, callback=false)=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${appToken}`);
    myHeaders.append("Client-Id", client_id);

    const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response;
    if(!query==''){
        const get = await fetch("https://api.twitch.tv/helix/search/categories?query="+query, requestOptions);
        response = await get.json();
        const responseFromApi = response.data;
       
            const select = document.querySelector(".twchr_modal");

            let innerSelect= '';
            responseFromApi.forEach(item => {
                const id = item.id;
                const name = item.name;
                const optionForm = `<section><label for='twchr_toApi_category_ajax-${name}'>${name}</label><input type='radio' id='twchr_toApi_category_ajax-${name}' class='twchr_toApi_category_ajax_radio' name=twchr_toApi_category_ajax' value='${id}'></section>`;
                innerSelect += optionForm;
            });
            select.innerHTML = innerSelect;
        
        if(callback != false){
            callback(response);
        }

        
    }else{
        response = new Error('Parametro query vacio');
        console.log(response);
    }
    
 
}

/**
 * Trae una lista de los schedules
 * @param {*} callback 
 */
const getSchedules_by_id = async (callback) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${tchr_vars_admin.twchr_app_token}`);
    myHeaders.append("client-id", tchr_vars_admin.twchr_keys['client-id']);

    const broadcaster_id = tchr_vars_admin.twitcher_data_broadcaster.id;
    const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

   let url = `https://api.twitch.tv/helix/schedule?broadcaster_id=${broadcaster_id}`;

   const get = await fetch(url , requestOptions);
   const response = await get.json();
   const arrayList = response.data;

   callback(arrayList)


}

// Hago la peticion de videos a Twitch
const tchr_get_clips = async (appToken, client_id, user_id,callback_ajax=false)   =>{
const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${appToken}`);
myHeaders.append("client-id", client_id);

    const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

   const get = await fetch(`https://api.twitch.tv/helix/videos?user_id=${user_id}`, requestOptions);
   const response = await get.json();
   const arrayList = response.data;
   let Content = ""; // Inizializo Content
   
   // Si el parametro callback_ajax no esta definido
   // Significa que estamos en edit del post y sigue el curso
   // del algoritmo
  if(callback_ajax === false){
    // Creo tantos input-radio como videos tenga la api
    arrayList.forEach((item, index) => {
        const id = item.id;
        const title = item.title;
        const date_raw = item.created_at; // Fecha en RFC
        let date = new Date(date_raw);
        
        date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // fecha en formato dd/mm/yyyy
        Content += `<section class='twchr_modal_video_ajax'>
                        <label data-twchrDataPosition='${index}' for='twchr_videos_ajax-${title}'><span>${title}</span><span>${date}</span><span></span></label>
                        <input type='radio' data-position='${index}' id='twchr_videos_ajax-${title}' class='twchr_videos_ajax' name=twchr_videos_ajax' value='${id}'>
                    </section>`;

    });


       // Introdusco la lista de check-boxs al modal .twchr_modal_get_videos
       GSCJS.queryOnly("#twchr_button_get_videos__content .content").innerHTML = Content;

       // Guardo los inputs radio creados más arriba
       const input = GSCJS.queryAll(".twchr_modal_get_videos section input");
       const postBox = GSCJS.queryAll("#twittcher-stream .inside input");

       // Guardo boton asign 
       const asign_btn = GSCJS.queryOnly(".twchr_custom_card--contain  #twchr-modal-selection__btn");

       asign_btn.addEventListener('click',(event)=>{
        //console.log(event.target);
        event.preventDefault();
        let pos;
        input.forEach(item => {
            item.checked ? pos = item.getAttribute('data-position') : 'not found';
        });
        if(pos != 'not found'){
            const data = arrayList[pos]; // tomo el video de la api con el mismo index guardado en pos
            let titulo = data.title;
            twchrFetchGet(tchr_vars_admin.wp_api_route+'twchr/v1/twchr_get_streaming',(i)=>{
                // Pregunto si este video ya existe
                i.some(it => it.title == titulo) ? titulo = titulo+" (Duplicate)" : titulo = titulo; 
                GSCJS.queryOnly("#titlewrap label").classList.add('screen-reader-text');
                GSCJS.queryOnly("#titlewrap input").value = titulo; // Escribo el titulo del post                    
            },'json'); 

            let stream_data_from_twitch = '';
            for (element in data){
                stream_data_from_twitch =  stream_data_from_twitch + "&"+element+"="+data[element];
            }

            location.href = location.href+"&twchr_twitch_embed__host="+data.user_name+"&twchr_twitch_embed__video="+data.id+stream_data_from_twitch;
        }
       });
  }else{ // Sí se definio un callback ejecuta el callback
    callback_ajax(arrayList); // Pasa al Callback el arrayList con los videos
  }
   
}