---
title: Установка шрифтов
description: В разделе содержится инструкция по установке собственных шрифтов
sidebar_position: 4
---
# Установка шрифтов
### Описание
* Онлайн-редактор по умолчанию поддерживает определенный список шрифтов из набора Google Fonts, а также некоторые шрифты не из данной коллекции. Лицензии данных шрифтов допускают коммерческое использование. Если же в вашем PSD-макете используется иной шрифт, то в редакторе он будет по умолчанию заменяется на `PT Sans`.
* Для использования в редакторе собственных шрифтов необходимо предварительно добавить их в систему. Это могут быть как шрифты из коллекции Google Fonts, так и шрифты, загружаемые в виде отдельных файлов с вашего компьютера. Но, эти шрифты не должны быть в списке запрещенных, которые перечислены ниже.

### Маппинг
* В PSD-макете дизайна не хранится сам шрифт. Там используется имя шрифта, как он был назван на компьютере создателя файла (например: `ShantellSans-Regular` или `CormorantGaramond-Regular`). Также мы знаем его начертание: `bold` и/или `italic` Это вся информация, которую мы можем получить об используемом шрифте из PSD-файла.
* Таким образом, шрифт в макете определяется: `[название шрифта] [жирный или нет] [курсив или нет]`.
* При загрузке макета шаблона в редактор для каждого текстового слоя подбирается максимально подходящий шрифт среди собственных и системных. В начале идет поиск по полному, а затем по частичному совпадению названий. Если же совпадений не находится, то в используется шрифт `PT Sans`. 
* В разделе "__Дизайны / Шрифты__" отображаются названия шрифтов, используемые в макетах, и применяемые для них шрифты в редакторе. Если какое-либо соответствие работает не корректно, то его можно переопределить вручную - задать другой шрифт, который будет применяться. Для этого необходимо:
    + Нажатием соответствующей кнопки загрузить недостающий шрифт с компьютера или из коллекции Google.
    + Во втором столбце нажать "__Подобран__" (автоматически подобранный шрифт) или "__Не задан__" (шрифт, примененный по умолчанию).
    + В открывшемся модальном окне указать шрифт, который будет применяться в редакторе.

### Запрещенные шрифты
* В сервисе существует список запрещенных шрифтов, вместо которых в редакторе используются стандартные. И даже если для них заданы настройки маппинга, они будут проигнорированы. Это сделано для соблюдения лицензионной чистоты. 
* Ниже представлены правила замены запрещенных шрифтов. Например: шрифт `Arial-BoldMT` будет заменен на `Inter` с увеличенной толщиной линий (жирный) без наклона букв, а шрифт `Arial-ItalicMT` - на `Arimo` с обычной тощиной линий и с наклоном букв (курсивом).
```js
{"Arial-BoldMT", new FontSearchParams("Inter", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"Arial-ItalicMT", new FontSearchParams("Arimo", FontVariantWeigth.Normal, FontVariantStyle.Italic)},
{"ArialMT", new FontSearchParams("Inter", FontVariantWeigth.Medium, FontVariantStyle.Normal)},
{"BookAntiqua", new FontSearchParams("Noto Serif KR", FontVariantWeigth.Medium, FontVariantStyle.Normal)},
{"Calibri", new FontSearchParams("Noto Sans JP", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"Calibri-Bold", new FontSearchParams("Noto Sans JP", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"Calibri-BoldItalic", new FontSearchParams("Noto Sans", FontVariantWeigth.Bold, FontVariantStyle.Italic)},
{"Calibri-Italic", new FontSearchParams("Noto Sans", FontVariantWeigth.Normal, FontVariantStyle.Italic)},
{"Cambria", new FontSearchParams("Lora", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"Cambria-Bold", new FontSearchParams("Lora", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"Cambria-BoldItalic", new FontSearchParams("Lora", FontVariantWeigth.Bold, FontVariantStyle.Italic)},
{"Cambria-Italic", new FontSearchParams("Lora", FontVariantWeigth.Medium, FontVariantStyle.Italic)},
{"Candara-Bold", new FontSearchParams("Fira Sans", FontVariantWeigth.SemiBold, FontVariantStyle.Normal)},
{"Candara-BoldItalic", new FontSearchParams("Fira Sans", FontVariantWeigth.SemiBold, FontVariantStyle.Italic)},
{"Candara-Italic", new FontSearchParams("Fira Sans", FontVariantWeigth.Normal, FontVariantStyle.Italic)},
{"CaviarDreams", new FontSearchParams("Comfortaa", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"CaviarDreams-Bold", new FontSearchParams("Comfortaa", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"CenturyGothic", new FontSearchParams("Montserrat", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"CenturyGothic-Bold", new FontSearchParams("Montserrat", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"ComicSansMS", new FontSearchParams("Balsamiq", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"ComicSansMS-Bold", new FontSearchParams("Inter", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"Consolas", new FontSearchParams("Source Sans Pro", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"Consolas-Bold", new FontSearchParams("Source Sans Pro", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"Constantia", new FontSearchParams("Noto Serif", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"Constantia-Bold", new FontSearchParams("Noto Serif", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"Constantia-BoldItalic", new FontSearchParams("Noto Serif", FontVariantWeigth.Bold, FontVariantStyle.Italic)},
{"Corbel", new FontSearchParams("Ubuntu", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"Corbel-Bold", new FontSearchParams("Ubuntu", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"Corbel-BoldItalic", new FontSearchParams("Ubuntu", FontVariantWeigth.Bold, FontVariantStyle.Italic)},
{"Corbel-Italic", new FontSearchParams("Ubuntu", FontVariantWeigth.Normal, FontVariantStyle.Italic)},
{"CourierNewPS-BoldMT", new FontSearchParams("Podkova", FontVariantWeigth.SemiBold, FontVariantStyle.Normal)},
{"FoundersGroteskMono", new FontSearchParams("Nanum Gothic", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"FoundersGroteskMono-Light", new FontSearchParams("Nanum Gothic", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"FoundersGroteskMono-Medium", new FontSearchParams("Nanum Gothic", FontVariantWeigth.ExtraBold, FontVariantStyle.Normal)},
{"Georgia", new FontSearchParams("Source Serif Pro", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"Georgia-Bold", new FontSearchParams("Source Serif Pro", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"Georgia-BoldItalic", new FontSearchParams("Source Serif Pro", FontVariantWeigth.Bold, FontVariantStyle.Italic)},
{"Georgia-Italic", new FontSearchParams("Source Serif Pro", FontVariantWeigth.Normal, FontVariantStyle.Italic)},
{"HeliosCond", new FontSearchParams("Oswald", FontVariantWeigth.Light, FontVariantStyle.Normal)},
{"HeliosCondBold", new FontSearchParams("Oswald", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"Impact", new FontSearchParams("Fira Sans Condensed", FontVariantWeigth.ExtraBold, FontVariantStyle.Normal)},
{"Liana", new FontSearchParams("Marck Script", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"Montserrat-Light", new FontSearchParams("Montserrat", FontVariantWeigth.Light, FontVariantStyle.Normal)},
{"MyriadPro-Bold", new FontSearchParams("Cousine", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"MyriadPro-BoldIt", new FontSearchParams("Cousine", FontVariantWeigth.Bold, FontVariantStyle.Italic)},
{"MyriadPro-It", new FontSearchParams("Cousine", FontVariantWeigth.Normal, FontVariantStyle.Italic)},
{"MyriadPro-Regular", new FontSearchParams("Cousine", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"MyriadPro-Semibold", new FontSearchParams("Cousine", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"MyriadPro-SemiboldIt", new FontSearchParams("Cousine", FontVariantWeigth.Normal, FontVariantStyle.Italic)},
{"OpenSans-Bold", new FontSearchParams("Open Sans", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"OpenSans-Regular", new FontSearchParams("Open Sans", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"RosaMarena", new FontSearchParams("Bad Script", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"SegoePrint", new FontSearchParams("Caveat", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"SegoePrint-Bold", new FontSearchParams("Caveat", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"SegoeUI", new FontSearchParams("Nunito", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"SegoeUI-Bold", new FontSearchParams("Nunito", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"SegoeUI-BoldItalic", new FontSearchParams("Nunito", FontVariantWeigth.Bold, FontVariantStyle.Italic)},
{"SegoeUI-Italic", new FontSearchParams("Nunito", FontVariantWeigth.Normal, FontVariantStyle.Italic)},
{"SegoeUI-Light", new FontSearchParams("Nunito", FontVariantWeigth.Light, FontVariantStyle.Normal)},
{"Tahoma", new FontSearchParams("Manrope", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"Tahoma-Bold", new FontSearchParams("Manrope", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"TimesNewRomanPS-BoldMT", new FontSearchParams("Playfair Display", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"TimesNewRomanPS-ItalicMT", new FontSearchParams("Playfair Display", FontVariantWeigth.Normal, FontVariantStyle.Italic)},
{"TimesNewRomanPSMT", new FontSearchParams("Playfair Display", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"Trebuchet-BoldItalic", new FontSearchParams("PT Sans", FontVariantWeigth.Bold, FontVariantStyle.Italic)},
{"TrebuchetMS-Bold", new FontSearchParams("PT Sans", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"TrebuchetMS-Italic", new FontSearchParams("PT Sans", FontVariantWeigth.Normal, FontVariantStyle.Italic)},
{"Ubuntu-Bold", new FontSearchParams("Ubuntu", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"Verdana", new FontSearchParams("Rubik", FontVariantWeigth.Normal, FontVariantStyle.Normal)},
{"Verdana-Bold", new FontSearchParams("Rubik", FontVariantWeigth.Bold, FontVariantStyle.Normal)},
{"AVerdana-BoldItalic", new FontSearchParams("Rubik", FontVariantWeigth.Bold, FontVariantStyle.Italic)},
{"Verdana-Italic", new FontSearchParams("Rubik", FontVariantWeigth.Normal, FontVariantStyle.Italic)}
```