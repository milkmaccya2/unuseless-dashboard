# 修正内容の確認

モバイルでのカード消失およびクリック領域の修正内容。

## 変更点

### app/components/Card.tsx

1. **クラス操作ロジックを変更**:
   - `useEffect` で `cardRef.current` を使い、`z-40` クラスの追加・削除を実装。
   - `className` 文字列の生成から動的な `z-40` を削除。
   - これにより、`showInfo` 更新時に React が `className` を再評価して `Dashboard.tsx` が外部から付与した `card-visible` を削除するのを防いだ。
2. **クリック領域の拡大**:
   - ヘルプボタン (`<button>`) に `p-2` と `-m-2` を追加。
   - ネガティブマージンでレイアウトを維持しつつ、クリック可能な領域を増やした。

## 変更されたファイル

- `app/components/Card.tsx`
