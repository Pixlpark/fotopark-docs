import { useState, useEffect, useCallback } from 'react';

const TemplateViewer = ({ 
  baseUrl = 'https://demo.pixlpark.ru',
  materialIds = [3993968],
  pid = 1164
}) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (templateSet) => {
    setSelectedTemplate(templateSet);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  }, []);

  // Обработчик нажатия клавиши ESC
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

  // Обработчик клика вне модального окна
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="template-viewer">
      <div className="grid">
        {templates.map((template) => (
          <img
            key={template.Id}
            src={`${baseUrl}${template.CoverUrl}`}
            className="template"
            alt={`Шаблон ${template.Title}`}
            onClick={() => openModal(template)}
          />
        ))}
      </div>

      {isModalOpen && selectedTemplate && (
        <div className="modal" onClick={handleBackdropClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>
            <h2 className="modal-title">{selectedTemplate.Title || "Шаблон"}</h2>
            <div className="modal-images">
              {selectedTemplate.Templates.map((template) => (
                <img
                  key={template.Id}
                  src={`${baseUrl}/content/pxp-template-cover/${template.Id}.png?pid=${pid}&v=${template.Hash}&size=S`}
                  alt={`Шаблон ${template.Title}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateViewer;