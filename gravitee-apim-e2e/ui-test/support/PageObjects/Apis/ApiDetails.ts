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
// gio-submenu-item__title and gio-submenu-item for Design

class ApiDetails {
  policyStudioMenuItem(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.gio-submenu-item').contains('Policy Studio');
  }

  infoMenuItem(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.gio-submenu-item__title').contains('Info');
  }

  plansMenuItem(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.gio-submenu-item__title').contains('Plans');
  }
  notificationMenuItem(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.gio-submenu-item__title').contains('Notifications');
  }
}

export default ApiDetails;
