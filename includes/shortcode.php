<?php
function vite_front_shorcode_callback($atts){
    $atts = shortcode_atts(
        [
            'filter'        => 'employe'
        ],
        $atts
    );

    $shorcode = "<div id='my-front'></div>";

    return $shorcode;
}

add_shortcode('vite_front_shorcode','vite_front_shorcode_callback');