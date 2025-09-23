import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TemplateViewer from "@site/src/components/templateViewer/templateViewer";

export default function TemplatesTabs() {
  return (
    <Tabs>
      <TabItem value="ksenia" label="Ксения Федорова" default>
        <TemplateViewer 
          baseUrl="https://mirramian.pixlpark.ru" 
          materialIds={[11519865]}
          pid={6748}
        />
      </TabItem>
      <TabItem value="irina" label="Ирина Миронова">
        <TemplateViewer 
          baseUrl="https://mironova.pixlpark.ru"
          materialIds={[12536839]}
          pid={7193}
        />
      </TabItem>
      <TabItem value="Sergei" label="Сергей Степанов">
        <TemplateViewer 
          baseUrl="https://stepanov.pixlpark.ru"
          materialIds={[12659921]}
          pid={7248}
        />
      </TabItem>
    </Tabs>
  );
}