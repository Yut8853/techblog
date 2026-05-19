import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用目的 | Creative Dev Blog',
  description: 'Creative Dev Blogで取得した情報の利用目的について説明します。',
};

const purposes = [
  'お問い合わせへの返信や必要なご連絡を行うため。',
  '記事内容やUI、カテゴリ設計を改善し、より使いやすいサイトにするため。',
  '閲覧傾向を分析し、ニーズに合ったテーマや記事企画を検討するため。',
  '不正アクセス、迷惑行為、システム障害などの予防と対応を行うため。',
  '法令またはガイドラインに基づく対応が必要になった場合に備えるため。',
];

export default function PurposePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
        <div className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-sm md:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-blue-600">
            Data Usage Purpose
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            利用目的
          </h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
            当サイトで取得した情報は、サイト運営と利用体験の向上に必要な範囲で利用します。ここでは、具体的な利用目的を明示します。
          </p>

          <div className="mt-10 space-y-4">
            {purposes.map(purpose => (
              <section
                key={purpose}
                className="rounded-2xl border border-border/60 bg-background/80 p-6"
              >
                <p className="text-sm leading-7 text-foreground md:text-base">
                  {purpose}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50/70 p-6 text-sm leading-7 text-slate-700">
            利用目的を変更する場合は、このページまたはプライバシーポリシーの内容を更新して告知します。
          </div>

          <p className="mt-10 text-sm text-muted-foreground">
            制定日: 2026年5月19日
          </p>
        </div>
      </div>
    </main>
  );
}
