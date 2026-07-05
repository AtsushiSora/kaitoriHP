# Netlify公開準備メモ

## 公開前に確認すること

1. NetlifyでこのGitHubリポジトリを接続する
2. Build commandは空欄、Publish directoryは `.` にする
3. Forms機能で `haisha-contact` が検出されているか確認する
4. Formsの通知先メールを `sora29128616@gmail.com` に設定する
5. 公開URLが決まったら各HTMLのcanonical、`index.html` のOG URL、`sitemap.xml`、`robots.txt` のURLを新ドメインへ変更する
6. 古物商許可のURL届出に使うURLと、Netlify公開URLまたは独自ドメインを一致させる

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
4. 古物商許可取得後、事業者情報ページに公安委員会名・許可番号を追記する
