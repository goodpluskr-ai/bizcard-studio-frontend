// 2026-08-04: Claude 아티팩트 안에서만 존재하는 window.storage API를, 실제
// 배포된 웹사이트(Render Static Site)에서도 코드가 그대로 동작하도록 흉내 냅니다.
// 대상은 전부 "개인 저장(shared:false)"으로 이미 정리된 낮은 위험도의 기능들입니다:
//   - AI 배경/추천 캐시 (domain/generative, domain/recommendation)
//   - 패턴 사용 기록 (domain/learning/recorder.js)
//   - 문의(1:1 채팅) 메시지 (screens/Inquiry.jsx)
// 실제 서버로 완전히 옮기기 전까지의 다리 역할입니다 — 여기서는 브라우저의
// localStorage를 그대로 씁니다(실제 웹사이트에서는 localStorage 제한이 없습니다 —
// 그 제한은 Claude 아티팩트 안에서만 있던 것입니다).
//
// ⚠️ 주의: 이 데이터는 이제 "이 브라우저"에만 남습니다(같은 브라우저로 다시
// 와야 보임) — Claude 아티팩트의 shared:false와 정확히 같은 성격입니다.
if (typeof window !== "undefined" && !window.storage) {
  const PREFIX = "bizcard:";

  window.storage = {
    async get(key) {
      const raw = localStorage.getItem(PREFIX + key);
      if (raw === null) throw new Error(`storage key not found: ${key}`);
      return { key, value: raw, shared: false };
    },
    async set(key, value) {
      localStorage.setItem(PREFIX + key, value);
      return { key, value, shared: false };
    },
    async delete(key) {
      localStorage.removeItem(PREFIX + key);
      return { key, deleted: true, shared: false };
    },
    async list(prefix = "") {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(PREFIX + prefix)) keys.push(k.slice(PREFIX.length));
      }
      return { keys, prefix, shared: false };
    },
  };
}
