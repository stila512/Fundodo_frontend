# 備忘．關於樣式系統

## 架構

1. 全域
位於 `@/pages/global.scss`

1. 區域
位於 `@/styles` 內，或是相鄰於各頁面、元件之 js 檔。並且格式為 module.scss。

## 命名原則

避免命名原則的切換導致混淆，將能用字串輸入的 global style 與用物件輸入的 module style 的命名皆設定一致的駝峰原則。
