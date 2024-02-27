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
import { isFunction } from 'lodash';

import { ApplicationSubscription, Subscription } from './subscription';

import { fakeApi } from '../api/Api.fixture';
import { fakeApplication } from '../application/Application.fixture';
import { fakePlan } from '../plan/plan.fixture';
import { fakeUser } from '../user/user.fixture';

export function fakeSubscription(modifier?: Partial<Subscription> | ((baseApi: Subscription) => Subscription)): Subscription {
  const date = new Date();
  const base: Subscription = {
    id: '45ff00ef-8256-3218-bf0d-b289735d84bb',
    api: fakeApi(),
    plan: fakePlan(),
    application: fakeApplication(),
    status: 'ACCEPTED',
    processed_at: date,
    processed_by: 'me',
    subscribed_by: fakeUser(),
    starting_at: date,
    created_at: date,
    updated_at: date,
    client_id: 'client_id',
  };

  if (isFunction(modifier)) {
    return modifier(base);
  }

  return {
    ...base,
    ...modifier,
  };
}

export function fakeApplicationSubscription(
  modifier?: Partial<ApplicationSubscription> | ((baseApi: ApplicationSubscription) => ApplicationSubscription),
): ApplicationSubscription {
  const date = new Date();
  const base: ApplicationSubscription = {
    id: '45ff00ef-8256-3218-bf0d-b289735d84bb',
    api: fakeApi().id,
    plan: fakePlan().id,
    application: fakeApplication().id,
    security: 'API_KEY',
    status: 'ACCEPTED',
    processed_at: date,
    processed_by: 'me',
    subscribed_by: fakeUser(),
    starting_at: date,
    created_at: date,
    updated_at: date,
  };

  if (isFunction(modifier)) {
    return modifier(base);
  }

  return {
    ...base,
    ...modifier,
  };
}
