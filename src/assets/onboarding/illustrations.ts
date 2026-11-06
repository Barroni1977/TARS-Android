/**
 * Neutral SVG control icons and mission-chip symbols for TARS onboarding.
 * The retired PocketPal splash mascot is neither imported nor exported.
 */
import ShieldGlyph from './shield.svg';
import ArrowRightGlyph from './arrow-right.svg';
import HeadphonesGlyph from './headphones.svg';

import SmartChatChip from './chip-icons/smart-chat.svg';
import CodingChip from './chip-icons/coding.svg';
import EducationChip from './chip-icons/education.svg';
import RoleplayChip from './chip-icons/roleplay.svg';
import CreativeWritingChip from './chip-icons/creative-writing.svg';

import type {TopicKey} from '../../store/onboarding/types';

export {ShieldGlyph, ArrowRightGlyph, HeadphonesGlyph};

type SvgComponent = React.ComponentType<{
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}>;

// Per-topic chip glyphs (screen 5). Indexed by TopicKey. `else` is
// rendered as an outlined-only chip and intentionally has no glyph.
export const topicChipGlyphs: Partial<Record<TopicKey, SvgComponent>> = {
  smartchat: SmartChatChip,
  coding: CodingChip,
  education: EducationChip,
  roleplay: RoleplayChip,
  creative_writing: CreativeWritingChip,
};
