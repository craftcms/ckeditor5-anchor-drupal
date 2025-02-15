/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module anchor/utils
 */

import { toMap } from 'ckeditor5';

/**
 * Helper class that ties together all {@link module:anchor/anchor~AnchorDecoratorAutomaticDefinition} and provides
 * the {@link module:engine/conversion/downcasthelpers~DowncastHelpers#attributeToElement downcast dispatchers} for them.
 */
export default class AutomaticDecorators {
	constructor() {
		/**
		 * Stores the definition of {@link module:anchor/anchor~AnchorDecoratorAutomaticDefinition automatic decorators}.
		 * This data is used as a source for a downcast dispatcher to create a proper conversion to output data.
		 *
		 * @private
		 * @type {Set}
		 */
		this._definitions = new Set();
	}

	/**
	 * Gives information about the number of decorators stored in the {@link module:anchor/utils~AutomaticDecorators} instance.
	 *
	 * @readonly
	 * @protected
	 * @type {Number}
	 */
	get length() {
		return this._definitions.size;
	}

	/**
	 * Adds automatic decorator objects or an array with them to be used during downcasting.
	 *
	 * @param {module:anchor/anchor~AnchorDecoratorAutomaticDefinition|Array.<module:anchor/anchor~AnchorDecoratorAutomaticDefinition>} item
	 * A configuration object of automatic rules for decorating anchors. It might also be an array of such objects.
	 */
	add( item ) {
		if ( Array.isArray( item ) ) {
			item.forEach( item => this._definitions.add( item ) );
		} else {
			this._definitions.add( item );
		}
	}

	/**
	 * Provides the conversion helper used in the {@link module:engine/conversion/downcasthelpers~DowncastHelpers#add} method.
	 *
	 * @returns {Function} A dispatcher function used as conversion helper
	 * in {@link module:engine/conversion/downcasthelpers~DowncastHelpers#add}.
	 */
	getDispatcher() {
		return dispatcher => {
			dispatcher.on( 'attribute:anchorId', ( evt, data, conversionApi ) => {
				// There is only test as this behavior decorates anchors and
				// it is run before dispatcher which actually consumes this node.
				// This allows on writing own dispatcher with highest priority,
				// which blocks both native converter and this additional decoration.
				if ( !conversionApi.consumable.test( data.item, 'attribute:anchorId' ) ) {
					return;
				}
				const viewWriter = conversionApi.writer;
				const viewSelection = viewWriter.document.selection;

				for ( const item of this._definitions ) {
					const viewElement = viewWriter.createAttributeElement( 'a', item.attributes, {
						priority: 5
					} );
					viewWriter.setCustomProperty( 'anchor', true, viewElement );
					if ( item.callback( data.attributeNewValue ) ) {
						if ( data.item.is( 'selection' ) ) {
							viewWriter.wrap( viewSelection.getFirstRange(), viewElement );
						} else {
							viewWriter.wrap( conversionApi.mapper.toViewRange( data.range ), viewElement );
						}
					} else {
						viewWriter.unwrap( conversionApi.mapper.toViewRange( data.range ), viewElement );
					}
				}
			}, { priority: 'high' } );
		};
	}

	/**
	 * Provides the conversion helper used in the {@link module:engine/conversion/downcasthelpers~DowncastHelpers#add} method
	 * when anchoring images.
	 *
	 * @returns {Function} A dispatcher function used as conversion helper
	 * in {@link module:engine/conversion/downcasthelpers~DowncastHelpers#add}.
	 */
	getDispatcherForAnchoredImage() {
		return dispatcher => {
			dispatcher.on( 'attribute:anchorId:image', ( evt, data, conversionApi ) => {
				const viewFigure = conversionApi.mapper.toViewElement( data.item );
				const anchorInImage = Array.from( viewFigure.getChildren() ).find( child => child.name === 'a' );

				for ( const item of this._definitions ) {
					const attributes = toMap( item.attributes );

					if ( item.callback( data.attributeNewValue ) ) {
						for ( const [ key, val ] of attributes ) {
							if ( key === 'class' ) {
								conversionApi.writer.addClass( val, anchorInImage );
							} else {
								conversionApi.writer.setAttribute( key, val, anchorInImage );
							}
						}
					} else {
						for ( const [ key, val ] of attributes ) {
							if ( key === 'class' ) {
								conversionApi.writer.removeClass( val, anchorInImage );
							} else {
								conversionApi.writer.removeAttribute( key, anchorInImage );
							}
						}
					}
				}
			} );
		};
	}
}
