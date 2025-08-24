/**
 * 五十音图数据 - 包含平假名、片假名和罗马音
 */
export const fiftySoundsData = {
  rows: [
    {
      rowName: 'あ行',
      characters: [
        { hiragana: 'あ', katakana: 'ア', romaji: 'a' },
        { hiragana: 'い', katakana: 'イ', romaji: 'i' },
        { hiragana: 'う', katakana: 'ウ', romaji: 'u' },
        { hiragana: 'え', katakana: 'エ', romaji: 'e' },
        { hiragana: 'お', katakana: 'オ', romaji: 'o' },
      ]
    },
    {
      rowName: 'か行',
      characters: [
        { hiragana: 'か', katakana: 'カ', romaji: 'ka' },
        { hiragana: 'き', katakana: 'キ', romaji: 'ki' },
        { hiragana: 'く', katakana: 'ク', romaji: 'ku' },
        { hiragana: 'け', katakana: 'ケ', romaji: 'ke' },
        { hiragana: 'こ', katakana: 'コ', romaji: 'ko' },
      ]
    },
    {
      rowName: 'さ行',
      characters: [
        { hiragana: 'さ', katakana: 'サ', romaji: 'sa' },
        { hiragana: 'し', katakana: 'シ', romaji: 'shi' },
        { hiragana: 'す', katakana: 'ス', romaji: 'su' },
        { hiragana: 'せ', katakana: 'セ', romaji: 'se' },
        { hiragana: 'そ', katakana: 'ソ', romaji: 'so' },
      ]
    },
    {
      rowName: 'た行',
      characters: [
        { hiragana: 'た', katakana: 'タ', romaji: 'ta' },
        { hiragana: 'ち', katakana: 'チ', romaji: 'chi' },
        { hiragana: 'つ', katakana: 'ツ', romaji: 'tsu' },
        { hiragana: 'て', katakana: 'テ', romaji: 'te' },
        { hiragana: 'と', katakana: 'ト', romaji: 'to' },
      ]
    },
    {
      rowName: 'な行',
      characters: [
        { hiragana: 'な', katakana: 'ナ', romaji: 'na' },
        { hiragana: 'に', katakana: 'ニ', romaji: 'ni' },
        { hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu' },
        { hiragana: 'ね', katakana: 'ネ', romaji: 'ne' },
        { hiragana: 'の', katakana: 'ノ', romaji: 'no' },
      ]
    },
    {
      rowName: 'は行',
      characters: [
        { hiragana: 'は', katakana: 'ハ', romaji: 'ha' },
        { hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi' },
        { hiragana: 'ふ', katakana: 'フ', romaji: 'fu' },
        { hiragana: 'へ', katakana: 'ヘ', romaji: 'he' },
        { hiragana: 'ほ', katakana: 'ホ', romaji: 'ho' },
      ]
    },
    {
      rowName: 'ま行',
      characters: [
        { hiragana: 'ま', katakana: 'マ', romaji: 'ma' },
        { hiragana: 'み', katakana: 'ミ', romaji: 'mi' },
        { hiragana: 'む', katakana: 'ム', romaji: 'mu' },
        { hiragana: 'め', katakana: 'メ', romaji: 'me' },
        { hiragana: 'も', katakana: 'モ', romaji: 'mo' },
      ]
    },
    {
      rowName: 'や行',
      characters: [
        { hiragana: 'や', katakana: 'ヤ', romaji: 'ya' },
        { hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu' },
        { hiragana: 'よ', katakana: 'ヨ', romaji: 'yo' },
      ]
    },
    {
      rowName: 'ら行',
      characters: [
        { hiragana: 'ら', katakana: 'ラ', romaji: 'ra' },
        { hiragana: 'り', katakana: 'リ', romaji: 'ri' },
        { hiragana: 'る', katakana: 'ル', romaji: 'ru' },
        { hiragana: 'れ', katakana: 'レ', romaji: 're' },
        { hiragana: 'ろ', katakana: 'ロ', romaji: 'ro' },
      ]
    },
    {
      rowName: 'わ行',
      characters: [
        { hiragana: 'わ', katakana: 'ワ', romaji: 'wa' },
        { hiragana: 'を', katakana: 'ヲ', romaji: 'wo' },
        { hiragana: 'ん', katakana: 'ン', romaji: 'n' },
      ]
    }
  ]
};

// 导出所有行名称，用于选择练习行
export const rowNames = fiftySoundsData.rows.map(row => row.rowName);

// 练习类型定义
export type PracticeType = 'romaji-to-hiragana' | 'romaji-to-katakana' | 'hiragana-to-romaji' | 'katakana-to-romaji';

export const practiceTypes = [
  { value: 'romaji-to-hiragana', label: '罗马音 → 平假名' },
  { value: 'romaji-to-katakana', label: '罗马音 → 片假名' },
  { value: 'hiragana-to-romaji', label: '平假名 → 罗马音' },
  { value: 'katakana-to-romaji', label: '片假名 → 罗马音' },
];