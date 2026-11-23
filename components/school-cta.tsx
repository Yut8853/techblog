interface SchoolCtaProps {
  articleSlug: string;
  placement?: 'article-footer' | 'home-feature';
}

export function SchoolCta({
  articleSlug,
  placement = 'article-footer',
}: SchoolCtaProps) {
  const headingId = `school-cta-${placement}`;

  function schoolUrl(path: string, action: string) {
    const url = new URL(path, 'https://school.junkbranding.com');
    url.search = new URLSearchParams({
      utm_source: 'creative-dev-blog',
      utm_medium: 'referral',
      utm_campaign: 'school-guide',
      utm_content: `${placement}-${action}`,
      utm_term: articleSlug,
    }).toString();
    return url.toString();
  }

  return (
    <section
      aria-labelledby={headingId}
      className="mt-12 overflow-hidden rounded-2xl border border-blue-200 bg-blue-50/60 dark:border-blue-900 dark:bg-blue-950/30"
    >
      <div className="h-1 bg-blue-600" aria-hidden="true" />
      <div className="p-6 sm:p-8">
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
          JUNKBRANDING / Web制作スクール「0→1」
        </p>
        <h2
          id={headingId}
          className="mt-3 text-2xl font-bold leading-relaxed tracking-tight text-balance sm:text-3xl"
        >
          「こんな表現をつくりたい」を、
          <br className="hidden sm:block" />
          自分の手で形にする一歩へ。
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
          デモを動かした、その先へ。HTML・CSSの基礎からデザイン、React、サイトの公開まで。
          「0→1」では、講師の添削を受けながら、自分で考えてつくる力を育てます。
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-blue-900 dark:text-blue-200">
          <li>デザインとコードを学ぶ</li>
          <li>つくって、添削で改善する</li>
          <li>受講期限なしで取り組む</li>
        </ul>
        <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
          <a
            href={schoolUrl('/lesson.html', 'lessons')}
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            まずは無料レッスンを見る
          </a>
          <a
            href={schoolUrl('/', 'overview')}
            className="inline-flex min-h-12 items-center justify-center rounded-lg px-2 py-3 text-sm font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:text-blue-300 dark:hover:text-blue-100"
          >
            スクールの内容・受講料を見る
          </a>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          まずは公開中のレッスンで、課題と添削の進め方を確かめてみてください。
        </p>
      </div>
    </section>
  );
}
