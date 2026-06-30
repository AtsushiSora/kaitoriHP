# Netlify公開準備メモ

## 公開前に確認すること

1. NetlifyでこのGitHubリポジトリを接続する
2. Build commandは空欄、Publish directoryは `.` にする
3. Forms機能で `haisha-contact` が検出されているか確認する
4. Formsの通知先メールを `sora29128616@gmail.com` に設定する
5. 公開URLが決まったら各HTMLのcanonical、`index.html` のOG URL、`sitemap.xml`、`robots.txt` のURLを新ドメインへ変更する

## 問い合わせフォーム

フォームはNetlify Formsに対応済みです。送信時はフォーム内容をNetlifyに記録し、その後LINEまたはメール作成画面へ進みます。

## 公開後にやること

1. トップページ、対応エリア、状態別、事例、問い合わせフォームをスマホで確認する
2. Google Search Consoleに新しいURLと `sitemap.xml` を登録する
3. LINE、メール、電話の導線を実機で確認する
