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
import { useState, useEffect, useCallback, CSSProperties } from 'react';

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
    <div style={styles.templateViewer}>
      {/* Добавляем глобальные стили */}
      <style>
        {`
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>

      <div style={styles.grid}>
        {templates.map((template) => {
          const imageId = `template-${template.Id}`;
          const isLoaded = loadedImages.has(imageId);
          
          return (
            <div key={template.Id} style={styles.templateWrapper}>
              {!isLoaded && <div style={styles.skeletonLoader}></div>}
              <img
                src={`${baseUrl}${template.CoverUrl}`}
                style={{
                  ...styles.template,
                  opacity: isLoaded ? 1 : 0
                }}
                alt={`Шаблон ${template.Title}`}
                onClick={() => openModal(template)}
                onLoad={() => handleImageLoad(imageId)}
                onError={() => handleImageError(imageId)}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {isModalOpen && selectedTemplate && (
        <div style={styles.modal} onClick={handleBackdropClick}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={closeModal}>
              ×
            </button>
            <h2 style={styles.modalTitle}>{selectedTemplate.Title || "Шаблон"}</h2>
            <div style={styles.modalImages}>
              {selectedTemplate.Templates.map((template) => {
                const modalImageId = `modal-template-${template.Id}`;
                const isModalLoaded = loadedImages.has(modalImageId);
                
                return (
                  <div key={template.Id} style={styles.modalImageWrapper}>
                    {!isModalLoaded && <div style={styles.skeletonLoader}></div>}
                    <img
                      src={`${baseUrl}/content/pxp-template-cover/${template.Id}.png?pid=${pid}&v=${template.Hash}&size=S`}
                      style={{
                        ...styles.modalImage,
                        opacity: isModalLoaded ? 1 : 0
                      }}
                      alt={`Шаблон ${template.Title}`}
                      onLoad={() => handleImageLoad(modalImageId)}
                      onError={() => handleImageError(modalImageId)}
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

// Стили в виде JavaScript объекта с правильными типами
const styles: { [key: string]: CSSProperties } = {
  templateViewer: {
    position: 'relative' as 'relative'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    padding: '20px'
  },
  templateWrapper: {
    position: 'relative' as 'relative',
    width: '100%',
    height: '200px',
    cursor: 'pointer',
    borderRadius: '8px',
    overflow: 'hidden' as 'hidden'
  },
  template: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as 'cover',
    borderRadius: '8px',
    transition: 'opacity 0.3s ease'
  },
  skeletonLoader: {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'loading 1.5s infinite',
    borderRadius: '8px'
  },
  modal: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflowY: 'auto' as 'auto',
    position: 'relative' as 'relative'
  },
  closeBtn: {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#333'
  },
  modalTitle: {
    marginBottom: '20px',
    textAlign: 'center' as 'center',
    color: '#333'
  },
  modalImages: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px'
  },
  modalImageWrapper: {
    position: 'relative' as 'relative',
    width: '100%',
    height: '150px'
  },
  modalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as 'cover',
    borderRadius: '6px',
    transition: 'opacity 0.3s ease'
  }
};

export default TemplateViewer;