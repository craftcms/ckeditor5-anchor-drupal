import { describe, expect, it } from 'vitest';
import { Anchor as AnchorDrupalDll, icons } from '../src/index.js';
import Anchor from '../src/anchor.js';

import anchor from './../theme/icons/anchor.svg';
import unanchor from './../theme/icons/unanchor.svg';

describe( 'CKEditor5 AnchorDrupal DLL', () => {
	it( 'exports AnchorDrupal', () => {
		expect( AnchorDrupalDll ).to.equal( Anchor );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.anchor ).to.equal( anchor );
			expect( icons.unanchor ).to.equal( unanchor );
		} );
	} );
} );
