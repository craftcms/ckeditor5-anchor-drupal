import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { ClassicEditor, Essentials, Paragraph, Heading } from 'ckeditor5';
import Anchor from '../src/anchor.js';

/* global document */

describe( 'Anchor', () => {
	it( 'should be named', () => {
		expect( Anchor.pluginName ).to.equal( 'Anchor' );
	} );

	describe( 'init()', () => {
		let domElement, editor;

		beforeEach( async () => {
			domElement = document.createElement( 'div' );
			document.body.appendChild( domElement );

			editor = await ClassicEditor.create( domElement, {
				licenseKey: 'GPL',
				plugins: [
					Paragraph,
					Heading,
					Essentials,
					Anchor
				],
				toolbar: [
					'anchor'
				]
			} );
		} );

		afterEach( () => {
			domElement.remove();
			return editor.destroy();
		} );

		it( 'should load Anchor', () => {
			const myPlugin = editor.plugins.get( 'Anchor' );

			expect( myPlugin ).to.be.an.instanceof( Anchor );
		} );

		it( 'should add an icon to the toolbar', () => {
			expect( editor.ui.componentFactory.has( 'anchor' ) ).to.equal( true );
		} );
	} );
} );
