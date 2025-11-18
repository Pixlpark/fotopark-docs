import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

interface ProductConfig {
  minPrice: number;
  hasSpreads: boolean;
  hasPersonalCover: boolean;
  hasUniqueSpreads: boolean;
  defaultSpreads: number;
  defaultUniqueSpreads: number;
  minSpreads: number;
  maxSpreads: number;
  pricePerSpread: number;
  spreadLabel: string;
  uniqueLabel: string;
}

interface ProductConfigs {
  [key: string]: ProductConfig;
}

const productConfig: ProductConfigs = {
  'album': {
    minPrice: 1000,
    hasSpreads: true,
    hasPersonalCover: true,
    hasUniqueSpreads: true,
    defaultSpreads: 5,
    defaultUniqueSpreads: 1,
    minSpreads: 2,
    maxSpreads: 50,
    pricePerSpread: 20,
    spreadLabel: 'Всего разворотов',
    uniqueLabel: 'Из них уникальных'
  },
  'folder': {
    minPrice: 900,
    hasSpreads: true,
    hasPersonalCover: true,
    hasUniqueSpreads: true,
    defaultSpreads: 1,
    defaultUniqueSpreads: 0,
    minSpreads: 1,
    maxSpreads: 1,
    pricePerSpread: 30,
    spreadLabel: 'Всего разворотов',
    uniqueLabel: 'Из них уникальных'
  },
  'tablet': {
    minPrice: 800,
    hasSpreads: true,
    hasPersonalCover: true,
    hasUniqueSpreads: true,
    defaultSpreads: 1,
    defaultUniqueSpreads: 0,
    minSpreads: 1,
    maxSpreads: 1,
    pricePerSpread: 25,
    spreadLabel: 'Всего разворотов',
    uniqueLabel: 'Из них уникальных'
  },
  'vignette': {
    minPrice: 700,
    hasSpreads: true,
    hasPersonalCover: false,
    hasUniqueSpreads: true,
    defaultSpreads: 1,
    defaultUniqueSpreads: 0,
    minSpreads: 1,
    maxSpreads: 200,
    pricePerSpread: 30,
    spreadLabel: 'Всего разворотов',
    uniqueLabel: 'Из них уникальных'
  },
  'calendar': {
    minPrice: 600,
    hasSpreads: true,
    hasPersonalCover: false,
    hasUniqueSpreads: true,
    defaultSpreads: 1,
    defaultUniqueSpreads: 0,
    minSpreads: 1,
    maxSpreads: 200,
    pricePerSpread: 25,
    spreadLabel: 'Всего разворотов',
    uniqueLabel: 'Из них уникальных'
  },
    'photo': {
    minPrice: 500,
    hasSpreads: true,
    hasPersonalCover: false,
    hasUniqueSpreads: true,
    defaultSpreads: 3,
    defaultUniqueSpreads: 0,
    minSpreads: 1,
    maxSpreads: 200,
    pricePerSpread: 5,
    spreadLabel: 'Фотографий ученика',
    uniqueLabel: 'Из них уникальных'
  }
};

const PriceCalculator: React.FC = () => {
  const [currentProductType, setCurrentProductType] = useState<string>('album');
  const [spreadCount, setSpreadCount] = useState<number>(10);
  const [uniqueSpreadCount, setUniqueSpreadCount] = useState<number>(1);
  const [studentsCount, setStudentsCount] = useState<number>(20);
  const [isPersonalCover, setIsPersonalCover] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const config = productConfig[currentProductType];

  const adjustUniqueSpreads = () => {
    if (uniqueSpreadCount > spreadCount) {
      setUniqueSpreadCount(spreadCount);
    }
  };

  const calculateTotalPrice = () => {
    const isPersonalCoverActive = isPersonalCover && config.hasPersonalCover;
    let total = 0;

    if (config.hasSpreads) {
      if (currentProductType === "photo") {
        total = spreadCount * studentsCount * config.pricePerSpread;
      } else {
        const baseSpreads = Math.max(spreadCount - uniqueSpreadCount, 0);
        const basePrice = baseSpreads * config.pricePerSpread;
        const uniqPrice = uniqueSpreadCount * studentsCount * config.pricePerSpread;
        const coverPrice = isPersonalCoverActive ? studentsCount * config.pricePerSpread : config.pricePerSpread;
        
        total = basePrice + uniqPrice + coverPrice;
      }
    } else {
      total = studentsCount * config.pricePerSpread;
    }

    const finalPrice = Math.max(total, config.minPrice);
    setTotalPrice(finalPrice);
  };

  const updateUIForProductType = (productType: string) => {
    const newConfig = productConfig[productType];
    setCurrentProductType(productType);
    setSpreadCount(newConfig.defaultSpreads);
    setUniqueSpreadCount(newConfig.defaultUniqueSpreads);
  };

  const handleSpreadChange = (value: number) => {
    const newValue = Math.max(config.minSpreads, Math.min(config.maxSpreads, value));
    setSpreadCount(newValue);
  };

  const handleUniqueSpreadChange = (value: number) => {
    const newValue = Math.max(0, Math.min(spreadCount, value));
    setUniqueSpreadCount(newValue);
  };

  const handleStudentsChange = (value: number) => {
    setStudentsCount(value);
  };

  useEffect(() => {
    adjustUniqueSpreads();
  }, [spreadCount]);

  useEffect(() => {
    calculateTotalPrice();
  }, [spreadCount, uniqueSpreadCount, studentsCount, isPersonalCover, currentProductType]);

  const isPlusDisabled = !config.hasSpreads || spreadCount >= config.maxSpreads;
  const isMinusDisabled = !config.hasSpreads || spreadCount <= config.minSpreads;
  const isUniqPlusDisabled = !config.hasUniqueSpreads || uniqueSpreadCount >= spreadCount;
  const isUniqMinusDisabled = !config.hasUniqueSpreads || uniqueSpreadCount <= 0;

  const getPriceInfoText = () => {
    if (currentProductType === "photo") {
      return ` / фотография (минимум ${config.minPrice}₽)`;
    } else if (currentProductType === "calendar" || currentProductType === "vignette") {
        
      return ` / плакат (минимум ${config.minPrice}₽)`;
    } else {
      return ` / уникальный разворот (минимум ${config.minPrice}₽)`;
    }
  };

  return (
    <div className="price-block__left">
      <div className="new-calc">
        <div className="calc-card">
          
          <div className="option">
            <Swiper
              modules={[Navigation, FreeMode]}
              spaceBetween={20}
              slidesPerView={4.5}
              freeMode={true}
              navigation={false}
              breakpoints={{
                320: { slidesPerView: 2.2, spaceBetween: 10 },
                480: { slidesPerView: 2.2, spaceBetween: 10 },
                640: { slidesPerView: 2.5, spaceBetween: 12 },
                768: { slidesPerView: 3.8, spaceBetween: 15 },
                1024: { slidesPerView: 4.5, spaceBetween: 15 },
                1200: { slidesPerView: 4.5, spaceBetween: 20 }
              }}
              className="book-type-slider"
            >
              {Object.entries(productConfig).map(([type, product]) => (
                <SwiperSlide key={type}>
                  <div 
                    className={`book-card ${currentProductType === type ? 'active-card' : ''}`}
                    onClick={() => updateUIForProductType(type)}
                  >
                    <img 
                      src={`${getImageByType(type)}`} 
                      alt={getProductName(type)}
                    />
                    <p>{getProductName(type)}</p>
                    <span>от {product.minPrice} ₽</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {config.hasPersonalCover && (
            <div className="option" id="personalCoverOption">
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
          )}

          {config.hasSpreads && currentProductType !== "calendar" && currentProductType !== "vignette" && (
            <div className="group-option" id="spreadsGroup">
              <div className="option">
                <p className="label">{config.spreadLabel}</p>
                <div className="spread-control">
                  <button 
                    type="button" 
                    className="decrease"
                    disabled={isMinusDisabled}
                    onClick={() => handleSpreadChange(spreadCount - 1)}
                  >
                    –
                  </button>
                  <input 
                    type="number" 
                    value={spreadCount}
                    min={config.minSpreads}
                    max={config.maxSpreads}
                    onChange={(e) => handleSpreadChange(parseInt(e.target.value) || config.minSpreads)}
                  />
                  <button 
                    type="button" 
                    className="increase"
                    disabled={isPlusDisabled}
                    onClick={() => handleSpreadChange(spreadCount + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {config.hasUniqueSpreads && 
               currentProductType !== "photo" && 
               currentProductType !== "calendar" && 
               currentProductType !== "vignette" && (
                <div className="option">
                  <p className="label">{config.uniqueLabel}</p>
                  <div className="spread-control">
                    <button 
                      type="button" 
                      className="decrease"
                      disabled={isUniqMinusDisabled}
                      onClick={() => handleUniqueSpreadChange(uniqueSpreadCount - 1)}
                    >
                      –
                    </button>
                    <input 
                      type="number" 
                      value={uniqueSpreadCount}
                      min={0}
                      max={spreadCount}
                      onChange={(e) => handleUniqueSpreadChange(parseInt(e.target.value) || 0)}
                    />
                    <button 
                      type="button" 
                      className="increase"
                      disabled={isUniqPlusDisabled}
                      onClick={() => handleUniqueSpreadChange(uniqueSpreadCount + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {config.hasUniqueSpreads && (
            <div className="option" id="studentsOption">
              <label className="label">
                Количество учеников: <span>{studentsCount}</span>
              </label>
              <input 
                type="range" 
                min="5" 
                max="35" 
                value={studentsCount}
                className="range-slider"
                onChange={(e) => handleStudentsChange(parseInt(e.target.value))}
              />
            </div>
          )}

          <div className="option total flex">
            <p className="label">Стоимость за весь класс:</p>
            <p className="total-value">{totalPrice.toLocaleString('ru-RU')}₽</p>
          </div>
          
          {config.hasSpreads && (
            <div className="option prompt" id="priceInfo">
              <p>
                <strong>{config.pricePerSpread}₽</strong>
                {getPriceInfoText()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Вспомогательные функции
const getImageByType = (type: string): string => {
  const images: { [key: string]: string } = {
    album: '/img/лайфлат_картон_new.png',
    folder: '/img/трюмо_1_new.png',
    tablet: '/img/фотопапка_new.png',
    vignette: '/img/виньетка.png',
    calendar: '/img/календарь.png',
    photo: '/img/фотопечать.png'
  };
  return images[type] || '/img/фотопапка_new.png';
};

const getProductName = (type: string): string => {
  const names: { [key: string]: string } = {
    album: 'Альбом',
    folder: 'Трюмо',
    tablet: 'Планшет',
    vignette: 'Виньетка',
    calendar: 'Календарь',
    photo: 'Фотографии'
  };
  return names[type] || 'Фотографии';
};

export default PriceCalculator;