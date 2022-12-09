<?php
//Taxonomía Series
//Haciendo visible en el Enpoint 
function twchr_serie_endpoint() {
    register_rest_route( 'twchr/', 'twchr_get_serie', array(
        'methods'  => WP_REST_Server::READABLE,
        'callback' => 'twchr_api_get_serie',
    ) );
}

add_action( 'rest_api_init', 'twchr_serie_endpoint' );

// Recopila las taxonomías y las pasa al Endpoint de Wordpress
function twchr_api_get_serie( $request ) {
    $args = array(
        'taxonomy' => 'serie',
        'hide_empty' => false
    );
    $request = get_terms($args);
    $response = array();
    foreach($request as $term){
        $term_id = $term->{'term_id'};
        $array_rest = array(
            "term_id" => $term_id,
            "name" => $term->{'name'},
            "taxonomy" => $term->{'taxonomy'},
            "dateTime" => get_term_meta( $term_id, 'twchr_toApi_dateTime', true ),
            "duration" => get_term_meta( $term_id, 'twchr_toApi_duration', true ),
            "select" => get_term_meta( $term_id, 'twchr_toApi_category', true ),
            "dataFromTwitch" => get_term_meta( $term_id, 'twchr_fromApi_allData', true )
        );

        array_push($response, $array_rest);
    }

    return $response;
}
//Fin Taxonomía Series


// CPT Streamings

function twchr_streaming_endpoint() {
    register_rest_route( 'twchr/', 'twchr_get_streaming', array(
        'methods'  => 'GET',
        'callback' => 'twchr_get_streaming',
    ) );
}

add_action( 'rest_api_init', 'twchr_streaming_endpoint' );

function twchr_get_streaming( $request ){
	// Solicita a BDD todos los post-type = twchr_streams que esten plubicados
	$posts = get_posts(array(
		'post_type'  => 'twchr_streams',
		'post_status' => "publish"
	));

	// Inicializo un array vacio
	$array_response = array();

	// Itero la List post-type 
	foreach ($posts as $key =>  $value){	
			$id = $value->{'ID'}; // guardo su id
			$title = $value->{'post_title'}; // guardo su title
			$stream_id = get_post_meta( $id, 'twchr-from-api_id', true ); // guardo el custom-field steram_id

			// Guardo los datos anteriores en un array
			$post_for_api = array(
				'wordpress_id' => $id,
				'title' => $title,
				'twchr_id' => (int)$stream_id // Convierto stream_id a numero entero

			);
			
			// guardo $post_for_api en array_response
			array_push($array_response,$post_for_api);
	}
	// retorno array_response
	return $array_response;

}

// Fin cpt streamings