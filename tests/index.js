import { describe, expect, it } from 'vitest';
import { icons } from '../src/index.js';

import anchor from '../theme/icons/anchor.svg';

describe( 'CKEditor5 Anchor', () => {
	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.anchor ).to.equal( anchor );
		} );
	} );
} );
