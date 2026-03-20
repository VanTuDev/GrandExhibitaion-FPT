import { NextRequest, NextResponse } from 'next/server';

const CHAT_SYSTEM = `Bạn là Hướng Dẫn Viên AI tại Grand Exhibition FPT FUDA  — một triển lãm câu lạc bộ sinh viên tại FPT University Đà Nẵng. 
Nhiệm vụ của bạn là giúp sinh viên khám phá và tìm hiểu về các CLB.

Danh sách 10 CLB tham gia:
1. FENIOUS – CLB Văn Hoá Ẩm Thực: 3 ban (Nấu ăn, Truyền thông, Nhân sự). Giải Nhất Nấu ăn sinh viên 2024.
2. FIC – Financial Investing Club: tài chính, đầu tư, 15+ workshop/năm.
3. FUM – FPT University Media: "Không lu mờ!", truyền thông, nhiếp ảnh, video.
4. MIC HOME – CLB Âm Nhạc & MC: thanh nhạc, sân khấu, biểu diễn 30+ sự kiện/năm.
5. TIA – CLB Nhạc Cụ Dân Tộc: đàn tranh, đàn bầu, sáo trúc, lễ hội văn hoá.
6. RESUP – Business & Marketing Club: startup, marketing, workshop kinh doanh.
7. F2K – FPT's Kindness Krew: thiện nguyện, gây quỹ 50tr+ VND/năm.
8. FVC – FPT Vovinam Club: Vovinam - võ truyền thống Việt Nam, HCV toàn TP.
9. SRC – CLB An Toàn Thông Tin: bảo mật, CTF, Top 10 quốc gia 2024.
10. DFP – Dance for Passion: K-pop, Hip-hop, Cover Dance, FUDA's Got Talent.

Hãy trả lời bằng tiếng Việt, thân thiện, ngắn gọn (tối đa 3-4 câu). 
Nếu được hỏi về CLB cụ thể, hãy giới thiệu sinh động và khuyến khích đăng ký.
Nếu được hỏi nên vào CLB nào, hãy hỏi về sở thích để gợi ý phù hợp.`;

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

export async function POST(request: NextRequest) {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'GROQ_API_KEY chưa cấu hình' },
      { status: 500 }
    );
  }

  let body: { history?: Array<{ role: string; content: string }> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Body JSON không hợp lệ' },
      { status: 400 }
    );
  }

  const history = Array.isArray(body.history) ? body.history : [];
  const messages = [
    { role: 'system' as const, content: CHAT_SYSTEM },
    ...history.slice(-10).map((m: { role: string; content: string }) => ({
      role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
      content: m.content,
    })),
  ];

  try {
    const resp = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 1024,
        temperature: 0.7,
        messages,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error('Groq API error', resp.status, errText);
      return NextResponse.json(
        { error: 'Lỗi dịch vụ AI', text: 'Xin lỗi, kết nối tạm thời bị gián đoạn. Hãy hỏi lại sau nhé!' },
        { status: 502 }
      );
    }

    const data = await resp.json();
    const text =
      data?.choices?.[0]?.message?.content?.trim() ||
      'Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Thử hỏi lại nhé!';

    return NextResponse.json({ text });
  } catch (e) {
    console.error('Chat API error', e);
    return NextResponse.json(
      { text: 'Xin lỗi, kết nối tạm thời bị gián đoạn. Hãy hỏi lại sau nhé!' },
      { status: 200 }
    );
  }
}
