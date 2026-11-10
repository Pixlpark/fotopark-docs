import { useState, useEffect, useCallback } from 'react';

interface TemplatePreview {
  Id: number;
  PreviewUrl: string;
}

interface TemplateSet {
  Id: number;
  Title: string;
  CoverThumbnailUrl: string;
  Templates: TemplatePreview[];
}

interface TemplatesResponse {
  templates: TemplateSet[];
}

const TemplateViewer = ({ baseUrl = 'https://demo.pixlpark.ru' }: { baseUrl?: string }) => {
  const [templates, setTemplates] = useState<TemplateSet[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateSet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setTemplates([]);
    setSelectedTemplate(null);
    setIsLoading(true);
    setHasError(false);

    const fetchTemplates = async () => {
      try {
        const response = await fetch(new URL('/api/templateSets/graduation', baseUrl));
        if (!response.ok) throw new Error(`Template request failed: ${response.status}`);
        const data: TemplatesResponse = await response.json();
        if (!Array.isArray(data.templates)) throw new Error('Invalid template response');
        if (active) setTemplates(data.templates);
      } catch (error) {
        if (active) {
          console.error('Template request failed:', error);
          setHasError(true);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    void fetchTemplates();
    return () => { active = false; };
  }, [baseUrl, attempt]);

  const closeModal = useCallback(() => setSelectedTemplate(null), []);

  useEffect(() => {
    if (!selectedTemplate) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedTemplate, closeModal]);

  return (
    <div className="template-viewer">
      <div className="grid">
        {templates.map((template, index) => (
          <div key={template.Id} className="grid-item">
            <div className="grid-img">
              <img
                src={new URL(template.CoverThumbnailUrl, baseUrl).href}
                className="template"
                loading={index < 4 ? 'eager' : 'lazy'}
                fetchPriority={index < 4 ? 'high' : 'low'}
                decoding="async"
                alt={template.Title}
                onClick={() => setSelectedTemplate(template)}
              />
            </div>
            <span className="template-title">{template.Title}</span>
          </div>
        ))}
      </div>

      {isLoading && <div className="loading" role="status">{'Загрузка шаблонов...'}</div>}
      {hasError && (
        <div role="alert">
          <p>{'Не удалось загрузить шаблоны. Попробуйте ещё раз.'}</p>
          <button type="button" onClick={() => setAttempt(value => value + 1)}>
            {'Повторить загрузку'}
          </button>
        </div>
      )}
      {!isLoading && !hasError && templates.length === 0 && (
        <p>{'Шаблоны не найдены.'}</p>
      )}

      {selectedTemplate && (
        <div className="modal" onClick={event => {
          if (event.target === event.currentTarget) closeModal();
        }}>
          <div className="modal-content" onClick={event => event.stopPropagation()}>
            <button type="button" className="close-btn" onClick={closeModal}
              aria-label={'Закрыть'}>
              ×
            </button>
            <h2 className="modal-title">{selectedTemplate.Title || 'Шаблон'}</h2>
            <div className="modal-images">
              {selectedTemplate.Templates.map((template, index) => (
                <img
                  key={template.Id}
                  src={new URL(template.PreviewUrl, baseUrl).href}
                  alt={selectedTemplate.Title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
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
