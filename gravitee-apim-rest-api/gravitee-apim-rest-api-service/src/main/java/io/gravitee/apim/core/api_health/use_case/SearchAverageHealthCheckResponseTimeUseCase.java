/*
 * Copyright © 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.gravitee.apim.core.api_health.use_case;

import io.gravitee.apim.core.UseCase;
import io.gravitee.apim.core.api.crud_service.ApiCrudService;
import io.gravitee.apim.core.api.exception.ApiNotFoundException;
import io.gravitee.apim.core.api.exception.TcpProxyNotSupportedException;
import io.gravitee.apim.core.api.model.Api;
import io.gravitee.apim.core.api_health.model.AverageHealthCheckResponseTime;
import io.gravitee.apim.core.api_health.query_service.ApiHealthQueryService;
import java.time.Instant;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@UseCase
public class SearchAverageHealthCheckResponseTimeUseCase {

    private final ApiHealthQueryService apiHealthQueryService;
    private final ApiCrudService apiCrudService;

    public SearchAverageHealthCheckResponseTimeUseCase.Output execute(SearchAverageHealthCheckResponseTimeUseCase.Input input) {
        validateApiRequirements(input);

        var result = apiHealthQueryService.averageResponseTime(
            new ApiHealthQueryService.AverageHealthCheckResponseTimeQuery(
                input.organizationId,
                input.environmentId,
                input.apiId,
                input.group,
                input.from,
                input.to
            )
        );

        return new SearchAverageHealthCheckResponseTimeUseCase.Output(result);
    }

    private void validateApiRequirements(SearchAverageHealthCheckResponseTimeUseCase.Input input) {
        final Api api = apiCrudService.get(input.apiId);
        validateApiMultiTenancyAccess(api, input.environmentId);
        validateApiIsNotTcp(api);
    }

    private void validateApiIsNotTcp(Api api) {
        if (api.getApiDefinitionHttpV4().isTcpProxy()) {
            throw new TcpProxyNotSupportedException(api.getId());
        }
    }

    private static void validateApiMultiTenancyAccess(Api api, String environmentId) {
        if (!api.belongsToEnvironment(environmentId)) {
            throw new ApiNotFoundException(api.getId());
        }
    }

    public record Input(String organizationId, String environmentId, String apiId, String group, Instant from, Instant to) {}

    public record Output(Optional<AverageHealthCheckResponseTime> averageHealthCheckResponseTime) {}
}