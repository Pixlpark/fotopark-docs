import { useState, useEffect } from 'react';

const TemplateViewer = ({ 
  baseUrl = 'https://moyvipusknoy.ru',
  materialIds = [11721572],
  pid = 6830 // Новый пропс с значением по умолчанию
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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="template-viewer">
      <h2>Шаблоны</h2>
      <div className="grid">
        {templates.map((template) => (
          <img
            key={template.Id}
            src={`${baseUrl}${template.CoverUrl}`}
            className="template"
            alt={`Шаблон ${template.Name}`}
            onClick={() => openModal(template)}
          />
        ))}
      </div>

      {isModalOpen && selectedTemplate && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>
            <div className="modal-images">
              {selectedTemplate.Templates.map((template) => (
                <img
                  key={template.Id}
                  src={`${baseUrl}/content/pxp-template-cover/${template.Id}.png?pid=${pid}&v=${template.Hash}&size=S`}
                  alt={`Шаблон ${template.Name}`}
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