
// ใช้ Google Translate API (mock example)
const translate = require('@vitalets/google-translate-api');

async function translateText(text, targetLang='th') {
    try {
        const res = await translate(text, {to: targetLang});
        return res.text;
    } catch (err) {
        console.error('Translation error:', err);
        return text;
    }
}

module.exports = { translateText };
