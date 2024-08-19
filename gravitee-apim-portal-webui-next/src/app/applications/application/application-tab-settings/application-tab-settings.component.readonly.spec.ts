/*
 * Copyright (C) 2024 The Gravitee team (http://gravitee.io)
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
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ApplicationTabSettingsReadHarness } from './application-tab-settings-read/application-tab-settings-read.harness';
import { ApplicationTabSettingsComponent } from './application-tab-settings.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import {
  fakeApplication,
  fakeBackendToBackendApplicationType,
  fakeBrowserApplicationType,
  fakeNativeApplicationType,
  fakeSimpleApplicationType,
  fakeWebApplicationType,
} from '../../../../entities/application/application.fixture';
import { fakeUserApplicationPermissions } from '../../../../entities/permission/permission.fixtures';
import { ConfigService } from '../../../../services/config.service';
import { AppTestingModule, TESTING_BASE_URL } from '../../../../testing/app-testing.module';

describe('ApplicationTabSettingsComponent', () => {
  let component: ApplicationTabSettingsComponent;
  let fixture: ComponentFixture<ApplicationTabSettingsComponent>;
  let httpTestingController: HttpTestingController;
  let loader: HarnessLoader;
  let readonlyHarness: ApplicationTabSettingsReadHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationTabSettingsComponent, DeleteConfirmDialogComponent, HttpClientModule, NoopAnimationsModule, AppTestingModule],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            baseURL: TESTING_BASE_URL,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationTabSettingsComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    loader = TestbedHarnessEnvironment.loader(fixture);

    component = fixture.componentInstance;
    component.userApplicationPermissions = fakeUserApplicationPermissions({
      DEFINITION: ['R'],
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('Display a simple application', () => {
    const simpleApplication = fakeApplication({
      name: 'Simple application',
      description: 'Simple description',
      picture: 'data:image/png;base64,xxxxxxxx',
      applicationType: 'SIMPLE',
      settings: {
        oauth: undefined,
        app: {
          type: 'Custom Application Type',
          client_id: 'Custom Client ID',
        },
      },
    });

    beforeEach(async () => {
      component.application = simpleApplication;
      component.applicationTypeConfiguration = fakeSimpleApplicationType();
      fixture.detectChanges();
      readonlyHarness = await loader.getHarness(ApplicationTabSettingsReadHarness);
    });

    it('Should display name, description, picture, client ID & application type fields', async () => {
      expect(await readonlyHarness.getInfoCardTitle()).toEqual('OAuth2 Integration');
      expect(await readonlyHarness.getInfoCardApplicationType()).toEqual('Application type');
      expect(await readonlyHarness.getInfoCardApplicationTypeDescription()).toEqual('Custom Application Type');
      expect(await readonlyHarness.getClientId()).toEqual('Custom Client ID');
      expect(await readonlyHarness.getHiddenClientSecret()).toBeUndefined();
      expect(await readonlyHarness.getInfoCardRedirectUris()).toBeUndefined();
      expect(await readonlyHarness.getInfoCardGrantTypes()).toBeUndefined();
    });
  });

  describe('Display Backend to backend Application', () => {
    const b2bApplication = fakeApplication({
      name: 'B2b application',
      description: 'B2b description',
      picture: 'data:image/png;base64,xxxxxxxx',
      applicationType: 'BACKEND_TO_BACKEND',
      settings: {
        oauth: {
          client_id: 'my client id',
          client_secret: 'my client secret',
          redirect_uris: [],
          response_types: [],
          grant_types: ['client_credentials'],
          renew_client_secret_supported: false,
        },
        app: undefined,
      },
    });

    beforeEach(async () => {
      component.application = b2bApplication;
      component.applicationTypeConfiguration = fakeBackendToBackendApplicationType();
      fixture.detectChanges();
      readonlyHarness = await loader.getHarness(ApplicationTabSettingsReadHarness);
    });

    it('Should display name, description, picture, client ID, client secret & grant types fields', async () => {
      expect(await readonlyHarness.getInfoCardTitle()).toEqual('OpenID Connect Integration');
      expect(await readonlyHarness.getInfoCardApplicationType()).toEqual('Backend to backend');
      expect(await readonlyHarness.getInfoCardApplicationTypeDescription()).toEqual('Machine to machine');
      expect(await readonlyHarness.getInfoCardGrantTypes()).toEqual('Client Credentials');
      expect(await readonlyHarness.getClientId()).toEqual('my client id');
      expect(await readonlyHarness.getHiddenClientSecret()).toEqual('****************');
      expect(await readonlyHarness.getClearClientSecret()).toEqual('my client secret');
      expect(await readonlyHarness.getInfoCardRedirectUris()).toBeUndefined();
    });
  });

  describe('Display Native Application', () => {
    const nativeApplication = fakeApplication({
      name: 'Native application',
      description: 'Native description',
      picture: 'data:image/png;base64,xxxxxxxx',
      applicationType: 'NATIVE',
      settings: {
        oauth: {
          client_id: 'my client id',
          client_secret: 'my client secret',
          redirect_uris: ['http://localhost/native'],
          response_types: ['code'],
          grant_types: ['authorization_code'],
          renew_client_secret_supported: false,
        },
        app: undefined,
      },
    });

    beforeEach(async () => {
      component.application = nativeApplication;
      component.applicationTypeConfiguration = fakeNativeApplicationType();
      fixture.detectChanges();
      readonlyHarness = await loader.getHarness(ApplicationTabSettingsReadHarness);
    });

    it('Should display name, description, picture, client ID, client secret, redirect URIs & grant types fields', async () => {
      expect(await readonlyHarness.getInfoCardTitle()).toEqual('OpenID Connect Integration');
      expect(await readonlyHarness.getInfoCardApplicationType()).toEqual('Native');
      expect(await readonlyHarness.getInfoCardApplicationTypeDescription()).toEqual('iOS, Android, ...');
      expect(await readonlyHarness.getInfoCardGrantTypes()).toEqual('Authorization Code');
      expect(await readonlyHarness.getClientId()).toEqual('my client id');
      expect(await readonlyHarness.getHiddenClientSecret()).toEqual('****************');
      expect(await readonlyHarness.getClearClientSecret()).toEqual('my client secret');
      expect(await readonlyHarness.getInfoCardRedirectUris()).toEqual('http://localhost/native');
    });
  });

  describe('Display Browser Application', () => {
    const browserApplication = fakeApplication({
      name: 'Browser application',
      description: 'Browser description',
      picture: 'data:image/png;base64,xxxxxxxx',
      applicationType: 'BROWSER',
      settings: {
        oauth: {
          client_id: 'my client id',
          client_secret: 'my client secret',
          redirect_uris: ['http://localhost/browser'],
          response_types: ['code', 'token', 'id_token'],
          grant_types: ['authorization_code', 'implicit'],
          renew_client_secret_supported: false,
        },
        app: undefined,
      },
    });

    beforeEach(async () => {
      component.application = browserApplication;
      component.applicationTypeConfiguration = fakeBrowserApplicationType();
      fixture.detectChanges();
      readonlyHarness = await loader.getHarness(ApplicationTabSettingsReadHarness);
    });

    it('Should display name, description, picture, client ID, client secret, redirect URIs & grant types fields', async () => {
      expect(await readonlyHarness.getInfoCardTitle()).toEqual('OpenID Connect Integration');
      expect(await readonlyHarness.getInfoCardApplicationType()).toEqual('SPA');
      expect(await readonlyHarness.getInfoCardApplicationTypeDescription()).toEqual('Angular, React, Ember, ...');
      expect(await readonlyHarness.getInfoCardGrantTypes()).toEqual('Authorization Code,Implicit');
      expect(await readonlyHarness.getClientId()).toEqual('my client id');
      expect(await readonlyHarness.getHiddenClientSecret()).toEqual('****************');
      expect(await readonlyHarness.getClearClientSecret()).toEqual('my client secret');
      expect(await readonlyHarness.getInfoCardRedirectUris()).toEqual('http://localhost/browser');
    });
  });

  describe('Display Web Application', () => {
    const webApplication = fakeApplication({
      name: 'Web application',
      description: 'Web description',
      picture: 'data:image/png;base64,xxxxxxxx',
      applicationType: 'WEB',
      settings: {
        oauth: {
          client_id: 'my client id',
          client_secret: 'my client secret',
          redirect_uris: ['http://localhost/web'],
          response_types: ['code'],
          grant_types: ['authorization_code'],
          renew_client_secret_supported: false,
        },
        app: undefined,
      },
    });

    beforeEach(async () => {
      component.application = webApplication;
      component.applicationTypeConfiguration = fakeWebApplicationType();
      fixture.detectChanges();
      readonlyHarness = await loader.getHarness(ApplicationTabSettingsReadHarness);
    });

    it('Should display name, description, picture, client ID, client secret, redirect URIs & grant types fields', async () => {
      expect(await readonlyHarness.getInfoCardTitle()).toEqual('OpenID Connect Integration');
      expect(await readonlyHarness.getInfoCardApplicationType()).toEqual('Web');
      expect(await readonlyHarness.getInfoCardApplicationTypeDescription()).toEqual('Java, .Net, ...');
      expect(await readonlyHarness.getInfoCardGrantTypes()).toEqual('Authorization Code');
      expect(await readonlyHarness.getClientId()).toEqual('my client id');
      expect(await readonlyHarness.getHiddenClientSecret()).toEqual('****************');
      expect(await readonlyHarness.getClearClientSecret()).toEqual('my client secret');
      expect(await readonlyHarness.getInfoCardRedirectUris()).toEqual('http://localhost/web');
    });
  });
});