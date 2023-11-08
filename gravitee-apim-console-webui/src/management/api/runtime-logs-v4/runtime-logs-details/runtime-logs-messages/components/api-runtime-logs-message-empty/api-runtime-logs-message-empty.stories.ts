/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Meta, moduleMetadata } from '@storybook/angular';
import { Story } from '@storybook/angular/dist/ts3.9/client/preview/types-7-0';

import { ApiRuntimeLogsMessageEmptyModule } from './api-runtime-logs-message-empty.module';
import { ApiRuntimeLogsMessageEmptyComponent } from './api-runtime-logs-message-empty.component';

export default {
  title: 'API / Logs / Messages / Empty',
  component: ApiRuntimeLogsMessageEmptyComponent,
  decorators: [
    moduleMetadata({
      imports: [ApiRuntimeLogsMessageEmptyModule],
    }),
  ],
  argTypes: {},
  render: (args) => ({
    template: `
      <div style="width: 800px">
        <api-runtime-logs-message-empty></api-runtime-logs-message-empty>
      </div>
    `,
    props: args,
  }),
} as Meta;

export const Default: Story = {};
Default.args = {};