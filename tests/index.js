import { describe, expect, it } from 'vitest';
import { AnchorDrupal as AnchorDrupalDll, icons } from '../src/index.js';
import AnchorDrupal from '../src/anchordrupal.js';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 AnchorDrupal DLL', () => {
	it( 'exports AnchorDrupal', () => {
		expect( AnchorDrupalDll ).to.equal( AnchorDrupal );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
