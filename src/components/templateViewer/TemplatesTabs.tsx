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
          baseUrl="https://mirramian.pixlpark.ru" 
          materialIds={[11519865]}
          pid={6748}
        />
      </TabItem>
    </Tabs>
  );
}