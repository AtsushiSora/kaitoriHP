# Netlify公開準備メモ

## 現在の準備状況

- `netlify.toml` で公開ディレクトリを `.` に設定済み
- Netlify Forms用の問い合わせフォーム `haisha-contact` を設置済み
- `/thanks`、`/privacy`、`/about`、`/faq`、`/documents` の短縮URLを設定済み
- 旧GitHub Pagesパス `/kaitoriHP/*` からNetlifyルートへ301リダイレクトする設定を追加済み
- 存在しないURL用の `404.html` を追加済み
- 静的アセットは長期キャッシュ、HTMLは再検証するヘッダーを設定済み
- 古物商許可情報を事業者情報ページと共通フッターに掲載済み
- 電話番号 `070-8996-6421` とスマホ用の電話リンクを公開ページに設定済み

## 公開前に確認すること

1. `070-8996-6421` が開通していることを実機で確認する
2. スマホで電話リンクを押し、`070-8996-6421` の発信画面が開くか確認する
3. NetlifyでこのGitHubリポジトリを接続する
4. Build commandは空欄、Publish directoryは `.` にする
5. Forms機能で `haisha-contact` が検出されているか確認する
6. Formsの通知先メールを `info@order-auto.com` に設定する
7. 公開URLが決まったら各HTMLのcanonical、`index.html` のOG URL、`sitemap.xml`、`robots.txt` のURLを新ドメインへ変更する
8. 古物商許可のURL届出に使うURLと、Netlify公開URLまたは独自ドメインを一致させる
9. Netlify公開URLまたは独自ドメインが確定したら、管轄警察署へホームページURLの届出が必要か確認する

## Netlifyでの推奨設定

- Build command: 空欄
- Publish directory: `.`
- Functions directory: 未使用
- Forms: 有効
- Form notifications: `info@order-auto.com`
- Branch deploy: 最初は `main` のみで問題ありません
- 独自ドメインを使う場合は、Netlify側でHTTPSが有効になってからSearch Consoleへ登録します

## 問い合わせフォーム

フォームはNetlify Formsに対応済みです。送信時はフォーム内容をNetlifyに記録し、その後LINEまたはメール作成画面へ進みます。

- Form name: `haisha-contact`
- Success page: `/thanks`
- Honeypot field: `bot-field`
- 通知先メール: `info@order-auto.com`

Netlify管理画面で確認すること:

1. Site configuration > Formsで `haisha-contact` が表示される
2. Forms notificationsでメール通知を追加する
3. スマホでLINE送信、メール作成、電話リンクを確認する

## 公開後にやること

1. トップページ、対応エリア、状態別、事例、問い合わせフォームをスマホで確認する
2. Google Search Consoleに新しいURLと `sitemap.xml` を登録する
3. LINE、メール、電話の導線を実機で確認する
4. 古物商URL届出が必要な場合は、管轄警察署で届出を行う

## Google Search Console準備

Netlify公開URLまたは独自ドメインが決まってから実施します。

1. Search Consoleでプロパティを追加する
2. 独自ドメインを使う場合はドメインプロパティ、Netlify標準URLだけで始める場合はURLプレフィックスを選ぶ
3. 所有権確認を完了する
4. `sitemap.xml` を送信する
5. トップページ、主要エリアページ、無料引き取り案内、FAQ、必要書類ページのURL検査を行う
6. インデックス登録をリクエストする
7. 1週間後に検索パフォーマンスとインデックス状況を確認する

優先してURL検査するページ:

- `/`
- `/free-pickup.html`
- `/faq.html`
- `/documents.html`
- `/area/hiroshima.html`
- `/area/yamaguchi.html`
- `/area/hiroshima-city.html`
- `/area/kure.html`
- `/area/iwakuni.html`

## 公開URL

Netlifyの本番URLは `https://omakase-haisha.netlify.app` です。以下のSEO関連URLは本番URLへ差し替え済みです。

- 各HTMLの `<link rel="canonical">`
- `index.html` と `free-pickup.html` のOG URL・OG画像
- `index.html` の構造化データ内 `url`、`image`
- `sitemap.xml` の `<loc>`
- `robots.txt` の `Sitemap`

独自ドメインを設定する場合は、同じ項目を新しいドメインへ再度一括変更します。
