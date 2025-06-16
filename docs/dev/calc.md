---
title: Кастомизация калькулятора
description: Описание программной модели калькулятора для интеграции с собственными JS-криптами
sidebar_position: 4
---

# Программная модель калькулятора

## Общая информация
В данной документации собрано лишь самое необходимое для адекватного использования калькулятора через скрипты. Использование свойств или методов, которые есть в калькуляторе, но не указаны тут, может кардинально повлиять на его работу. Чаще всего такие свойства или методы помечаются через _ в начале.<br />Используйте их на свой страх и риск.

### О хранении и доступе
* Все калькуляторы на странице хранятся в массиве pxpCalculators. Так, например, если на странице 2 калькулятора, то доступ ко второму будет по индексу 1 (считаем от нуля).
```js
// получить массив калькуляторов
pxpCalculators
// получить второй калькулятор в массиве
pxpCalculators[1]
```
* Учитывая, что чаще всего на странице 1 калькулятор, то самым распространенным вариантом вызова будет:
`pxpCalculators[0]`.

### PxpCalc
#### Модель калькулятора
##### Основные свойства

<details>
<summary>materialSelector</summary>

| | `MaterialSelectorController` |
|---|---|
| __описание__ | Модуль выбора категорий, товаров и атрибутов |
| __пример вызова__ | `pxpCalculators[0].materialSelector` |

</details>

<details>
<summary>editorSettingsController</summary>

| | `EditorSettingsController` |
|---|---|
| __описание__ | Модуль выбора размеров редактора (только для редактора интерьеров) |
| __пример вызова__ | `pxpCalculators[0].editorSettingsController` |

</details>

<details>
<summary>customWorkSelector</summary>

| | `CalcCustomWorkSelectorController` |
|---|---|
| __описание__ | Модуль выбора опций и их позиций |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector` |

</details>

<details>
<summary>circulationSelector</summary>

| | `CirculationSelectorController` |
|---|---|
| __описание__ | Модуль выбора количества товара и страниц |
| __пример вызова__ | `pxpCalculators[0].circulationSelector` |

</details>

<details>
<summary>totalPriceCalculator</summary>

| | `CalcTotalPriceViewController` |
|---|---|
| __описание__ | Модуль отображения финальной цены, а так же продолжения заказа |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator` |

</details>

<details>
<summary>isMaterialTypeUpdate</summary>

| | `boolean` |
|---|---|
| __описание__ | Возвращает информацию об обновлении категорий и товарах |
| __пример вызова__ | |
| получить текущее состояние | `pxpCalculators[0].isMaterialTypeUpdate()` |
| присвоить состояние true | `pxpCalculators[0].isMaterialTypeUpdate(true)` |

</details>

<details>
<summary>isMaterialUpdate</summary>

| | `boolean` |
|---|---|
| __описание__ | Возвращает информацию об обновлении товаров категории |
| __пример вызова__ |  |
| получить текущее состояние | `pxpCalculators[0].isMaterialUpdate()` |
| присвоить состояние true | `pxpCalculators[0].isMaterialUpdate(true)` |

</details>

<details>
<summary>inUpdate</summary>

| | `boolean` |
|---|---|
| __описание__ | Возвращает информацию об общем обновлении состояния калькулятора. Имеет значение true, если isMaterialTypeUpdate имеет значение true или isMaterialUpdate имеет значение true |
| __пример вызова__ | получить текущее состояние `pxpCalculators[0].inUpdate()` |

</details>

##### Основные методы

<details>
<summary>info</summary>

| | `void` |
|---|---|
| __описание__ | Расписывает текущее состояние калькулятора в консоли. Содержит в себе: |
| 1 | Id калькулятора, например `pxpProducCalc_pr2gifts_ad6e6921cb544c059becf00ec4939601` |
| 2 | Id выбранной категории |
| 3 | Id выбранного товара категории |
| 4 | Выбранные опции товара и их кратное состояние (название опции, Id опции, выбранные позиции опции, все позиции опции) |
| __пример вызова__ | `pxpCalculators[0].info()` |
| примечание | Метод очень полезен для быстрого поиска необходимых данных по категориям, товарам и опциям, вам достаточно взять нужный Id и искать по нему в админке |

</details>

<details>
<summary>update</summary>

| | `void` |
|---|---|
| __описание__ | Обновляет текущее состояние калькулятора |
| условие выполения | Поле `inUpdate` является false |
| __пример вызова__ | `pxpCalculators[0].update()` |

</details>

### О первом запуске
* После того как калькулятор загрузился и первый раз получил данные о категории и товаре, происходит следующее:
    1. Калькулятор ищет на странице метод `onCompleteLoadPxpCalc`.
    1. Если он его находит, то исполняет, передавая первым параметром калькулятор.
* Таким образом, если вам необходимо проделать какие-то операции с калькулятором, то лучше всего это делать именно через этот метод.
```js
// какой-то калькулятор
[$calculator(category:product)$]
 
<script>
    // Метод, который будет вызываться по завершении загрузки калькулятора
    // calc - это калькулятор, который исполнил метод, вы можете получать данные о нем прямо отсюда
    function onCompleteLoadPxpCalc(calc) {
        // ваш код
    }        
</script>
```
### О модификации
* Прежде чем писать скрипт, который будет использовать возможности калькулятора, убедитесь, что:
    1. Данного функционала нет в платформе.
    1. Данный функционал не будет реализован в ближайшее время.
* Также стоит помнить два момента:
    1. Структура и методика работы калькулятора на платформе может обновляться, и нет никакой гарантии, что ваши скрипты будут работать так же, как и раньше.
    1. Если ваш скрипт ломает внутреннюю логику, то изменять калькулятор для решения этой проблемы не будут.

## Категории и товары

* Получить данный модуль можно через вызов в калькуляторе materialSelector.
```js
pxpCalculators[0].materialSelector
```
##### MaterialSelectorController
* Модель модуля по работе с категориями, товарами и атрибутами.
* __Основные свойства__

<details>
<summary>materialTypes</summary>

| __Тип переменной__ | массив `MaterialType` |
|---|---|
| __описание__ | Все доступные категории для вызова из калькулятора |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materialTypes()` |

</details>

<details>
<summary>materialType</summary>

| __Тип переменной__ | `MaterialType` или `null` |
|---|---|
| __описание__ | Выбранная категория |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materialType()` |

</details>

<details>
<summary>materialTypeId</summary>

| __Тип переменной__ | `number` или `null` |
|---|---|
| __описание__ | Id выбранной категории |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materialTypeId()` |

</details>

<details>
<summary>materials</summary>

| __Тип переменной__ | массив `Material` |
|---|---|
| __описание__ | Все доступные товары категории для вызова из калькулятора |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materials()` |

</details>

<details>
<summary>material</summary>

| __Тип переменной__ | `Material` или `null` |
|---|---|
| __описание__ | Модель выбранного в калькуляторе товара категории |


</details>

<details>
<summary>materialId</summary>

| __Тип переменной__ | `number` или `null` |
|---|---|
| __описание__ | Id выбранного в калькуляторе товара категории |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materialId()` |

</details>

<details>
<summary>haveAttrs</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает есть ли доступные атрибуты |
| __пример вызова__ | `pxpCalculators[0].materialSelector.haveAttrs()` |

</details>

<details>
<summary>attributesTree</summary>

| __Тип переменной__ | `MaterialTypeAttributesTree` или `null` |
|---|---|
| __описание__ | Возвращает дерево атрибутов |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributesTree()` |

</details>

<details>
<summary>attributes</summary>

| __Тип переменной__ | массив `MaterialTypeAttribute` |
|---|---|
| __описание__ | Возвращает все доступные атрибуты для вызова из калькулятора |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributes()` |

</details>

---

##### MaterialType
* Модель категории. Содержит в себе данные по атрибутам, входящих в нее.
* __Основные свойства__

<details>
<summary>id</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Id категории |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materialTypes()[0].id` |

</details>

<details>
<summary>title</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Название категории |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materialTypes()[0].title` |

</details>

<details>
<summary>name</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Возвращает название из категории для калькулятора, однако если оно пустое, то берется название из редактора |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materialTypes()[0].name` |

</details>

<details>
<summary>description</summary>

| __Тип переменной__ | `string` или `null` |
|---|---|
| __описание__ | Если у категории есть описание, то это оно. Если у категории пустое описание и она доступна для выбора в модальном окне, то берется шаблон текста из ресурсного файла по типу редактора |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materialTypes()[0].description` |

</details>

<details>
<summary>calcHelper</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Подсказка для калькулятора (задается в настройках категории) |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materialTypes()[0].calcHelper` |

</details>

<details>
<summary>urlName</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Имя категории для ссылки |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materialTypes()[0].urlName` |

</details>

<details>
<summary>attributes</summary>

| __Тип переменной__ | массив `MaterialTypeAttribute` |
|---|---|
| __описание__ | Возвращает все атрибуты категории |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materialTypes()[0].attributes` |

</details>

<details>
<summary>hiddenAttributes</summary>

| __Тип переменной__ | массив `string` |
|---|---|
| __описание__ | Возвращает Id скрытых атрибутов категории (список можно менять на странице настройки калькулятора) |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materialTypes()[0].hiddenAttributes` |

</details>

<details>
<summary>isSelected</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает выбрана категория или нет |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materialTypes()[0].isSelected()` |

</details>

* __Основные методы__

<details>
<summary>select</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | При вызове этого метода категория становится выбранной в калькуляторе и происходит общее обновление состояния калькулятора |
| __пример вызова__ | выбор второй категории в массиве категорий <br/>`pxpCalculators[0].materialSelector.materialTypes()[1].select()` |

</details>

---

##### Material
* Модель товара.
* __Основные свойства__

<details>
<summary>id</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Id товара |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materials()[0].id` |

</details>

<details>
<summary>title</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Название товара |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materials()[0].title` |

</details>

<details>
<summary>description</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Описание товара для калькулятора |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materials()[0].description` |

</details>

<details>
<summary>urlName</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Имя товара для ссылки |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materials()[0].urlName` |

</details>

<details>
<summary>attributes</summary>

| __Тип переменной__ | Словарь `{ string: string }` |
|---|---|
| __описание__ | Словарь, где ключ - уникальный Id атрибута, а значение - название атрибута |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materials()[0].attributes` |

</details>

<details>
<summary>isSelected</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает выбран товар или нет |
| __пример вызова__ | `pxpCalculators[0].materialSelector.materials()[0].isSelected()` |

</details>

* __Основные методы__

<details>
<summary>select</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | При вызове этого метода товар становится выбранным в калькуляторе и происходит обновление состояния калькулятора |
| __пример вызова__ | выбор второго товара в массиве товаров <br/>`pxpCalculators[0].materialSelector.materials()[1].select()` |

</details>

---

!> Любое некорректное общение с атрибутами может повлечь неправильную работу калькулятора. Будьте очень осторожны, внося скриптами какие-либо изменения в работу данных моделей.
* Стоит отметить, что для большинства задач вам будет достаточно использования дерева атрибутов `MaterialTypeAttributesTree`.

##### MaterialTypeAttributesTree
* Модель дерева атрибутов. Отвечает за всю логику выбора атрибутов, хранит в себе данные о текущих выбранных вершинах дерева и позволяет менять их выбор.
* __Основные свойства__

<details>
<summary>selectedAttributesValues</summary>

| __Тип переменной__ | массив `MaterialTypeAttributeValue` |
|---|---|
| __описание__ | Выбранные значения атрибутов |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributesTree().selectedAttributesValues()` |
| __подсказка__ | Так же стоит помнить, что `selectedAttributesValues` - наблюдаемое свойство, и на него можно сделать `subscribe` для учета изменения значений атрибутов. Подробнее тут: [Explicitly subscribing to observables](https://knockoutjs.com/documentation/observables) |

</details>

* __Основные методы__

<details>
<summary>getRoot</summary>

| __Тип переменной__ | `MaterialTypeAttributesTreeLeaf` или `null` |
|---|---|
| __описание__ | Получить корень дерева атрибутов |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributesTree().getRoot()` |

</details>

##### MaterialTypeAttributesTreeLeaf
* Модель вершины дерева атрибутов. Содержит в себе прямую ссылку на предыдущую вершину дерева, товар, который привязан к этой вершине и методы для получения более подробных данных о вершине.
* __Основные свойства__

<details>
<summary>index</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Номер вершины на вершине-родителе (порядковый номер отображения) |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributesTree().selectedAttributesValues()[0].index` |

</details>

<details>
<summary>leafName</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Отображаемое имя веришны (имя значения атрибута) |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributesTree().selectedAttributesValues()[0].leafName` |

</details>

<details>
<summary>attributeValue</summary>

| __Тип переменной__ | `MaterialTypeAttributeValue` |
|---|---|
| __описание__ | Значение атрибута, которое прикреплено к данной вершине |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributesTree().selectedAttributesValues()[0].attributeValue` |

</details>

<details>
<summary>material</summary>

| __Тип переменной__ | `Material` или `null` |
|---|---|
| __описание__ | Товар, который прикрелен к данной вершине |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributesTree().selectedAttributesValues()[0].material` |

</details>

<details>
<summary>branches</summary>

| __Тип переменной__ | Словарь `{ string: MaterialTypeAttributesTreeLeaf }` или `null` |
|---|---|
| __описание__ | Словарь, где ключ - имя вершины, а ключ - вершина |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributesTree().selectedAttributesValues()[0].branches` |

</details>

<details>
<summary>selectedLeaf</summary>

| __Тип переменной__ | `MaterialTypeAttributesTreeLeaf` или `null` |
|---|---|
| __описание__ | Выбранная вершина на текущем уровне дерева |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributesTree().selectedAttributesValues()[0].selectedLeaf()` |

</details>

<details>
<summary>selectedLeafIndex</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Индекс выбранной вершины на текущем уровне дерева |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributesTree().selectedAttributesValues()[0].selectedLeafIndex()` |

</details>

* __Основные методы__

<details>
<summary>getBranchesLeafs</summary>

| __Тип переменной__ | массив `MaterialTypeAttributesTreeLeaf` |
|---|---|
| __описание__ | Возвращает все вершины, которые можно выбрать от этой вершины |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributesTree().selectedAttributesValues()[0].getBranchesLeafs()` |

</details>

<details>
<summary>select</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Выбрать эту вершину. При выборе вершине автоматически выбирается товар, который к ней привязан и вершины, которые идут далее по дереву от выбранной |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributesTree().selectedAttributesValues()[0].select()` |

</details>

<details>
<summary>selectLeaf</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Выбрать вершину на текущем уровне дерева по имени |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributesTree().selectedAttributesValues()[0].selectLeaf("leaf2")` |

</details>

##### MaterialTypeAttribute
* Модель атрибута категории. Содержит в себе список значений атрибута.
* __Основные свойства__

<details>
<summary>id</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Id атрибута |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributes()[0].id` |

</details>

<details>
<summary>title</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Название атрибута |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributes()[0].title` |

</details>

<details>
<summary>cssClass</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Класс для атрибута |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributes()[0].cssClass` |

</details>

<details>
<summary>isHidden</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает скрыт ли атрибут |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributes()[0].isHidden` |

</details>

<details>
<summary>values</summary>

| __Тип переменной__ | массив `MaterialTypeAttributeValue` |
|---|---|
| __описание__ | Все значения атрибута |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributes()[0].values` |

</details>

<details>
<summary>jsFunction</summary>

| __Тип переменной__ | `string` или `null` |
|---|---|
| __описание__ | Название функции или ее текст. При выборе атрибута - исполняется |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributes()[0].jsFunction()` |

</details>

##### MaterialTypeAttributeValue
* Модель значения атрибута категории.
* __Основные свойства__

<details>
<summary>attribute</summary>

| __Тип переменной__ | `MaterialTypeAttribute` |
|---|---|
| __описание__ | Атрибут, в котором находится данное значение (проще говоря атрибут-родитель) |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributes()[0].values[0].attribute` |

</details>

<details>
<summary>title</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Название значения атрибута |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributes()[0].values[0].title` |

</details>

<details>
<summary>description</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Описание значения атрибута |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributes()[0].values[0].description` |

</details>

<details>
<summary>calcHelper</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Описания значения атрибута для калькулятора |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributes()[0].values[0].calcHelper` |

</details>

<details>
<summary>jsFunction</summary>

| __Тип переменной__ | `string` или `null` |
|---|---|
| __описание__ | Название функции или ее текст. При выборе значения атрибута - исполняется |
| __пример вызова__ | `pxpCalculators[0].materialSelector.attributes()[0].values[0].jsFunction()` |

</details>


## Размеры редактора

* Получить данный модуль можно через вызов в калькуляторе `editorSettingsController`.
```js
pxpCalculators[0].editorSettingsController
```

##### EditorSettingsController
* Модель модуля редакторов товара. Он хранит в себе данные о редакторе для выбранного товара, его параметры и выбранные размеры. На данный момент модуль поддерживает только редакторы интерьера, дизайна и проверки макетов.
* __Основные свойства__

<details>
<summary>isAvailable</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает доступен ли модуль |
| __пример вызова__ | `pxpCalculators[0].editorSettingsController.isAvailable()` |

</details>

<details>
<summary>editorState</summary>

| __Тип переменной__ | `CalcEditorState` или `null` |
|---|---|
| __описание__ | Текущее состояние настроек для редактора |
| __пример вызова__ | `pxpCalculators[0].editorSettingsController.editorState()` |

</details>

<details>
<summary>isEditEditorSizesAvailable</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает доступен ли выбор произвольных размеров настроек для редактора |
| __пример вызова__ | `pxpCalculators[0].editorSettingsController.isEditEditorSizesAvailable()` |

</details>

---

* Для каждого редактора есть своя модель настроек. Соответственно, когда вы через модуль получаете `editorState`, сделайте проверку на то, какой редактор настроек у этого товара. Сделать это можно через проверку свойства `editorType` в `editorState`.
```js
// Например, вам нужно получить состояние настроек для редактора только если это редактор проверки макетов
var editorState = pxpCalculators[0].editorSettingsController.editorState();
 
// проверим, что editorState не null и что оно подходит под наши требования
if (editorState != null && editorState.editorType === 7) {
    // ваш код
}
```

##### CalcCanvasEditorState
* Модель настроек для редактора интерьеров.
* __Основные свойства__

<details>
<summary>editorType</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Индекс редактора |
| __значение__ | 9 |
| __пример вызова__ | `pxpCalculators[0].editorSettingsController.editorState().editorType` |

</details>

<details>
<summary>canvasEditorInfo</summary>

| __Тип переменной__ | `EditorSizeInfo` или `null` |
|---|---|
| __описание__ | Текущее состояние настроек размеров для редактора интерьеров |
| __пример вызова__ | `pxpCalculators[0].editorSettingsController.editorState().canvasEditorInfo` |

</details>

##### CalcGiftEditorState
* Модель настроек для редактора сувениров.
* __Основные свойства__

<details>
<summary>editorType</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Индекс редактора |
| __значение__ | 8 |
| __пример вызова__ | `pxpCalculators[0].editorSettingsController.editorState().editorType` |

</details>

<details>
<summary>giftEditorInfo</summary>

| __Тип переменной__ | `EditorSizeInfo` или `null` |
|---|---|
| __описание__ | Текущее состояние настроек размеров для редактора сувениров |
| __пример вызова__ | `pxpCalculators[0].editorSettingsController.editorState().giftEditorInfo` |

</details>

##### CalcMockupEditorState
* Модель настроек для редактора проверки макетов.
* __Основные свойства__

<details>
<summary>editorType</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Индекс редактора |
| __значение__ | 7 |
| __пример вызова__ | `pxpCalculators[0].editorSettingsController.editorState().editorType` |

</details>

<details>
<summary>coverInfo</summary>

| __Тип переменной__ | `EditorSizeInfo` или `null` |
|---|---|
| __описание__ | Текущее состояние настроек размеров обложек для редактора проверки макетов |
| __пример вызова__ | `pxpCalculators[0].editorSettingsController.editorState().coverInfo` |

</details>

<details>
<summary>pageInfo</summary>

| __Тип переменной__ | `EditorSizeInfo` или `null` |
|---|---|
| __описание__ | Текущее состояние настроек размеров разворотов для редактора проверки макетов |
| __пример вызова__ | `pxpCalculators[0].editorSettingsController.editorState().pageInfo` |

</details>

<details>
<summary>flyleafInfo</summary>

| __Тип переменной__ | `EditorSizeInfo` или `null` |
|---|---|
| __описание__ | Текущее состояние настроек размеров форзацев для редактора проверки макетов |
| __пример вызова__ | `pxpCalculators[0].editorSettingsController.editorState().flyleafInfo` |

</details>

---

* В примерах получения данных для `EditorSizeInfo` я буду использовать укороченную запись, но для понятности предположим, что переменная `eSizeInfo`, откуда достаются данные, это свойство `coverInfo` для настроек редактора проверки макетов:
```js
var eSizeInfo = pxpCalculators[0].editorSettingsController.editorState().coverInfo;
```

##### EditorSizeInfo
* Модель настроек размеров. Содержит в себе размеры для редакторов, которые могут быть использованы в дальнейшем оформлении заказов. Так же тут могут быть установлены собственные размеры, если у товара настроены произвольные размеры.
* __Основные свойства__

<details>
<summary>editorSizes</summary>

| __Тип переменной__ | массив `ISizeModel` |
|---|---|
| __описание__ | Итоговый массив размеров. Размер массива напрямую зависит от количества страниц |
| __пример вызова__ | `eSizeInfo.editorSizes` |
| __пример результата__ | `[ { Width: 297, Height: 100 } ]` |

</details>

<details>
<summary>title</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Название |
| __пример вызова__ | `eSizeInfo.title` |

</details>

<details>
<summary>isVisible</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает отображаются ли данные настройки в калькуляторе |
| __пример вызова__ | `eSizeInfo.isVisible` |

</details>

<details>
<summary>isArbitrarySizeAvailable</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает доступны ли произвольные размеры для данных настроек |
| __пример вызова__ | `eSizeInfo.isArbitrarySizeAvailable` |

</details>

<details>
<summary>minEditorWidth</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Минимальная ширина редактора |
| __пример вызова__ | `eSizeInfo.minEditorWidth` |

</details>

<details>
<summary>maxEditorWidth</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Максимальная ширина редактора |
| __пример вызова__ | `eSizeInfo.maxEditorWidth` |

</details>

<details>
<summary>defaultEditorWidth</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Ширина редактора по умолчанию |
| __пример вызова__ | `eSizeInfo.defaultEditorWidth()` |

</details>

<details>
<summary>inputEditorWidth</summary>

| __Тип переменной__ | `number` или `string` |
|---|---|
| __описание__ | Свойство для указания ширины редактора |
| __пример вызова__ | устанавливаем ширину 150 <br/>`eSizeInfo.inputEditorWidth(150)` |
| __примечание__ | Указывая данные самостоятельно не забудьте после этого провалидировать их методом `validateInputData`, иначе `selectedEditorWidth` не обновится! |

</details>

<details>
<summary>selectedEditorWidth</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Итоговая выбранная ширина редактора |
| __пример вызова__ | `eSizeInfo.selectedEditorWidth()` |

</details>

<details>
<summary>minEditorHeight</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Минимальная высота редактора |
| __пример вызова__ | `eSizeInfo.minEditorHeight` |

</details>

<details>
<summary>maxEditorHeight</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Максимальная высота редактора |
| __пример вызова__ | `eSizeInfo.maxEditorWidth` |

</details>

<details>
<summary>defaultEditorHeight</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Высота редактора по умолчанию |
| __пример вызова__ | `eSizeInfo.defaultEditorHeight()` |

</details>

<details>
<summary>inputEditorHeight</summary>

| __Тип переменной__ | `number` или `string` |
|---|---|
| __описание__ | Свойство для указания высоты редактора |
| __пример вызова__ | устанавливаем высоту 150 <br/>`eSizeInfo.inputEditorHeight(150)` |
| __примечание__ | Указывая данные самостоятельно не забудьте после этого провалидировать их методом `validateInputData`, иначе `selectedEditorHeight` не обновится! |
</details>

<details>
<summary>selectedEditorHeight</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Выбранная высота редактора |
| __пример вызова__ | `eSizeInfo.selectedEditorHeight()` |

</details>

<details>
<summary>measureTitle</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Название размерности |
| __пример вызова__ | `eSizeInfo.measureTitle()` |

</details>

<details>
<summary>isPagesCountVisible</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Возвращает доступен ли выбор количества страниц для данных настроек |
| __пример вызова__ | `eSizeInfo.title` |

</details>

<details>
<summary>minPagesCount</summary>

| __Тип переменной__ | `number` или `null` |
|---|---|
| __описание__ | Минимальное количество страниц |
| __пример вызова__ | `eSizeInfo.minPagesCount` |

</details>

<details>
<summary>maxPagesCount</summary>

| __Тип переменной__ | `number` или `null` |
|---|---|
| __описание__ | Максимальное количество страниц |
| __пример вызова__ | `eSizeInfo.maxPagesCount` |

</details>

<details>
<summary>inputPagesCount</summary>

| __Тип переменной__ | `number или string` |
|---|---|
| __описание__ | Свойство для указания количества страниц |
| __пример вызова__ | устанавливаем количество страниц 30 <br/>`eSizeInfo.inputPagesCount(30)` |
| __примечание__ | Указывая данные самостоятельно не забудьте после этого провалидировать их методом `validatePagesInputData`, иначе `selectedPagesCount` не обновится! |
</details>

<details>
<summary>selectedPagesCount</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Выбранное количество страниц |
| __пример вызова__ | `eSizeInfo.selectedPagesCount()` |

</details>

<details>
<summary>pagesMeasureTitle</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Название количества страниц |
| __пример вызова__ | `eSizeInfo.pagesMeasureTitle()` |

</details>

* __Основные методы__

<details>
<summary>validateInputData</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Обновление и валидирование данных из `inputEditorWidth` и `inputEditorHeight` |
| __пример вызова__ | `eSizeInfo.validateInputData()` |

</details>

<details>
<summary>validatePagesInputData</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Обновление и валидирование данных из `inputPagesCount` |
| __пример вызова__ | `eSizeInfo.validatePagesInputData()` |

</details>

## Опции и позиции

* Получить данный модуль можно через вызов в калькуляторе `customWorkSelector`.
```js
pxpCalculators[0].customWorkSelector
```
##### CalcCustomWorkSelectorController
* Модель модуля опций. Хранит в себе всю информацию о состоянии опций, переменных опций, позиций опций, выбранных в позициях произвольных размеров и файлов.  
* __Основные свойства__

<details>
<summary>works</summary>

| __Тип переменной__ | массив `CalcCustomWorkState` |
|---|---|
| __описание__ | Массив всех опций |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()` |

</details>

<details>
<summary>availableWorks</summary>

| __Тип переменной__ | массив `CalcCustomWorkState` |
|---|---|
| __описание__ | Массив всех доступных для выбора опций |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.availableWorks()` |

</details>

<details>
<summary>worksDictionary</summary>

| __Тип переменной__ | Словарь `{ number: CalcCustomWorkState }` |
|---|---|
| __описание__ | Словарь опций, где ключ - Id опции, а значение - опция |
| __пример вызова__ | получаем словарь опций `var wDict = pxpCalculators[0].customWorkSelector.worksDictionary();`<br/>получаем опцию с Id 123456 `var work = wDict[123456];` |

</details>

<details>
<summary>itemsDictionary</summary>

| __Тип переменной__ | `{ number: CalcCustomWorkItemState }` |
|---|---|
| __описание__ | Словарь позиции опции, где ключ - Id позиции опции, а значение - позиции |
| __пример вызова__ | получаем словарь всех позиций `var iDict = pxpCalculators[0].customWorkSelector.itemsDictionary();`<br/>получаем позицию с Id 123456 `var item = iDict[123456];` |

</details>

<details>
<summary>finalState</summary>

| __Тип переменной__ | массив `ICustomWorkOutputState` |
|---|---|
| __описание__ | Текущее финальное состояние опций в калькуляторе |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.finalState()` |

* пример итогового состояния
```js
[
    {
        WorkId: 729251,
        Items: [
            {
                ItemId: 2789540,
                Quantity: 1
            }
        ]
    },
    {
        WorkId: 527204,
        Items: [
            {
                ItemId: 1937970,
                Quantity: 10
            }
        ]
    }
]
```

</details>

* __Основные методы__

<details>
<summary>loadState</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Загрузка предзаданного состояния выбора опций |
| __параметры функции__ | массив `ICustomWorkOutputState` |
| __пример вызова__ |  |
| получаем состояние для загрузки из первого калькулятора | `var stateToLoad = pxpCalculators[0].customWorkSelector.finalState();` |
| загружаем его во второй калькулятор | `pxpCalculators[1].customWorkSelector.loadState(stateToLoad);` |

> Состояние можно предварительно сохранить на странице и через скрипт загружать его в нужный калькулятор, если вам требуется настройка на нужные данные при загрузке старницы.

</details>

##### CalcCustomWorkState
* Модель опции. Хранит в себе информацию про опцию, переменные и ее позиции.  
* __Основные свойства__

<details>
<summary>variablesController</summary>

| __Тип переменной__ | `CalcVariablesController` или `null` |
|---|---|
| __описание__ | Контроллер переменных (подробнее в разделе "Переменные") |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].variablesController` |

</details>

<details>
<summary>workId</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Id опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].workId` |

</details>

<details>
<summary>title</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Название опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].title` |

</details>

<details>
<summary>description</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Описание опции для калькулятора |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].description` |

</details>

<details>
<summary>isAvailable</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает доступна опция для выбора в калькуляторе или нет |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].isAvailable()` |

</details>

<details>
<summary>isRequired</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает опция обязательна или нет |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].isRequired` |

</details>

<details>
<summary>isCheckbox</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает множественный ли выбор позиций в опции или нет |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].isCheckbox` |

</details>

<details>
<summary>isHidden</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает опция скрыта или нет |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].isHidden()` |

</details>

<details>
<summary>items</summary>

| __Тип переменной__ | массив `CalcCustomWorkItemState` |
|---|---|
| __описание__ | Все включенные позиции опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()` |

</details>

<details>
<summary>itemsAvailable</summary>

| __Тип переменной__ | массив `CalcCustomWorkItemState` |
|---|---|
| __описание__ | Все доступные для выбора в калькуляторе позиции опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].itemsAvailable()` |

</details>

<details>
<summary>selectedItems</summary>

| __Тип переменной__ | массив `CalcCustomWorkItemState` |
|---|---|
| __описание__ | Выбранные позиции опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].selectedItems()` |

</details>

<details>
<summary>selectedItemIds</summary>

| __Тип переменной__ | массив `number` |
|---|---|
| __описание__ | Выбранные Id позиций опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].selectedItemIds()` |

</details>

* __Основные методы__

<details>
<summary>validate</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает валидны данные в опции или нет |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].validate()` |

</details>

<details>
<summary>price</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Возвращает текущую цену опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].price()` |

</details>

##### CalcCustomWorkItemState
* Модель позиции опции.  
* __Основные свойства__

<details>
<summary>itemId</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Id позиции опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()[0].itemId()` |

</details>

<details>
<summary>title</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Название позиции опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()[0].title` |

</details>

<details>
<summary>description</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Описание позиции опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()[0].description` |

</details>

<details>
<summary>work</summary>

| __Тип переменной__ | `CalcCustomWorkState` |
|---|---|
| __описание__ | Опция родитель |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()[0].work` |

</details>

<details>
<summary>asInfo</summary>

| __Тип переменной__ | `CalcCustomWorkItemArbitrarySizeState` или `null` |
|---|---|
| __описание__ | Модель с информацией о произвольных размерах позиции опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()[0].asInfo` |

</details>

<details>
<summary>totalPrice</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Итоговая цена позиции опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()[0].totalPrice()` |

</details>

<details>
<summary>price</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Цена позиции опции без дополнительных стоимостей и процентов |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()[0].price()` |

</details>

<details>
<summary>additionalPrice</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Дополнительная цена позиции опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()[0].additionalPrice()` |

</details>

<details>
<summary>isAvailable</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает доступна позиция опции для выбора или нет |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()[0].isAvailable()` |

</details>

<details>
<summary>isSelected</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает выбрана позиция опции или нет |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()[0].isSelected()` |

</details>

<details>
<summary>quantity</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Количество позиции опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()[0].quantity()` |

</details>

<details>
<summary>totalPriceString</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Форматированая итоговая цена позиции опции (отдается в HTML) |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()[0].quantity()` |
| __пример результата__ | `0,00 <span class="postfix currency rub"><span>руб.</span></span>` |

</details>

##### CalcCustomWorkItemArbitrarySizeState
* Модель произвольных размеров позиции опции. Содержит в себе данные по фиксированным размерам, диапазону размеров, расчету по формуле, расчету по тексту и страничному расчету.  
* __Основные свойства__

<details>
<summary>finalState</summary>

| __Тип переменной__ | `IArbitrarySizeOutputData` |
|---|---|
| __описание__ | Итоговое состояние произвольных размеров позиции опции |
| __пример вызова__ | `pxpCalculators[0].customWorkSelector.works()[0].items()[0].asInfo.finalState()` |

* Пример результата
```js
{
    Width: 2,
    Height: 2
}
```

</details>

---
* __О финальных состояниях__
* Финальные состояния опций и позиций используются для расчетных данных, продолжения заказа и для метода `loadState` в модуле опций. Ниже указаны модели финальных состояний со всеми возможными полями. Как уже было описано выше, получить финальное состояние опций можно через команду ниже:
```js
var finalCustomWorksState = pxpCalculators[0].customWorkSelector.finalState()
```

##### ICustomWorkOutputState
* Модель финального состояния опции.  
* __Поля__

<details>
<summary>WorkId</summary>

| __Тип переменной__ | `number` или `null` |
|---|---|
| __описание__ | Id опции |

</details>

<details>
<summary>Items</summary>

| __Тип переменной__ | массив `ICustomWorkItemOutputState` или `null` |
|---|---|
| __описание__ | Массив финальных состояний всех выбранных позиций в опции |

</details>

##### ICustomWorkItemOutputState
* Модель финального состояния позиции опции.  
* __Поля__

<details>
<summary>ItemId</summary>

| __Тип переменной__ | `number` или `null` |
|---|---|
| __описание__ | Id позиции опции |

</details>

<details>
<summary>Quantity</summary>

| __Тип переменной__ | `number` или `null` |
|---|---|
| __описание__ | Количество позиции опции |

</details>

<details>
<summary>UserTemplateId</summary>

| __Тип переменной__ | `number` или `null` или `undefined` |
|---|---|
| __описание__ | Id пользовательского шаблона |

</details>

<details>
<summary>Size</summary>

| __Тип переменной__ | `IArbitrarySizeOutputData` или `null` или `undefined` |
|---|---|
| __описание__ | Модель финального состояния произвольных размеров позиции опции |

</details>

<details>
<summary>Variables</summary>

| __Тип переменной__ | массив `IVariableDTO` или `null` или `undefined` |
|---|---|
| __описание__ | Массив финальных состояний переменных (подробнее в разделе "Переменные") |

</details>

<details>
<summary>Files</summary>

| __Тип переменной__ | массив `number` или `null` или `undefined` |
|---|---|
| __описание__ | Массив Id выбранных файлов |

</details>

##### IArbitrarySizeOutputData
* Модель финального состояния произвольных размеров позиции опции.  
* __Основные свойства__

<details>
<summary>Width</summary>

| __Тип переменной__ | `number` или `undefined` |
|---|---|
| __описание__ | Итоговая ширина |

</details>

<details>
<summary>Height</summary>

| __Тип переменной__ | `number` или `undefined` |
|---|---|
| __описание__ | Итоговая высота |

</details>

<details>
<summary>Text</summary>

| __Тип переменной__ | `string` или `undefined` |
|---|---|
| __описание__ | Итоговый текст |

</details>

## Переменные

* Принцип работы модуля переменных в том, что он существует отдельно для каждой опции, поскольку в каждой опции может быть свой набор переменных. Получить данный модуль можно через обращение к `variablesController` в нужной для вас опции.
```js
var variablesCtrl = pxpCalculators[0].customWorkSelector.works()[0].variablesController
```
* В примерах далее будет использоваться обращение к модулю через переменную `variablesCtrl` для укорочения записи:

##### CalcVariablesController
* Модель модуля переменных. Хранит в себе информацию о доступных переменных для опции и методы их поиска.  
* __Основные свойства__

<details>
<summary>availableVariables</summary>

| __Тип переменной__ | массив `CalcVariableState` |
|---|---|
| __описание__ | Массив всех доступных переменных для опции |
| __пример вызова__ | `variablesCtrl.availableVariables()` |

</details>

<details>
<summary>variablesExists</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает есть ли переменные или нет для данной опции |
| __пример вызова__ | `variablesCtrl.variablesExists()` |

</details>

* __Основные методы__

<details>
<summary>getVariableByUniqueName</summary>

| __Тип переменной__ | `CalcVariableState` или `null` |
|---|---|
| __описание__ | Возвращает переменную по ее имени |
| __параметры функции__ | Уникальное имя переменной в виде строки |
| __пример вызова__ | получить переменную с именем _mass_ `variablesCtrl.getVariableByUniqueName('mass')` |

</details>

---

##### CalcVariableState
* Модель переменной.  
* __Основные свойства__

<details>
<summary>uniqueName</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Уникальное имя переменной |
| __пример вызова__ | `variablesCtrl.availableVariables()[0].uniqueName` |

</details>

<details>
<summary>title</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Название переменной |
| __пример вызова__ | `variablesCtrl.availableVariables()[0].title` |

</details>

<details>
<summary>measurement</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Размерность переменой |
| __пример вызова__ | `variablesCtrl.availableVariables()[0].measurement` |

</details>

<details>
<summary>inputValue</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Свойство для указания значения в переменную |
| __пример вызова__ | присвоение переменной значения 150 `variablesCtrl.availableVariables()[0].inputValue(150)` |

> Указывая данные самостоятельно не забудьте после этого провалидировать их методом `validateInputData`, иначе `selectedValue` не обновится!

</details>

<details>
<summary>selectedValue</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Выбранное значение в переменной |
| __пример вызова__ | `variablesCtrl.availableVariables()[0].selectedValue()` |

</details>

<details>
<summary>isVisible</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает отображается переменная или нет |
| __пример вызова__ | `variablesCtrl.availableVariables()[0].isVisible()` |

</details>

* __Основные методы__

<details>
<summary>validateInputData</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Обновление и валидирование данных из `inputValue` |
| __пример вызова__ | `variablesCtrl.availableVariables()[0].validateInputData()` |

</details>

---

* __О финальных состояниях__
* Финальное состояния переменной используется в модели `ICustomWorkItemOutputState` (подробнее о ней написано в разделе «Опции и позиции»). Ниже расписаны все возможные поля в модели финального состояния переменной.

##### IVariableDTO
* Модель финального состояния переменной.  
* __Поля__

<details>
<summary>UniqueName</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Уникальное имя переменной |

</details>

<details>
<summary>Value</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Выбранное значение в переменной |

</details>

* Пример финального состояния переменной:
```js
{
    UniqueName: 'mass',
    Value: 10                                
}
```

## Тиражи

* Получить данный модуль можно через вызов в калькуляторе `circulationSelector`.
```js
pxpCalculators[0].circulationSelector
```

##### CirculationSelectorController
* Модель модуля по работе с тиражами, многостраничным расчетом, поверхностями и учетом фотографий.  
* __Основные свойства__

<details>
<summary>options</summary>

| __Тип переменной__ | массив `CirculationOption` |
|---|---|
| __описание__ | Массив моделей тиражности |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.options()` |

</details>

<details>
<summary>option</summary>

| __Тип переменной__ | `CirculationOption` или `null` |
|---|---|
| __описание__ | Выбранная модель тиражности |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.option()` |

</details>

<details>
<summary>isFixedOption</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает являются ли текущие модели тиражности с выбором количества через предварительно заданные тиражи |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.isFixedOption()` |

</details>

<details>
<summary>isFloatOption</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает являются ли текущие модели тиражности с выбором количества через ввод тиража вручную |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.isFloatOption()` |

</details>

<details>
<summary>floatQuantity</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Текущее выбранное количество товара |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.floatQuantity()` |

</details>

<details>
<summary>complexOption</summary>

| __Тип переменной__ | `CirculationComplex` или `null` |
|---|---|
| __описание__ | Модуль для выбора количества страниц |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.complexOption()` |

</details>

<details>
<summary>isComplexProduct</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает есть ли возможность выбора количества страниц |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.isComplexProduct()` |

</details>

<details>
<summary>surfacesSettings</summary>

| __Тип переменной__ | `CirculationSurfacesSettings` или `null` |
|---|---|
| __описание__ | Блок работы с поверхностями товара |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.surfacesSettings()` |

</details>

<details>
<summary>isSurfacesSettingsAvailable</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ |Возвращает есть ли возможность работы с поверхностями товара  |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.isSurfacesSettingsAvailable()` |

</details>

<details>
<summary>photosSettings</summary>

| __Тип переменной__ | `CirculationPhotosSettings` или `null` |
|---|---|
| __описание__ | Блок работы с учетом фотографий |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.photosSettings()` |

</details>

<details>
<summary>isPhotosSettingsAvailable</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает есть ли возможность работы с учетом фотографий |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.isPhotosSettingsAvailable()` |

</details>

---

##### CirculationOptionFixed
* Модель тиражности с выбором количества через предварительно заданный тираж.  
* __Основные свойства__

<details>
<summary>quantity</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Предзаданное количество |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.option().quantity()` |

</details>

<details>
<summary>isSelected</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает выбран тираж или нет |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.option().isSelected()` |

</details>

* __Основные методы__

<details>
<summary>select</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Метод выбора тиража |
| __пример вызова__ | выбор 4-го тиража из массива тиражей `pxpCalculators[0].circulationSelector.options()[3].select()` |

</details>

##### CirculationOptionFloat
* Модель тиражности с выбором количества через ввод тиража вручную.  
* __Основные свойства__

<details>
<summary>min</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Минимальное возможное количество |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.option().min` |

</details>

<details>
<summary>max</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Максимальное возможное количество |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.option().max` |

</details>

<details>
<summary>quantity</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Выбранное количество |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.option().quantity()` |

</details>

<details>
<summary>isSelected</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает выбран тираж или нет |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.option().isSelected()` |

</details>

* Если вам требуется выбрать тираж через ввод значения, тогда это требуется сделать следующим образом:
```js
// устанавливаем количество 15
pxpCalculators[0].circulationSelector.floatQuantity(15);
 
// калькулятор сам проведет все проверки и положит в итоговый option() необходимый тираж
// данный способ работает только для выбора тиражности через ввод числа
```

---

##### CirculationComplex
* Модель блока многостраничности.  
* __Основные свойства__

<details>
<summary>partsQuantity</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Итоговое количество страниц |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.complexOption().partsQuantity()` |

</details>

<details>
<summary>itemPartsMinimum</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Минимальное количество страниц |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.complexOption().itemPartsMinimum` |

</details>

<details>
<summary>itemPartsMaximum</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Максимально количество страниц |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.complexOption().itemPartsMaximum` |

</details>

<details>
<summary>itemPartsGrowStep</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Шаг страниц |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.complexOption().itemPartsGrowStep` |

</details>

* __Основные методы__

<details>
<summary>setDisplayPartsQuantity</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Ввод количества страниц. Если указанное число не будет удолетворять ограничениям, то оно будет заменено на валидное |
| __параметры функции__ | Число |
| __пример вызова__ | устанавливаем количество страниц 15 `pxpCalculators[0].circulationSelector.complexOption().displayPartsQuantity(15)` |

</details>

---

##### CirculationSurfacesSettings
* Модель блока поверхностей товара.  
* __Основные свойства__

<details>
<summary>surfaces</summary>

| __Тип переменной__ | массив `CirculationSurfacesSettingsSurface` |
|---|---|
| __описание__ | Все поверхности товара |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.surfacesSettings().surfaces()` |

</details>

<details>
<summary>selectedSurfacesZonesPrices</summary>

| __Тип переменной__ | массив `number` или `null` |
|---|---|
| __описание__ | Итоговые цены выбранных зон поверхностей |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.surfacesSettings().selectedSurfacesZonesPrices()` |

</details>

##### CirculationSurfacesSettingsSurface
* Модель поверхности товара.  
* __Основные свойства__

<details>
<summary>index</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Индекс поверхности (в порядке как в настройках товара) |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.surfacesSettings().surfaces()[0].index` |

</details>

<details>
<summary>title</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Название поверхности |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.surfacesSettings().surfaces()[0].title` |

</details>

<details>
<summary>zones</summary>

| __Тип переменной__ | массив `CirculationSurfacesSettingsSurfaceZone` |
|---|---|
| __описание__ | Зоны поверхности товара |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.surfacesSettings().surfaces()[0].zones()` |

</details>

<details>
<summary>selectedZone</summary>

| __Тип переменной__ | `CirculationSurfacesSettingsSurfaceZone` или `null` |
|---|---|
| __описание__ | Выбранная зона поверхности товара |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.surfacesSettings().surfaces()[0].selectedZone()` |

</details>

##### CirculationSurfacesSettingsSurfaceZone
* Модель зоны поверхности товара.  
* __Основные свойства__

<details>
<summary>index</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Индекс зоны поверхности (в порядке как в настройках товара) |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.surfacesSettings().surfaces()[0].selectedZone().index` |

</details>

<details>
<summary>title</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Название зоны поверхности |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.surfacesSettings().surfaces()[0].selectedZone().title` |

</details>

<details>
<summary>price</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Стоимость зоны поверхности |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.surfacesSettings().surfaces()[0].selectedZone().price` |

</details>

<details>
<summary>surface</summary>

| __Тип переменной__ | `CirculationSurfacesSettingsSurface` |
|---|---|
| __описание__ | Поверхность, к которой относится зона |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.surfacesSettings().surfaces()[0].selectedZone().surface` |

</details>

<details>
<summary>isSelected</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает выбрана ли эта зона поверхности |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.surfacesSettings().surfaces()[0].selectedZone().isSelected()` |

</details>

* __Основные методы__

<details>
<summary>select</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Задание этой зоны поверхности как выбранной |
| __пример вызова__ | выбираем третью зону из массива зон поверхности `pxpCalculators[0].circulationSelector.surfacesSettings().surfaces()[0].zones()[2].select()` |

</details>

---

##### CirculationPhotosSettings
* Модель блока учета фотографий.  
* __Основные свойства__

<details>
<summary>minimumPhotosCount</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Минимальное число фотографий |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.photosSettings().minimumPhotosCount` |

</details>

<details>
<summary>additionalPhotosCountToMinimum</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Добавочное количество фотографий за каждую дополнительную страницу |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.photosSettings().additionalPhotosCountToMinimum` |

</details>

<details>
<summary>pricePerPhoto</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Цена за фотографию |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.photosSettings().pricePerPhoto` |

</details>

<details>
<summary>totalMinimumPhotosCount</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Общее число минимального количества фотографий |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.photosSettings().totalMinimumPhotosCount()` |

</details>

<details>
<summary>photosQuantity</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Текущее количество фотографий |
| __пример вызова__ | `pxpCalculators[0].circulationSelector.photosSettings().photosQuantity()` |

</details>

## Ценовая панель

* Получить данный модуль можно через вызов в калькуляторе `totalPriceCalculator`.
```js
pxpCalculators[0].totalPriceCalculator
```

##### CalcTotalPriceViewController
* Модель ценовой панели. На ней отображаются итоговые цены, кнопки для заказа товара и предупреждения в случае невалидных данных.  
* __Основные свойства__

<details>
<summary>totalPrice</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Итоговая цена |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.totalPrice()` |

</details>

<details>
<summary>totalPriceWithoutDiscounts</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Итоговая цена без скидки |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.totalPriceWithoutDiscounts()` |

</details>

<details>
<summary>totalProductPriceWithoutCustomWorks</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Итоговая цена товара без скидки и опций |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.totalProductPriceWithoutCustomWorks()` |

</details>

<details>
<summary>totalProductCustomWorksPrice</summary>

| __Тип переменной__ | `number` |
|---|---|
| __описание__ | Итоговая стоимость опций без скидки |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.totalProductCustomWorksPrice()` |

</details>

<details>
<summary>totalPriceFormatted</summary>

| __Тип переменной__ | `string` |
|---|---|
| __описание__ | Текстовый вид итоговой цены (отдается в HTML) |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.totalPriceFormatted()` |
| __пример результата__ | `Итого: <span class="price-total" id="">10,00 <span class="postfix currency rub"><span>руб.</span></span></span>` |

</details>

<details>
<summary>visible</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает отображается ценовая панель или нет |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.visible()` |

</details>

<details>
<summary>isTotalPriceLoading</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает цена обновляется или нет |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.isTotalPriceLoading()` |

</details>

<details>
<summary>continueOrderClickIsEnabled</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает кнопка "Продолжить заказ" доступна или нет |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.continueOrderClickIsEnabled()` |

</details>

<details>
<summary>addToCartEnabled</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __описание__ | Возвращает кнопка "Добавить в корзину" доступна или нет |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.addToCartEnabled()` |

</details>

* __Основные методы__

<details>
<summary>show</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Показать модуль ценовой панели |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.show()` |

</details>

<details>
<summary>hide</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Скрыть модуль ценовой панели |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.hide()` |

</details>

<details>
<summary>refreshPrice</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Метод для обновления цены |
| __условие выполнения__ | Обновление калькулятора в данный момент не происходит, и не было ошибок с загрузкой состояния |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.refreshPrice()` |

</details>

<details>
<summary>continueOrderClick</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Метод для активации события "Продолжение заказа" |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.continueOrderClick()` |

</details>

<details>
<summary>addToCartClick</summary>

| __Тип переменной__ | `void` |
|---|---|
| __описание__ | Метод для активации события "Добавить в корзину" |
| __пример вызова__ | `pxpCalculators[0].totalPriceCalculator.addToCartClick()` |

</details>