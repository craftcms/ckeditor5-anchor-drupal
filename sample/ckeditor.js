import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

import 'ckeditor5/ckeditor5.css';
import '../dist/index-editor.css';
import '../dist/index.css';
import {
	Autoformat,
	Base64UploadAdapter,
	BlockQuote,
	Bold,
	ClassicEditor,
	Code,
	CodeBlock,
	Essentials,
	GeneralHtmlSupport,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Italic,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	Table,
	TableToolbar
} from 'ckeditor5';

import { Anchor } from '../dist/index.js';

/* global document, window */

ClassicEditor.create( document.querySelector( '#editor' ), {
	plugins: [
		Anchor,
		Essentials,
		Autoformat,
		BlockQuote,
		Bold,
		Heading,
		Image,
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		Italic,
		Link,
		List,
		MediaEmbed,
		Paragraph,
		Table,
		TableToolbar,
		CodeBlock,
		Code,
		Base64UploadAdapter,
		GeneralHtmlSupport
	],
	licenseKey: 'GPL',
	toolbar: [
		'anchor',
		'|',
		'heading',
		'|',
		'bold',
		'italic',
		'link',
		'code',
		'bulletedList',
		'numberedList',
		'|',
		'outdent',
		'indent',
		'|',
		'uploadImage',
		'blockQuote',
		'insertTable',
		'mediaEmbed',
		'codeBlock',
		'|',
		'undo',
		'redo'
	],
	image: {
		toolbar: [
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
	},
	htmlSupport: {
		allow: [
			{
				name: /.*/,
				attributes: true,
				classes: true,
				styles: true
			}
		],
		disallow: [
			{
				name: 'a',
				attributes: [ 'id', 'name' ],
				classes: 'ck-anchor'
			}
		]
	}
} )
	.then( editor => {
		window.editor = editor;
		CKEditorInspector.attach( editor );
		window.console.log( 'CKEditor 5 is ready.', editor );
	} )
	.catch( err => {
		window.console.error( err.stack );
	} );
