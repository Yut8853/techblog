import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Creative Dev Blog',
  description: 'Creative Dev Blogのプライバシーポリシーです。',
};

const sections = [
  {
    title: '取得する情報',
    body: 'お問い合わせ時に入力された氏名、メールアドレス、メッセージ内容のほか、アクセス解析のためにブラウザ情報、閲覧ページ、参照元、アクセス日時などを取得する場合があります。',
  },
  {
    title: '利用目的',
    body: '取得した情報は、お問い合わせへの回答、サイト改善、コンテンツ品質向上、不正利用の防止、アクセス状況の分析のために利用します。',
  },
  {
    title: '第三者提供',
    body: '法令に基づく場合を除き、本人の同意なく個人情報を第三者に提供することはありません。アクセス解析や配信基盤など、業務委託先に必要な範囲で情報を共有する場合があります。',
  },
  {
    title: '保管と管理',
    body: '取得した情報は、漏えい、滅失、き損を防ぐために適切な安全対策を講じて管理します。不要となった情報は、合理的な期間経過後に削除します。',
  },
  {
    title: 'お問い合わせ',
    body: '本ポリシーに関するお問い合わせは、サイト内のお問い合わせ導線からご連絡ください。',
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
        <div className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-sm md:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-blue-600">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            プライバシーポリシー
          </h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
            Creative Dev
            Blogでは、利用者のプライバシーを尊重し、取得した情報を適切に取り扱います。本ページでは、当サイトにおける情報の取得方針と取り扱いについて説明します。
          </p>

          <div className="mt-10 space-y-6">
            {sections.map(section => (
              <section
                key={section.title}
                className="rounded-2xl border border-border/60 bg-background/80 p-6"
              >
                <h2 className="text-xl font-semibold text-foreground">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted-foreground">
            制定日: 2026年5月19日
          </p>
        </div>
      </div>
    </main>
  );
}
