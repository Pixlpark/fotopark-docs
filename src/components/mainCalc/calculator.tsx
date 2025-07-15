import { useState, useEffect } from 'react';

const MainCalculator = () => {
  // Ценовые константы
  const minPriceFolder = 500;
  const minPriceAlbum = 1000;
  const oneSpreadPrice = 20;
  const oneLifeAlbum = 30;

  // Состояния компонента
  const [bookType, setBookType] = useState('album');
  const [isPersonalCover, setIsPersonalCover] = useState(true);
  const [spreadCount, setSpreadCount] = useState(10);
  const [uniqueSpreadCount, setUniqueSpreadCount] = useState(1);
  const [studentsCount, setStudentsCount] = useState(20);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculateTotalPrice();
  }, [bookType, isPersonalCover, spreadCount, uniqueSpreadCount, studentsCount]);

  // Функция расчета итоговой стоимости
  const calculateTotalPrice = () => {
    const baseSpreads = Math.max(spreadCount - uniqueSpreadCount, 0);
    const basePrice = baseSpreads * oneSpreadPrice;
    const uniqPrice = uniqueSpreadCount * studentsCount * oneSpreadPrice;
    const coverPrice = isPersonalCover ? studentsCount * oneSpreadPrice : oneSpreadPrice;

    const total = basePrice + uniqPrice + coverPrice;

    const finalPrice = bookType === 'folder'
      ? Math.max(total, minPriceFolder)
      : Math.max(total, minPriceAlbum);

    setTotalPrice(finalPrice);
  };

  // Обработчики изменения значений
  const handleSpreadCountChange = (value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 50) {
      setSpreadCount(numValue);
      if (uniqueSpreadCount > numValue) {
        setUniqueSpreadCount(numValue);
      }
    }
  };

  const handleUniqueSpreadCountChange = (value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 50) {
      setUniqueSpreadCount(numValue);
    }
  };

  const handleStudentsCountChange = (value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 5 && numValue <= 35) {
      setStudentsCount(numValue);
    }
  };

  return (
    <div className="price-block__left">
      <div className="new-calc">
        <div className="calc-card">
          
          {/* Тип книги */}
          <div className="option">
            <div id="bookType" className="book-type-options">
              <div 
                className={`book-card ${bookType === 'album' ? 'active-card' : ''}`} 
                onClick={() => setBookType('album')}
                data-type="album"
              >
                <img src="/img/rectangle_76.png" alt="Альбом" />
                <p>Альбом</p>
                <span>от {minPriceAlbum.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div 
                className={`book-card ${bookType === 'folder' ? 'active-card' : ''}`} 
                onClick={() => setBookType('folder')}
                data-type="folder"
              >
                <img src="/img/rectangle_79.png" alt="Папка" />
                <p>Трюмо или Папка</p>
                <span>от {minPriceFolder.toLocaleString('ru-RU')} ₽</span>
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
              <div className="spread-control">
                <button 
                  type="button" 
                  className="decrease" 
                  onClick={() => handleSpreadCountChange(spreadCount - 1)}
                  disabled={bookType === 'folder'}
                >–</button>
                <input 
                  type="number" 
                  id="spreadCount" 
                  value={spreadCount}
                  min="1" 
                  max="50"
                  onChange={(e) => handleSpreadCountChange(e.target.value)}
                  disabled={bookType === 'folder'}
                />
                <button 
                  type="button" 
                  className="increase" 
                  onClick={() => handleSpreadCountChange(spreadCount + 1)}
                  disabled={bookType === 'folder'}
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
                  onClick={() => handleUniqueSpreadCountChange(uniqueSpreadCount - 1)}
                >–</button>
                <input 
                  type="number" 
                  id="unicalSpreadCount" 
                  value={uniqueSpreadCount}
                  min="0" 
                  max={bookType === 'folder' ? 1 : 50}
                  onChange={(e) => handleUniqueSpreadCountChange(e.target.value)}
                />
                <button 
                  type="button" 
                  className="increase" 
                  onClick={() => handleUniqueSpreadCountChange(uniqueSpreadCount + 1)}
                >+</button>
              </div>
            </div>
          </div>
          {/* Количество учеников */}
          <div className="option">
            <label htmlFor="studentsRange" className="label">
              Количество учеников: <span id="studentsValue">{studentsCount}</span>
            </label>
            <input 
              type="range" 
              id="studentsRange" 
              min="5" 
              max="35" 
              value={studentsCount}
              onChange={(e) => handleStudentsCountChange(e.target.value)}
              className="range-slider"
            />
          </div>

          <div className="option total flex">
            <p className="label">Стоимость за весь класс:</p>
            <span className="tip" data-tooltip="20 ₽ / уникальный разворот, но не менее 1000 ₽">
              <img src="img/questionmark.svg" alt="Подсказка" />
            </span>
            <p className="total-value">
              <span id="totalPrice">{totalPrice.toLocaleString('ru-RU')}</span> ₽
            </p>
          </div>
          <div className="option prompt">
            <p>
              {/* <strong>{oneSpreadPrice} ₽</strong> / уникальный разворот, но не менее{' '}
              <strong>{bookType === 'folder' ? minPriceFolder : minPriceAlbum} ₽</strong> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCalculator;