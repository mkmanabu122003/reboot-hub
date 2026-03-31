import { Affiliate } from './types';

export type AffiliateKey = 'axc' | 'myvision' | 'jac' | 'bizreach' | 'freeconsultant' | 'concord';

export const AFFILIATES: Record<AffiliateKey, Affiliate> = {
  axc: {
    name: 'アクシスコンサルティング',
    url: 'https://www.axc.ne.jp/',
    description: 'コンサル業界特化の転職エージェント。Big4出身者のキャリアチェンジに強み。',
    type: 'career',
  },
  myvision: {
    name: 'MyVision',
    url: 'https://my-vision.co.jp/',
    description: 'コンサル業界特化型転職エージェント',
    type: 'career',
  },
  jac: {
    name: 'JACリクルートメント',
    url: 'https://www.jac-recruitment.jp/',
    description: 'ハイクラス×コンサル特化の転職エージェント',
    type: 'career',
  },
  bizreach: {
    name: 'ビズリーチ',
    url: 'https://www.bizreach.jp/',
    description: 'ハイクラス転職プラットフォーム',
    type: 'career',
  },
  freeconsultant: {
    name: 'フリーコンサルタント.jp',
    url: 'https://www.freeconsultant.jp/',
    description: 'フリーランスコンサルマッチング',
    type: 'freelance',
  },
  concord: {
    name: 'コンコードエグゼクティブグループ',
    url: 'https://px.a8.net/svt/ejp?a8mat=4AZNCF+7288PU+5OEW+5YJRM',
    description: 'コンサル・CxO転職に強いエグゼクティブ特化エージェント',
    type: 'career',
    impressionPixel: 'https://www13.a8.net/0.gif?a8mat=4AZNCF+7288PU+5OEW+5ZEMP',
  },
};

export function resolveAffiliates(keys: string[]): Affiliate[] {
  return keys
    .filter((key): key is AffiliateKey => key in AFFILIATES)
    .map((key) => AFFILIATES[key]);
}
