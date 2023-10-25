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
import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { DivHarness } from '@gravitee/ui-particles-angular/testing';

export class ApiDocumentationV4NavigationHeaderHarness extends ComponentHarness {
  public static hostSelector = 'api-documentation-navigation-header';

  private addNewFolderButtonLocator = this.locatorFor(MatButtonHarness.with({ text: 'Add new folder' }));
  public async clickAddNewFolder() {
    return this.addNewFolderButtonLocator().then((btn) => btn.click());
  }

  public async clickOnBreadcrumbItem(itemName: string) {
    return this.locatorFor(DivHarness.with({ text: itemName }))()
      .then((item) => item.host())
      .then((host) => host.click());
  }

  async getBreadcrumb(): Promise<string> {
    return this.locatorFor(DivHarness.with({ selector: '.header__breadcrumb' }))().then((el) => el.getText());
  }
}