---
title: Установка калькулятора
description: Установка калькулятора на вшнений сайт, работающего на том же доменном имени
sidebar_position: 3
---

# Установка калькулятора на внешний сайт

* Самый банальный пример итогового скрипта для интеграции:
```js
<div id="container"></div>
<script src="http://demo.pixlpark.ru/api/calc/externalCalc"></script>
<script>
    var container = document.getElementById("container");
    var params = { materialType: "photos" };
    var integrated = new PxpCalcManager(container, params);
</script>
```
* Калькулятор можно интегрировать на внешний сайт. Для этого необходимо сделать следующее:

## 1. Создание контейнера
* Cоздать на странице контейнер, в котором позже будет находиться калькулятор.
```js
<div id="integratedCalculator"></div>
```
* В данном случае это простой контейнер `div` с **Id** `integratedCalculator`. В будущем в нем будет разметка калькулятора.

## 2. Загрузка скрипта
* Дальше через тег `<script>` получим необходимый скрипт для инициализации калькулятора. Для этого нужно от сайта на платформе Pixlpark сделать следующий вид запроса через API:
```js
<script src="http://demo.pixlpark.ru/api/calc/externalCalc"></script>
```
В `src` скрипта мы имеем:
    1. Домен на платформе [Pixlpark](http://demo.pixlpark.ru), однако у вас должен быть один из тех, что вы указали в разделе настройки доменов.
    1. Путь `/api/calc/externalCalc`, который посылает запрос на сервер для получения скрипта для инициализации калькулятора.
* У данного API-запроса также могут быть параметры:

<details>
<summary>cssLink</summary>

| | cssLink |
|---|---|
| __Описание__ | Загружает на страницу css файл по указанной ссылке |
| __По умолчанию__ | common.css |
| __Необходимость__ | Необязательный параметр |
| __Пример использования__ | `<script src="http://demo.pixlpark.ru/api/calc/externalCalc?cssLink=/content/css/cssCalc"></script>` |

</details>

<details>
<summary>photolabId</summary>

| photolabId | |
|---|---|
| __Описание__ | Загружает калькулятор от конкретного сайта по указанному Id |
| __По умолчанию__ | Берется от указанного домена |
| __Необходимость__ | Необязательный параметр |
| __Пример использования__ | `<script src="http://demo.pixlpark.ru/api/calc/externalCalc?photolabId=3264"></script>` |

</details>

## 3. Инициализация калькулятора
* После того как скрипт загружен, необходимо инициализировать калькулятор. Чтобы это сделать, необходимо вызвать функцию __PxpCalcManager__. Рассмотрим параметры, которые входят в эту функцию:

* __PxpCalcManager__  
* Модель, содержащая в себе методы для инициализации калькулятора на странице.  
* __Параметры конструктора__

<details>
<summary>element</summary>

| | HTMLElement |
|---|---|
| __Описание__ | Контейнер, в который будет заружен калькулятор |

</details>

<details>
<summary>params</summary>

| | ParamsModel |
|---|---|
| __Описание__ | Набор параметров для настройки инициализации калькулятора |

</details>

* __ParamsModel__  
* Набор параметров для настройки инициализации калькулятора.  
* __Поля__

<details>
<summary>materialType</summary>

| __Тип переменной__ | `string` или `number` |
|---|---|
| __Описание__ | Id или UrlName категории (можно найти в настройках категории) |
| __Необходимость__ | Обязательный параметр |

</details>

<details>
<summary>origin</summary>

| __Тип переменной__ | `string` |
|---|---|
| __Описание__ | Оригинальный домен, на который будет переходить пользователь для оформления заказа |
| __По умолчанию__ | Домен от которого загружается скрипт для инициализации (если брать пример выше - то http://demo.pixlpark.ru) |
| __Необходимость__ | Необязательный параметр |

</details>

<details>
<summary>apiUrl</summary>

| __Тип переменной__ | `string` |
|---|---|
| __Описание__ | Домен для API запросов (загрузка данных по категориям, товарам, расчет цен и т.п.) |
| __По умолчанию__ | Параметр origin |
| __Необходимость__ | Необязательный параметр |

</details>

<details>
<summary>material</summary>

| __Тип переменной__ | `string` или `number` |
|---|---|
| __Описание__ | Id или UrlName товара (можно найти в настройках товара) |
| __По умолчанию__ | null |
| __Необходимость__ | Необязательный параметр |

</details>

<details>
<summary>config</summary>

| __Тип переменной__ | `string` |
|---|---|
| __Описание__ | Имя конфигурации, задается в настройках калькулятора |
| __По умолчанию__ | default |
| __Необходимость__ | Необязательный параметр |

</details>

<details>
<summary>languageId</summary>

| __Тип переменной__ | `number` |
|---|---|
| __Описание__ | Id языка сайта |
| __По умолчанию__ | Id главного языка сайта из параметра origin |
| __Необходимость__ | Необязательный параметр |

</details>

<details>
<summary>isMobile</summary>

| __Тип переменной__ | `boolean` |
|---|---|
| __Описание__ | Возвращает мобильная версия калькулятора или нет |
| __По умолчанию__ | false |
| __Необходимость__ | Необязательный параметр |

</details>

<details>
<summary>additionalQueryParams</summary>

| __Тип переменной__ | Словарь `{ string: string }` |
|---|---|
| __Описание__ | Собственные параметры, которые уйдут в строку запроса при переходе из калькулятора |
| __По умолчанию__ | null |
| __Необходимость__ | Необязательный параметр |
| __Примечание__ | Данный параметр нужен для того, чтобы если вы нажимаете на кнопку заказать на внешнем калькуляторе, ссылка, ведущая на следующую страницу, содержала эти параметры как часть запроса |

</details>

* Пример инициализации калькулятора, у которого:
    1. `materialType` имеет UrlName 'photos';
    1. выбран товар с Id 123456;
    1. выбран язык с Id 789456;
    1. `additionalQueryParams` содержит два параметра.
```js
<script>
   // контейнер для калькулятора
   var container = document.getElementById("integratedCalculator"); 
 
   // параметры для иницилизации
   var params = { 
       materialType: 'photos',
       material: 123456,
       languageId: 789456,
       additionalQueryParams: {
          'id_calc_tmp': '45',
          'isExternal': 'true'
       }
   };
 
   // иницилизация
   var integratedCalc = new PxpCalcManager(container, params);                                    
</script>
```

## 4. Интеграция с 1С
* Код интеграции отдельно для 1С:
```js
<div id="integratedCalculator"></div>
<script src="http://demo.pixlpark.ru/api/poly1c/calculator/external"></script>
<script>
    var integrated = {
	    materialTypeId: 982756, 
    };
    Poly1CCalcManager("integratedCalculator", integrated);
</script>
```

## 5. Калькулятор для мерча
* Код интеграции для [продукции с готовым дизайном](https://docs.pixlpark.ru/print/merch):
```js
<div id="merchCalculator"></div>
<script src="https://demo.pixlpark.ru/api/categories/variant/external"></script>
<script>
    var settings = {
        merchId: 975, 
        merchVariantId: 62880,
        hidePreview: true,
    };
    MerchPageManager("merchCalculator", settings);
</script>
```

<details>
<summary>merchId</summary>

| | HTMLElement |
|---|---|
| __Тип переменной__| Number |
| __Описание__      | Id категории мерча |
| __Необходимость__ | Обязательный параметр|

</details>
<details>
<summary>merchVariantId</summary>

| | HTMLElement |
|---|---|
| __Тип переменной__| Number |
| __Описание__      | Id дизайна мерча |
| __Необходимость__ | Обязательный параметр|

</details>
<details>
<summary>hidePreview</summary>

| | HTMLElement |
|---|---|
| __Тип переменной__| Boolean |
| __Описание__      | Параметр, отвечающий за отображение изображения продукта |
| __По умолчанию__  | false |
| __Необходимость__ | Необязательный параметр|

</details>