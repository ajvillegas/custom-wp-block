/**
 * Custom 'CTA Section' block.
 *
 * @package    Custom_WP_Block
 * @author     Alexis J. Villegas
 * @link       http://www.alexisvillegas.com
 * @license    GPL-2.0+
 */

( function( blocks, editor, element, components ) {
	const __ = wp.i18n.__;
	const el = element.createElement;
	const registerBlockType = blocks.registerBlockType;
	const { InspectorControls, PanelColorSettings, MediaUpload, InnerBlocks } = editor;
	const { Fragment } = element;
	const { PanelBody, PanelRow, Button } = components;
	const template = [
		[ 'core/heading', { content: 'Title' } ],
		[ 'core/paragraph', { content: 'Description...' } ]
	];

	registerBlockType( 'cwpb/cta-section', {
		title: __( 'CTA Section', 'custom-wp-block' ),
		description: __( 'Add a call-to-action section.', 'custom-wp-block' ),
		icon: 'megaphone',
		category: 'common',
		supports: {
			align: true,
			align: [ 'wide', 'full' ]
		},
		keywords: [ 'Custom Block', 'CTA', 'Call to Action' ],
		attributes: {
			backgroundColor: {
				type: 'string',
				default: '#34b79d'
			},
			image: {
				type: 'string',
				default: ''
			}
		},
		example: {
			attributes: {
				backgroundColor: '#34b79d',
				image: ''
			},
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						content: __( 'Title', 'custom-wp-block' )
					}
				},
				{
					name: 'core/paragraph',
					attributes: {
						content: __( 'Description...', 'custom-wp-block' )
					}
				}
			]
		},

		edit: function( props ) {
			let blockStyles;

			// Define block styles.
			if ( props.attributes.image ) {
				blockStyles = {
					backgroundColor: props.attributes.backgroundColor,
					backgroundImage: 'url(' + props.attributes.image + ')',
					backgroundSize: 'cover'
				};
			} else {
				blockStyles = {
					backgroundColor: props.attributes.backgroundColor
				};
			}

			return [
				el( Fragment,
					{
						key: 'fragment'
					},
					el( InspectorControls,
						{},
						el( PanelColorSettings,
							{
								title: __( 'Color settings', 'custom-wp-block' ),
								initialOpen: true,
								colorSettings: [
									{
										value: props.attributes.backgroundColor,
										label: __( 'Background color', 'custom-wp-block' ),
										onChange: ( value ) => {
											props.setAttributes(
												{
													backgroundColor: value
												}
											);
										}
									}
								]
							}
						),
						el( PanelBody,
							{
								title: __( 'Image settings', 'custom-wp-block' ),
								initialOpen: false
							},
							el( PanelRow,
								{},
								el( 'div',
									{},
									el( MediaUpload,
										{
											onSelect: ( value ) => {
												props.setAttributes({
													image: value.url
												});
											},
											type: 'image',
											value: props.attributes.image,
											render: function( obj ) {
												return el( Button,
													{
														className: props.attributes.image ? 'image-button' : 'button button-large',
														style: {
															height: 'auto',
															padding: props.attributes.image ? 'inherit' : '0 10px'
														},
														title: 'Click to edit',
														onClick: obj.open
													},
													! props.attributes.image ? __( 'Upload Image', 'custom-wp-block' ) : el( 'img', { src: props.attributes.image, alt: '' })
												);
											}
										}
									)
								)
							),
							props.attributes.image ?
								el( PanelRow,
									{},
									el( Button,
										{
											className: 'button is-small',
											title: 'Remove Image',
											onClick: () => {
												props.setAttributes({
													image: ''
												});
											}
										},
										__( 'Remove Image', 'custom-wp-block' )
									)
								) :
							null
						)
					)
				),
				el( 'div',
					{
						key: 'cta-section',
						className: props.className,
						style: blockStyles
					},
					el( 'div',
						{
							className: 'block-wrap'
						},
						el( InnerBlocks,
							{
								template: template,
								templateLock: false // Can use 'all', 'block' or false.
							}
						)
					)
				)
			];
		},

		save: function( props ) {
			let blockStyles;

			// Define block styles.
			if ( props.attributes.image ) {
				blockStyles = {
					backgroundColor: props.attributes.backgroundColor,
					backgroundImage: 'url(' + props.attributes.image + ')',
					backgroundSize: 'cover'
				};
			} else {
				blockStyles = {
					backgroundColor: props.attributes.backgroundColor
				};
			}

			return (
				el( 'div',
					{
						className: props.className,
						style: blockStyles
					},
					el( 'div',
						{
							className: 'block-wrap'
						},
						el( InnerBlocks.Content )
					)
				)
			);
		}
	});
}(
	window.wp.blocks,
	window.wp.blockEditor,
	window.wp.element,
	window.wp.components
) );
