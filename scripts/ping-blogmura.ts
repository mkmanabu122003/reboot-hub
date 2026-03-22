// scripts/ping-blogmura.ts
//
// ブログ村へのPing送信スクリプト
// 使い方: npx ts-node scripts/ping-blogmura.ts
//
// 環境変数:
//   BLOGMURA_PING_URL - ブログ村マイページから取得したPing送信先URL

const PING_URL = process.env.BLOGMURA_PING_URL;
const SITE_NAME = 'Reboot Hub';
const SITE_URL = 'https://reboot-hub.jp';

if (!PING_URL) {
  console.error('❌ BLOGMURA_PING_URL が未設定です');
  console.error('   ブログ村マイページ → 記事管理 → 記事反映/Ping送信 から取得してください');
  process.exit(1);
}

async function sendPing(): Promise<void> {
  const xmlBody = `<?xml version="1.0" encoding="UTF-8"?>
<methodCall>
  <methodName>weblogUpdates.ping</methodName>
  <params>
    <param><value><string>${SITE_NAME}</string></value></param>
    <param><value><string>${SITE_URL}</string></value></param>
  </params>
</methodCall>`;

  try {
    const response = await fetch(PING_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: xmlBody,
    });

    const text = await response.text();

    if (response.ok && text.includes('<boolean>0</boolean>')) {
      console.log('✅ ブログ村Ping送信成功');
    } else if (text.includes('<boolean>1</boolean>')) {
      console.warn('⚠️  Ping送信エラー（ブログ村側）:', text);
    } else {
      console.warn('⚠️  予期しないレスポンス:', response.status, text.slice(0, 200));
    }
  } catch (error) {
    console.error('❌ Ping送信失敗:', error);
  }
}

sendPing();
