const prefixes = [
  "못일어나는", "또늦잠잔", "답장없는", "비오는",
  "계획만세운", "안읽은", "흐릿한", "식어버린",
  "혼자먹는", "길을잃은", "자꾸미루는", "퇴근못하는",
  "눈치보는", "어색한", "빗맞은", "늦게온",
  "끝나가는", "텅빈", "살짝틀린", "반만한",
] as const;

const middles = [
  "월요일", "카톡", "버스정류장", "아침",
  "일요일", "커피", "약속", "점심",
  "알람", "지하철", "창문", "이불",
  "라디오", "서랍", "편의점", "가로등",
  "주말", "메세지", "날씨", "계단",
] as const;

const suffixes = [
  "사이로", "끝에서", "너머로", "혼자서",
  "속에서", "옆에서", "아래서", "곁에서",
  "앞에서", "뒤에서", "이후로", "직전에",
  "가득히", "천천히", "조용히", "살며시",
  "중에도", "쯤에서", "하나씩", "대신에",
] as const;

export function generateNickname(): string {
  const pi = Math.floor(Math.random() * prefixes.length);
  const mi = Math.floor(Math.random() * middles.length);
  const si = Math.floor(Math.random() * suffixes.length);
  return prefixes[pi] + middles[mi] + suffixes[si];
}
