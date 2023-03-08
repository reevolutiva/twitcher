<?php
/**
 * Plugin Name: Vite for WP example: React
 * Description: A plugin to demonstrate Vite for WP integration.
 * Author: Dzikri Aziz
 * Author URI: https://dz.aziz.im
 * License: GPLv2
 * Version: 0.0.1
 */


 add_action( 'admin_menu', 'gsc_react_plugin_init_menu' );

 /**
  * Init Admin Menu.
  *
  * @return void
  */
 function gsc_react_plugin_init_menu() {
     add_menu_page( __( 'GSC Plugin React', 'gsc_react_plugin'), __( 'GSC Plugin React', 'gsc_react_plugin'), 'manage_options', 'gsc_react_plugin', 'gsc_react_plugin_admin_page', 'dashicons-admin-generic', '2.1' );
 }
 
 /**
  * Init Admin Page.
  *
  * @return void
  */
 function gsc_react_plugin_admin_page() {
     require_once plugin_dir_path( __FILE__ ) . 'inc/backend.php';
 }

require 'inc/shortcode.php';

require 'vite-load.php';

