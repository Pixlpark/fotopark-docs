// import { useState, useEffect, useCallback } from 'react';

// const TemplateViewer = ({ 
//   baseUrl = 'https://demo.pixlpark.ru',
//   materialIds = [3993968],
//   pid = 1164
// }) => {
//   const [templates, setTemplates] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       const apiUrl = `${baseUrl}/api/templateSets`;
//       const requestBody = {
//         materialTypeId: 0,
//         materialIds,
//         authorId: 0,
//         languageId: 8166,
//         ownType: 0,
//         page: 0,
//         pageSize: 50,
//         tagIds: [],
//         tagUrl: ""
//       };

//       try {
//         const response = await fetch(apiUrl, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(requestBody)
//         });
//         const data = await response.json();
//         setTemplates(data.templates || []);
//       } catch (err) {
//         console.error('Ошибка загрузки шаблонов:', err);
//       }
//     };

//     fetchTemplates();
//   }, [baseUrl, materialIds]);

//   const openModal = (templateSet) => {
//     setSelectedTemplate(templateSet);
//     setIsModalOpen(true);
//   };

//   const closeModal = useCallback(() => {
//     setIsModalOpen(false);
//     setSelectedTemplate(null);
//   }, []);

//   // Обработчик нажатия клавиши ESC
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') {
//         closeModal();
//       }
//     };

//     if (isModalOpen) {
//       document.addEventListener('keydown', handleKeyDown);
//     }

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [isModalOpen, closeModal]);

//   // Обработчик клика вне модального окна
//   const handleBackdropClick = (event) => {
//     if (event.target === event.currentTarget) {
//       closeModal();
//     }
//   };

//   return (
//     <div className="template-viewer">
//       <div className="grid">
//         {templates.map((template) => (
//           <img
//             key={template.Id}
//             src={`${baseUrl}${template.CoverUrl}`}
//             className="template"
//             alt={`Шаблон ${template.Title}`}
//             onClick={() => openModal(template)}
//           />
//         ))}
//       </div>

//       {isModalOpen && selectedTemplate && (
//         <div className="modal" onClick={handleBackdropClick}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-btn" onClick={closeModal}>
//               ×
//             </button>
//             <h2 className="modal-title">{selectedTemplate.Title || "Шаблон"}</h2>
//             <div className="modal-images">
//               {selectedTemplate.Templates.map((template) => (
//                 <img
//                   key={template.Id}
//                   src={`${baseUrl}/content/pxp-template-cover/${template.Id}.png?pid=${pid}&v=${template.Hash}&size=S`}
//                   alt={`Шаблон ${template.Title}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TemplateViewer;
import { useState, useEffect, useCallback } from 'react';

const TemplateViewer = ({ 
  baseUrl = 'https://demo.pixlpark.ru',
  materialIds = [3993968],
  pid = 1164
}) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());

  useEffect(() => {
    const fetchTemplates = async () => {
      const apiUrl = `${baseUrl}/api/templateSets`;
      const requestBody = {
        materialTypeId: 0,
        materialIds,
        authorId: 0,
        languageId: 8166,
        ownType: 0,
        page: 0,
        pageSize: 50,
        tagIds: [],
        tagUrl: ""
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        setTemplates(data.templates || []);
      } catch (err) {
        console.error('Ошибка загрузки шаблонов:', err);
      }
    };

    fetchTemplates();
  }, [baseUrl, materialIds]);

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  };

  const handleImageError = (imageId) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
    console.error('Ошибка загрузки изображения:', imageId);
  };

  const openModal = (templateSet) => {
    setSelectedTemplate(templateSet);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, closeModal]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="template-viewer">
      <div className="grid">
        {templates.map((template) => {
          const imageId = `template-${template.Id}`;
          const isLoaded = loadedImages.has(imageId);
          
          return (
            <div key={template.Id} style={{ position: 'relative' }}>
              <div className={`template-loader ${isLoaded ? '' : 'active'}`}></div>
              <img
                key={template.Id}
                src={`${baseUrl}${template.CoverUrl}`}
                className={`template ${isLoaded ? 'loaded' : ''}`}
                alt={`Шаблон ${template.Title}`}
                onClick={() => openModal(template)}
                onLoad={() => handleImageLoad(imageId)}
                onError={() => handleImageError(imageId)}
                loading="lazy"
                style={{ position: 'relative', zIndex: 1 }}
              />
            </div>
          );
        })}
      </div>

      {isModalOpen && selectedTemplate && (
        <div className="modal" onClick={handleBackdropClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>
            <h2 className="modal-title">{selectedTemplate.Title || "Шаблон"}</h2>
            <div className="modal-images">
              {selectedTemplate.Templates.map((template) => {
                const modalImageId = `modal-template-${template.Id}`;
                const isModalLoaded = loadedImages.has(modalImageId);
                
                return (
                  <div key={template.Id} style={{ position: 'relative' }}>
                    <div className={`modal-image-loader ${isModalLoaded ? '' : 'active'}`}></div>
                    <img
                      key={template.Id}
                      src={`${baseUrl}/content/pxp-template-cover/${template.Id}.png?pid=${pid}&v=${template.Hash}&size=S`}
                      className={isModalLoaded ? 'loaded' : ''}
                      alt={`Шаблон ${template.Title}`}
                      onLoad={() => handleImageLoad(modalImageId)}
                      onError={() => handleImageError(modalImageId)}
                      style={{ position: 'relative', zIndex: 1 }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateViewer;