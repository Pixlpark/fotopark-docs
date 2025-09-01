import { useState, useEffect } from 'react';

const PhotoBookCalculator = () => {
  // Ценовые константы
  const minPriceFolder = 800;
  const minPriceAlbum = 1000;
  const minPriceTablet = 600;
  const oneSpreadPrice = 20;

  // Состояния компонента
  const [bookType, setBookType] = useState('album');
  const [isPersonalCover, setIsPersonalCover] = useState(true);
  const [spreadCount, setSpreadCount] = useState(10);
  const [uniqueSpreadCount, setUniqueSpreadCount] = useState(1);
  const [studentsCount, setStudentsCount] = useState(20);
  const [totalPrice, setTotalPrice] = useState(0);

  // Обработчик изменения типа книги
  const handleBookTypeChange = (type) => {
    setBookType(type);
    
    if (type === 'folder') {
      setSpreadCount(1);
      setUniqueSpreadCount(0);
      setIsPersonalCover(true);
    } else if (type === 'tablet') {
      // Настройки для планшета
      setSpreadCount(1);
      setUniqueSpreadCount(0);
      setIsPersonalCover(true);
    } else {
      // Настройки для альбома
      setSpreadCount(10);
      setUniqueSpreadCount(1);
    }
  };

  // Расчет стоимости
  const calculateTotalPrice = () => {
    const baseSpreads = Math.max(spreadCount - uniqueSpreadCount, 0);
    const basePrice = baseSpreads * oneSpreadPrice;
    const uniqPrice = uniqueSpreadCount * studentsCount * oneSpreadPrice;
    const coverPrice = isPersonalCover ? studentsCount * oneSpreadPrice : oneSpreadPrice;

    const total = basePrice + uniqPrice + coverPrice;

    // Определяем минимальную цену в зависимости от типа
    let minPrice;
    switch (bookType) {
      case 'folder':
        minPrice = minPriceFolder;
        break;
      case 'tablet':
        minPrice = minPriceTablet;
        break;
      default: // album
        minPrice = minPriceAlbum;
    }

    const finalPrice = Math.max(total, minPrice);
    setTotalPrice(finalPrice);
  };

  // Проверка и корректировка уникальных разворотов
  const validateUniqueSpreads = (newSpreadCount, newUniqueCount) => {
    if (newUniqueCount > newSpreadCount) {
      return newSpreadCount;
    }
    return newUniqueCount;
  };

  // Обработчик изменения общего количества разворотов
  const handleSpreadChange = (value) => {
    const numValue = parseInt(value) || 1;
    const clampedValue = Math.min(Math.max(numValue, 1), 50);
    const newUniqueCount = validateUniqueSpreads(clampedValue, uniqueSpreadCount);
    
    setSpreadCount(clampedValue);
    setUniqueSpreadCount(newUniqueCount);
  };

  // Обработчик изменения уникальных разворотов
  const handleUniqueSpreadChange = (value) => {
    const maxValue = (bookType === 'folder' || bookType === 'tablet') ? 1 : spreadCount;
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.min(Math.max(numValue, 0), maxValue);
    setUniqueSpreadCount(clampedValue);
  };

  // Обновляем расчет при изменении параметров
  useEffect(() => {
    calculateTotalPrice();
  }, [bookType, isPersonalCover, spreadCount, uniqueSpreadCount, studentsCount]);

  return (
    <div className="price-block__left">
      <div className="new-calc">
        <div className="calc-card">
          <h2>Рассчитать стоимость</h2>
          
          {/* Тип книги */}
          <div className="option">
            <div className="book-type-options">
              <div 
                className={`book-card ${bookType === 'album' ? 'active-card' : ''}`}
                onClick={() => handleBookTypeChange('album')}
              >
                <img src="/img/rectangle_79.png" alt="Альбом" />
                <p>Альбом</p>
                <span>от {minPriceAlbum.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div 
                className={`book-card ${bookType === 'folder' ? 'active-card' : ''}`}
                onClick={() => handleBookTypeChange('folder')}
              >
                <img src="/img/rectangle_76.png" alt="Папка" />
                <p>Трюмо</p>
                <span>от {minPriceFolder.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div 
                className={`book-card ${bookType === 'tablet' ? 'active-card' : ''}`}
                onClick={() => handleBookTypeChange('tablet')}
              >
                <img src="/img/фотопапка.png" alt="Планшет" />
                <p>Планшет</p>
                <span>от {minPriceTablet.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>

          {/* Персональная обложка */}
          <div className="option">
            <label className={`person-cover ${isPersonalCover ? 'active' : ''}`}>
              <input 
                type="checkbox"
                className="hidden"
                checked={isPersonalCover}
                onChange={(e) => setIsPersonalCover(e.target.checked)}
                disabled={bookType === 'folder' || bookType === 'tablet'}
              />
              <div className="toggle">
                <div className="circle"></div>
              </div>
              <p className="label">персональная обложка</p>
            </label>
          </div>
          
          <div className="group-option">
            {/* Количество разворотов */}
            <div className="option">
              <p className="label">Всего разворотов</p>
              <div className="spread-control all">
                <button 
                  type="button" 
                  className="decrease"
                  onClick={() => handleSpreadChange(spreadCount - 1)}
                  disabled={bookType === 'folder' || bookType === 'tablet'}
                >–</button>
                <input 
                  type="number"
                  value={spreadCount}
                  min="1"
                  max="50"
                  onChange={(e) => handleSpreadChange(e.target.value)}
                  disabled={bookType === 'folder' || bookType === 'tablet'}
                />
                <button 
                  type="button" 
                  className="increase"
                  onClick={() => handleSpreadChange(spreadCount + 1)}
                  disabled={bookType === 'folder' || bookType === 'tablet'}
                >+</button>
              </div>
            </div>

            {/* Количество уникальных разворотов */}
            <div className="option">
              <p className="label">Уникальных разворотов</p>
              <div className="spread-control">
                <button 
                  type="button" 
                  className="decrease"
                  onClick={() => handleUniqueSpreadChange(uniqueSpreadCount - 1)}
                  disabled={(bookType === 'folder' || bookType === 'tablet') && uniqueSpreadCount <= 0}
                >–</button>
                <input 
                  type="number"
                  value={uniqueSpreadCount}
                  min="0"
                  max={(bookType === 'folder' || bookType === 'tablet') ? 1 : spreadCount}
                  onChange={(e) => handleUniqueSpreadChange(e.target.value)}
                />
                <button 
                  type="button" 
                  className="increase"
                  onClick={() => handleUniqueSpreadChange(uniqueSpreadCount + 1)}
                  disabled={(bookType === 'folder' || bookType === 'tablet') && uniqueSpreadCount >= 1}
                >+</button>
              </div>
            </div>
          </div>

          {/* Количество учеников */}
          <div className="option">
            <label className="label">
              Количество учеников: <span>{studentsCount}</span>
            </label>
            <input 
              type="range"
              min="5"
              max="35"
              value={studentsCount}
              onChange={(e) => setStudentsCount(parseInt(e.target.value))}
              className="range-slider"
            />
          </div>

          {/* Итоговая стоимость */}
          <div className="option total flex">
            <p className="label">Стоимость за весь класс:</p>
            <span className="tip" data-tooltip="20 ₽ / уникальный разворот, но не менее 1000 ₽">
              <img src="img/questionmark.svg" alt="Подсказка" />
            </span>
            <p className="total-value">{totalPrice.toLocaleString('ru-RU')} ₽</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoBookCalculator;