import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TemplateViewer from "@site/src/components/templateViewer/templateViewer";

export default function TemplatesTabs() { 
  return (
    <Tabs lazy>
      <TabItem value="ksenia" label="Ксения Федорова" default>
        <TemplateViewer 
          baseUrl="https://mirramian.pixlpark.ru" 
        />
      </TabItem>
      <TabItem value="irina" label="Ирина Миронова">
        <TemplateViewer 
          baseUrl="https://mironova.pixlpark.ru"
        />
      </TabItem>
      <TabItem value="Sergei" label="ОбложкиТУТ.рф">
        <TemplateViewer 
          baseUrl="https://stepanov.pixlpark.ru"
        />
      </TabItem>
      <TabItem value="Yulia" label="Юлия Сорокина">
        <TemplateViewer 
          baseUrl="https://sorokina.pixlpark.ru"
        />
      </TabItem>
      <TabItem value="Natalya" label="Наталья Столярова">
        <TemplateViewer 
          baseUrl="https://natalybook.pixlpark.ru"
        />
      </TabItem>
    </Tabs>
  );
}