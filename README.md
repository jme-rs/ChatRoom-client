# ChatRoom

Tauri を使ったチャットルームアプリケーションのクライアント．

## 使用技術

- Rust
  - reqwest
- TypeScript (JavaScript)
- React
- Tauri
- Fluent UI

## 工夫した点

- 流石に CLI だと使いづらいので，GUI にした．
- チャットルームごとに異なるメッセージを表示できるようにした．
- ユーザ名を登録できるようにした．
- 新しいチャットルームを作成できるようにした．
- Slack のように Markdown のレンダリングをサポートした．
- Windows 11 と同じ Fluent UI を使用

## 改善点

- シスプロで作った卓球オンラインを統合できなかった．
  - Tauri を linux で動かすのに苦労した．
  - Ncurses は Windows では使えない．
- チャットルームやメッセージの削除機能がない．
- UI が適当な部分がある．
