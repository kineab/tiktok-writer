exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { topic, vibe } = JSON.parse(event.body || '{}');

    const systemPrompt = `
      You are an expert short-form video copywriter specializing in viral TikToks, YouTube Shorts, and Instagram Reels.
      Write a highly engaging video script about: "${topic}".
      The overall tone of the video must be: "${vibe}".

      Strictly format your response exactly like this template layout:
      [0-3 SECONDS: THE SCROLL-STOPPING HOOK]
      (Insert dramatic or high-energy opening line here)

      [3-20 SECONDS: THE BODY POINTS]
      (Break down the core value into 3 quick, punchy, sentence-long beats)

      [20-30 SECONDS: THE CTA]
      (Give a quick call to action, like "Follow for daily coding hacks")
    `;

    const targetUrl = `https://googleapis.com`;

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }]
      }),
    });

    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: data.error.message }),
      };
    }

    // TARGETS THE EXACT OBJECT PATHWAY BY EXTRACTING THE FIRST ITEM FROM BOTH ARRAYS
    let scriptText = '';
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      scriptText = data.candidates[0].content.parts[0].text || '';
    } else {
      scriptText = 'Error: The server received data back from Google, but the internal layout structures did not match expected arrays.';
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ script: scriptText }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Internal Server Routing Failure' }),
    };
  }
};
