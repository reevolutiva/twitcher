<?php

// Register custom taxonomy for Streamings
function register_streaming_taxonomy() {
    $args = array(
        'labels' => array(
            'name' => 'Streaming States',
            'singular_name' => 'Streaming State',
            'menu_name' => 'Streaming States',
            'all_items' => 'All Streaming States',
            'edit_item' => 'Edit Streaming State',
            'view_item' => 'View Streaming State',
            'update_item' => 'Update Streaming State',
            'add_new_item' => 'Add New Streaming State',
            'new_item_name' => 'New Streaming State Name',
            'parent_item' => 'Parent Streaming State',
            'parent_item_colon' => 'Parent Streaming State:',
            'search_items' => 'Search Streaming States',
            'popular_items' => 'Popular Streaming States',
            'separate_items_with_commas' => 'Separate streaming states with commas',
            'add_or_remove_items' => 'Add or remove streaming states',
            'choose_from_most_used' => 'Choose from the most used streaming states',
            'not_found' => 'No streaming states found'
            ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'show_tagcloud' => true,
        'show_in_quick_edit' => true,
        'show_admin_column' => true,
        'hierarchical' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'streaming-states'),
        );
        
    register_taxonomy( 'streaming_states', 'streamings', $args );
}

add_action( 'init', 'register_streaming_taxonomy' );

