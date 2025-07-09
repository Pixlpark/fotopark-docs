// import { useState, useEffect } from 'react';

// const TemplateViewer = () => {
//   const [templates, setTemplates] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       const apiUrl = 'https://moyvipusknoy.ru/api/templateSets';
//       const requestBody = {
//         materialTypeId: 0,
//         materialIds: [11721572],
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
//   }, []);

//   const openModal = (templateSet) => {
//     setSelectedTemplate(templateSet);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedTemplate(null);
//   };

//   return (
//     <div className="template-viewer">
//       <h2>Шаблоны</h2>
//       <div className="grid">
//         {templates.map((template) => (
//           <img
//             key={template.Id}
//             src={`https://moyvipusknoy.ru${template.CoverUrl}`}
//             className="template"
//             alt={`Шаблон ${template.Name}`}
//             onClick={() => openModal(template)}
//           />
//         ))}
//       </div>

//       {isModalOpen && selectedTemplate && (
//         <div className="modal">
//           <div className="modal-content">
//             <button className="close-btn" onClick={closeModal}>
//               ×
//             </button>
//             <div className="modal-images">
//               {selectedTemplate.Templates.map((template) => (
//                 <img
//                   key={template.Id}
//                   src={`https://moyvipusknoy.ru/content/pxp-template-cover/${template.Id}.png?pid=6830&v=${template.Hash}&size=S`}
//                   alt={`Шаблон ${template.Name}`}
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
import { useState, useEffect } from 'react';

const TemplateViewer = ({ 
  baseUrl = 'https://moyvipusknoy.ru',
  materialIds = [11721572]
}) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${baseUrl}/api/templateSets`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            materialTypeId: 0,
            materialIds,
            authorId: 0,
            languageId: 8166,
            ownType: 0,
            page: 0,
            pageSize: 50,
            tagIds: [],
            tagUrl: ""
          })
        });

        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }

        const data = await response.json();
        setTemplates(data.templates || []);
      } catch (err) {
        setError(err.message);
        console.error('Ошибка:', err);
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return <div className="loading">Загрузка шаблонов...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="template-viewer">
      <h2>Шаблоны</h2>
      
      {templates.length === 0 ? (
        <p>Нет доступных шаблонов</p>
      ) : (
        <>
          <div className="grid">
            {templates.map((template) => (
              <div key={template.Id} className="template-item">
                <img
                  src={`${baseUrl}${template.CoverUrl}`}
                  className="template-image"
                  alt={`Шаблон ${template.Name}`}
                  onClick={() => openModal(template)}
                />
                <p className="template-name">{template.Name}</p>
              </div>
            ))}
          </div>

          {isModalOpen && selectedTemplate && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>
                  &times;
                </button>
                <h3>{selectedTemplate.Name}</h3>
                <div className="template-preview">
                  {selectedTemplate.Templates.map((template) => (
                    <div key={template.Id} className="preview-item">
                      <img
                        src={`${baseUrl}/content/pxp-template-cover/${template.Id}.png?pid=6830&v=${template.Hash}&size=S`}
                        alt={`Шаблон ${template.Name}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TemplateViewer;