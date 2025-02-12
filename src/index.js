/**
 * @file The build process always expects an index.js file. Anything exported
 * here will be recognized by CKEditor 5 as an available plugin. Multiple
 * plugins can be exported in this one file.
 *
 * I.e. this file's purpose is to make plugin(s) discoverable.
 */
// cSpell:ignore simplebox
import anchor from '../theme/icons/anchor.svg';
import unanchor from '../theme/icons/unanchor.svg';
import check from '../theme/icons/check.svg';
import cancel from '../theme/icons/cancel.svg';

export { default as Anchor } from './anchor.js';

export const icons = {
	anchor,
	unanchor,
	check,
	cancel
};
