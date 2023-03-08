<?php

declare( strict_types = 1 );

namespace Kucrut\ViteForWPExample\React\Enqueue;

use Kucrut\Vite;

/**
 * Frontend Enqueue
 *
 * @return void
 */
function frontend(): void {
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_script' );
	add_action( 'wp_footer', __NAMESPACE__ . '\\render_app' );
}

function backend(){
	add_action('admin_enqueue_scripts', __NAMESPACE__ . '\\enqueue_script');
}

/**
 * Render application's markup
 */
function render_app(): void {
	printf( '<div id="my-app" class="my-app"></div>' );
}

/**
 * Enqueue script
 */
function enqueue_script(): void {
	Vite\enqueue_asset(
		dirname( __DIR__ ) . '/js/dist',
		'js/src/main.jsx',
		[
			'handle' => 'vite-for-wp-react',
			'in-footer' => true,
		]
	);
}
