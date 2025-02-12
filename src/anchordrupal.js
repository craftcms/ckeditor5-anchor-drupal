import { Plugin } from 'ckeditor5/src/core.js';
import { ButtonView } from 'ckeditor5/src/ui.js';

import ckeditor5Icon from '../theme/icons/ckeditor.svg';

export default class AnchorDrupal extends Plugin {
	static get pluginName() {
		return 'AnchorDrupal';
	}

	init() {
		const editor = this.editor;
		const t = editor.t;
		const model = editor.model;

		// Register the "anchorDrupal" button, so it can be displayed in the toolbar.
		editor.ui.componentFactory.add( 'anchorDrupal', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Anchor drupal' ),
				icon: ckeditor5Icon,
				tooltip: true
			} );

			// Insert a text into the editor after clicking the button.
			this.listenTo( view, 'execute', () => {
				model.change( writer => {
					const textNode = writer.createText( 'Hello CKEditor 5!' );

					model.insertContent( textNode );
				} );

				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}
