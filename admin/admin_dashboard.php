<?php 

add_filter('admin_footer_text', 'twchr_left_admin_footer_text_output'); //left side
function twchr_left_admin_footer_text_output($text) {
    
    $text = __('Thanks for installing  plugin! ','twitcher')."<a href='https://twitcher.pro/'>Twitcher.pro</a>";
    return $text;
}
 
add_filter('update_footer', 'twchr_right_admin_footer_text_output', 11); //right side
function twchr_right_admin_footer_text_output($text) {
    $text = __('Developed Conjuntas.club','twitcher');
    return $text;
}