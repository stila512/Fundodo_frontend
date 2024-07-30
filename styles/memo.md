# 備忘．關於樣式系統

## 字型

嘗試過 next/font/google 但是無果，改採取 fontsource 透過 npm 下載後匯入成功。

## 架構

1. 全域
位於 `@/pages/global.scss`

1. 區域
位於 `@/styles` 內，或是相鄰於各頁面、元件之 js 檔。並且格式為 module.scss。

## 命名原則

避免命名原則的切換導致混淆，將能用字串輸入的 global style 與用物件輸入的 module style 的命名皆設定一致的駝峰原則。


## 稿

class 類在區域檔要用再引入
variable 類以單檔簡化引入
modal 暫時擱置，待元件化

[-L]
[G-]
[GL]

[G-]_base-function
[G-]_container
[G-]_grid-breakpoints
[G-]_grid-system
[GL]_rwd-system

[GL]color-function
[GL]colors
[GL]exported-color.module
[GL]font
[G-]utility-class
[GL]utility-mixin

-- global 入口 --
[G-]all.scss
[G-]global.scss
[G-]reset.css

-- local 入口 --
[-L]local.scss