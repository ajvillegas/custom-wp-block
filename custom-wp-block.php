<?php
/**
 * The main plugin file.
 *
 * @link              http://www.alexisvillegas.com
 * @since             1.0.0
 * @package           Custom_WP_Block
 *
 * @wordpress-plugin
 * Plugin Name:       Custom WP Block
 * Plugin URI:        https://github.com/ajvillegas/custom-wp-block
 * Description:       Registers a custom editor block using ES5 JavaScript syntax.
 * Version:           1.0.0
 * Author:            Alexis J. Villegas
 * Author URI:        http://www.alexisvillegas.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       custom-wp-block
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

add_action( 'plugins_loaded', 'cwpb_load_plugin_textdomain' );
/**
 * Load the plugin text domain for translation.
 *
 * @since 1.0.0
 */
function cwpb_load_plugin_textdomain() {

	load_plugin_textdomain(
		'custom-wp-block',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);

}

add_action( 'enqueue_block_editor_assets', 'cwpb_register_block_editor_assets' );
/**
 * Enqueue block scripts and styles in the admin editor only.
 *
 * Dependencies:
 * wp-blocks - Block type registration.
 * wp-editor - Handles the BlockControls and RichText components.
 * wp-element - The WordPress Element abstraction layer atop React.
 * wp-components - React components used for adding sidebar controls.
 * wp-i18n - Internationalization utilities for client-side localization.
 *
 * @since 1.0.0
 * @link https://developer.wordpress.org/block-editor/contributors/develop/scripts/
 */
function cwpb_register_block_editor_assets() {

	// Block editor scripts.
	wp_enqueue_script(
		'cwpb-editor', // Script handle.
		plugin_dir_url( __FILE__ ) . 'assets/js/block.js', // Register the block here.
		array( 'wp-blocks', 'wp-editor', 'wp-element', 'wp-components', 'wp-i18n' ), // Dependencies, described above.
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/block.js' ), // filemtime — Gets file modification time.
		true // Load in footer.
	);

}

add_action( 'enqueue_block_assets', 'cwpb_register_block_assets' );
/**
 * Enqueue block scripts and styles in both the admin editor and frontend of the site.
 *
 * @since 1.0.0
 */
function cwpb_register_block_assets() {

	// Block editor styles.
	wp_enqueue_style(
		'cwpb-style', // Style handle.
		plugin_dir_url( __FILE__ ) . 'assets/css/block.css', // The CSS file.
		array(), // Dependencies, if any.
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/block.css' ) // filemtime — Gets file modification time.
	);

}
