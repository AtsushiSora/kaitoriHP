# Netlify公開準備メモ

## 現在の準備状況

- `netlify.toml` で公開ディレクトリを `.` に設定済み
- Netlify Forms用の問い合わせフォーム `haisha-contact` を設置済み
- `/thanks`、`/privacy`、`/about`、`/faq`、`/documents` の短縮URLを設定済み
- 旧GitHub Pagesパス `/kaitoriHP/*` からNetlifyルートへ301リダイレクトする設定を追加済み
- 存在しないURL用の `404.html` を追加済み
- 静的アセットは長期キャッシュ、HTMLは再検証するヘッダーを設定済み
- 古物商許可情報を事業者情報ページと共通フッターに掲載済み

## 公開前に確認すること

1. NetlifyでこのGitHubリポジトリを接続する
2. Build commandは空欄、Publish directoryは `.` にする
3. Forms機能で `haisha-contact` が検出されているか確認する
4. Formsの通知先メールを `sora29128616@gmail.com` に設定する
5. 公開URLが決まったら各HTMLのcanonical、`index.html` のOG URL、`sitemap.xml`、`robots.txt` のURLを新ドメインへ変更する
6. 古物商許可のURL届出に使うURLと、Netlify公開URLまたは独自ドメインを一致させる
7. Netlify公開URLまたは独自ドメインが確定したら、管轄警察署へホームページURLの届出が必要か確認する

## Netlifyでの推奨設定

- Build command: 空欄
- Publish directory: `.`
- Functions directory: 未使用
- Forms: 有効
- Form notifications: `sora29128616@gmail.com`
- Branch deploy: 最初は `main` のみで問題ありません
- 独自ドメインを使う場合は、Netlify側でHTTPSが有効になってからSearch Consoleへ登録します

## 問い合わせフォーム

フォームはNetlify Formsに対応済みです。送信時はフォーム内容をNetlifyに記録し、その後LINEまたはメール作成画面へ進みます。

- Form name: `haisha-contact`
- Success page: `/thanks`
- Honeypot field: `bot-field`
- 通知先メール: `sora29128616@gmail.com`

Netlify管理画面で確認すること:

1. Site configuration > Formsで `haisha-contact` が表示される
2. Forms notificationsでメール通知を追加する
3. スマホでLINE送信、メール作成、電話リンクを確認する

## 公開後にやること

1. トップページ、対応エリア、状態別、事例、問い合わせフォームをスマホで確認する
2. Google Search Consoleに新しいURLと `sitemap.xml` を登録する
3. LINE、メール、電話の導線を実機で確認する
4. 古物商URL届出が必要な場合は、管轄警察署で届出を行う

## 公開URL決定後に差し替えるもの

現時点ではGitHub PagesのURLがcanonicalやサイトマップに残っています。Netlifyの本番URLまたは独自ドメインが決まったら、以下を一括置換します。

- 各HTMLの `<link rel="canonical">`
- `index.html` の `og:url`、`og:image`
- `index.html` の構造化データ内 `url`、`image`
- `sitemap.xml` の `<loc>`
- `robots.txt` の `Sitemap`
