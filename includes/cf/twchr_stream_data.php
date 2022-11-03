<?php
/**
 * Generated by the WordPress Meta Box Generator
 * https://jeremyhixon.com/tool/wordpress-meta-box-generator/
 * 
 * Retrieving the values:
 * start date = get_post_meta( get_the_ID(), 'twchr_stream_data_start-date', true )
 * start time = get_post_meta( get_the_ID(), 'twchr_stream_data_start-time', true )
 * is_serie = get_post_meta( get_the_ID(), 'twchr_stream_data_is_serie', true )
 * duration = get_post_meta( get_the_ID(), 'twchr_stream_data_duration', true )
 * category = get_post_meta( get_the_ID(), 'twchr_stream_data_category', true )
 */



 
function twchr_stream_data_meta_box_content($post){
	$values    = get_post_custom( $post->ID );
	//show_dump($values);
	$dateTime = isset($values['twchr_stream_data_dateTime'][0]) ? $values['twchr_stream_data_dateTime'][0] : '';
	?>
    <metabox>
        <picture>
            <img src="<?= plugins_url('/twitcher/includes/assets/logo_colores_completos_6pt.svg') ?>" alt="logo-twitch">
        </picture>
		<label >Fecha y hora del streming <input type="datetime-local" name='twchr_stream_data_dateTime' value="<?= $dateTime;  ?>"></label>
	</metabox>
	<?php
}

function twchr_stream_data_metabox(){
	//add_meta_box($id:string,$title:string,$callback:callable,$screen:string|array|WP_Screen|null,$context:string,$priority:string,$callback_args:array|null )
	add_meta_box( 'twchr_stream_data', 'Twitcher data', 'twchr_stream_data_meta_box_content', 'twchr_streams', 'normal', 'high' );
}

add_action('add_meta_boxes','twchr_stream_data_metabox');


function twchr_stream_data_metabox_save($post_id){
/* 
Antes de guardar la información, necesito verificar tres cosas:
	1. Si la entrada se está autoguardando
	2. Comprobar que el usuario actual puede realmente modificar este contenido.
*/

	// Ignoramos los auto guardados.
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

	if ( ! current_user_can( 'edit_post' ) ) {
        return;
    }
	

	 $allowed = array();
	 if ( isset( $_POST['twchr_stream_data_dateTime'] ) ) {
        update_post_meta( $post_id, 'twchr_stream_data_dateTime', wp_kses( $_POST['twchr_stream_data_dateTime'], $allowed ) );
    }
	  
}


add_action( 'save_post', 'twchr_stream_data_metabox_save' );