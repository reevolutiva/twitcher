<?php
/**
 * Renderizo twchr_card
 *
 * @return void
 */
function twchr_cf_schedule__card() {
	$post_id = get_the_id();
	$term_serie = wp_get_post_terms( $post_id, 'serie' );
	$term_serie_list = '';
	$term_serie_id = '';
	$term_serie_name = '';
	foreach ( $term_serie as $term ) {
		$str = '<span>' . $term->{'slug'} . '</span>';
		$term_serie_list = $term_serie_list . $str;
		$term_serie_id = $term->term_id;
		$term_serie_name = $term->name;
	}
	$term_cat_twcht_list = '';
	$term_cat_twcht = wp_get_post_terms( $post_id, 'cat_twcht' );
	$term_cat_twcht_id = '';
	$term_cat_twcht_name = '';
	// var_dump($term_cat_twcht);
	foreach ( $term_cat_twcht as $term ) {
		$str = '<span>' . $term->{'slug'} . '</span>';
		$term_cat_twcht_list = $term_cat_twcht_list . $str;
		$term_cat_twcht_id = get_term_meta( $term->term_id, 'twchr_stream_category_id' )[0];
		$term_cat_twcht_name = $term->name;
	}
	$values  = get_post_custom( $post_id );

	$title = isset( $values['twchr_schedule_card_input--title'] ) ? $values['twchr_schedule_card_input--title'][0] : '';
	$category = isset( $values['twchr_schedule_card_input--category'] ) ? $values['twchr_schedule_card_input--category'][0] : '';
	$date_time = isset( $values['twchr_schedule_card_input--dateTime'] ) ? $values['twchr_schedule_card_input--dateTime'][0] : '';
	$twchr_dateTime_slot = isset( $values['twchr_dateTime_slot'] ) ? $values['twchr_dateTime_slot'][0] : '';
	$duration = isset( $values['twchr_schedule_card_input--duration'] ) ? $values['twchr_schedule_card_input--duration'][0] : '';

	$is_recurring = isset( $values['twchr_schedule_card_input--is_recurrig'] ) ? $values['twchr_schedule_card_input--is_recurrig'][0] : false;
	$serie = isset( $values['twchr_schedule_card_input--serie'] ) ? $values['twchr_schedule_card_input--serie'][0] : '';
	// var_dump($term_serie);
	require_once 'schedule_custom_card.php';
}

add_action( 'edit_form_after_title', 'twchr_cf_schedule__card' );

/**
 * Guardo los custom fields que provienene de twitchr_card
 *
 * @param [type] $post_id
 * @return void
 */
function twchr_cf_schedule__card__metadata_save( $post_id ) {
	/*
	Antes de guardar la informaci??n, necesito verificar tres cosas:
		1. Si la entrada se est?? autoguardando
		2. Comprobar que el usuario actual puede realmente modificar este contenido.
	*/

	if ( ! current_user_can( 'edit_posts' ) ) {
		return;
	}

	$allowed = array();

	$to_api_title = '';
	$to_api_date_time = '';
	$to_api_is_recurring = '';
	$to_api_duration = '';

	if ( twchr_post_isset_and_not_empty( 'twchr_schedule_card_input--is_recurrig' ) ) {
		$to_api_is_recurring = $_POST['twchr_schedule_card_input--is_recurrig'] == 'on' ? true : false;
		update_post_meta( $post_id, 'twchr_schedule_card_input--is_recurrig', $to_api_is_recurring );
	} else {
		update_post_meta( $post_id, 'twchr_schedule_card_input--is_recurrig', '' );
	}

	if ( twchr_post_isset_and_not_empty( 'twchr_schedule_card_input--title' ) ) {
		$to_api_title = wp_kses( $_POST['twchr_schedule_card_input--title'], $allowed );
		update_post_meta( $post_id, 'twchr_schedule_card_input--title', $to_api_title );
	}

	// Si API IS RECURRING
	// El titulo sera serie name
	if ( $to_api_is_recurring && twchr_post_isset_and_not_empty( 'twchr_schedule_card_input--serie__name' ) ) {
		$to_api_title = wp_kses( $_POST['twchr_schedule_card_input--serie__name'], $allowed );
	}

	if ( twchr_post_isset_and_not_empty( 'twchr_schedule_card_input--dateTime' ) ) {

		$date_time_raw = sanitize_text_field( $_POST['twchr_schedule_card_input--dateTime'] );
		$date_time_stg = strtotime( $date_time_raw );
		$to_api_date_time = date( DateTimeInterface::RFC3339, $date_time_stg );

		update_post_meta( $post_id, 'twchr_schedule_card_input--dateTime', $to_api_date_time );
	}
	if ( twchr_post_isset_and_not_empty( 'twchr_schedule_card_input--duration' ) ) {
		$to_api_duration = (int) wp_kses( $_POST['twchr_schedule_card_input--duration'], $allowed );
		update_post_meta( $post_id, 'twchr_schedule_card_input--duration', $to_api_duration );
	}

	if ( twchr_post_isset_and_not_empty( 'twchr_schedule_card_input--serie__id' ) ) {
		wp_set_post_terms( $post_id, array( (int) $_POST['twchr_schedule_card_input--serie__id'] ), 'serie' );
	}
	if ( twchr_post_isset_and_not_empty( 'twchr_dateTime_slot' ) ) {
		update_post_meta( $post_id, 'twchr_dateTime_slot', $_POST['twchr_dateTime_slot'] );
	}

	if ( twchr_post_isset_and_not_empty( 'twchr_stream_data_dateTime' ) ) {
		update_post_meta( $post_id, 'twchr_stream_data_dateTime', wp_kses( $_POST['twchr_stream_data_dateTime'], $allowed ) );
	}

	if ( twchr_post_isset_and_not_empty( 'twchr_streams__yt-link-video-src' ) ) {
		update_post_meta( $post_id, 'twchr_streams__yt-link-video-src', wp_kses( $_POST['twchr_streams__yt-link-video-src'], $allowed ) );
	}

	if ( twchr_post_isset_and_not_empty( 'twchr_stream_src_priority' ) ) {
		update_post_meta( $post_id, 'twchr_stream_src_priority', wp_kses( $_POST['twchr_stream_src_priority'], $allowed ) );
	}

	$twch_res = false;
	if ( twchr_post_isset_and_not_empty( 'twchr_schedule_card_input--category__value' ) ) {
		$cat_twitch_id = (int) $_POST['twchr_schedule_card_input--category__value'];
		$cat_twitch_name = $_POST['twchr_schedule_card_input--category__name'];

		// Creo una taxonomia cat_twcht
		$response = wp_create_term( $cat_twitch_name, 'cat_twcht' );

		$id = (int) $response['term_id'];

		// Creo stream relacionado.
		wp_set_post_terms( $post_id, array( $id ), 'cat_twcht' );
	}

	if ( $to_api_is_recurring == false && isset( $to_api_title ) && isset( $to_api_date_time ) && isset( $cat_twitch_id ) && isset( $to_api_duration ) ) {
		$twch_res = twtchr_twitch_schedule_segment_create( $post_id, $to_api_title, $to_api_date_time, $cat_twitch_id, $to_api_duration, false );

		if ( isset( $twch_res->error ) ) {

		} else {
			$schedule_segment_id = $twch_res['allData']->{'segments'}[0]->{'id'};
			update_post_meta( $post_id, 'twchr_stream_twtich_schedule_id', $schedule_segment_id );
		}

		$all_data = json_encode( $twch_res );
		update_post_meta( $post_id, 'twchr_stream_all_data_from_twitch', $all_data );

	} else {
		update_post_meta( $post_id, 'twchr_stream_all_data_from_twitch', '' );

	}
}


add_action( 'save_post', 'twchr_cf_schedule__card__metadata_save' );
