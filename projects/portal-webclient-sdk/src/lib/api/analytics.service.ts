/**
 * Gravitee.io Portal Rest API
 * API dedicated to the devportal part of Gravitee
 *
 * The version of the OpenAPI document: 3.0.0
 * Contact: contact@graviteesource.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { CountAnalytics, DateHistoAnalytics, GroupByAnalytics } from '../model/models';
import { ErrorResponse } from '../model/errorResponse';
import { Log } from '../model/log';
import { LogsResponse } from '../model/logsResponse';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


export interface ExportApplicationLogsByApplicationIdRequestParams {
    applicationId: string;
    page?: number;
    size?: number;
    from?: number;
    to?: number;
    query?: string;
    field?: string;
    order?: 'ASC' | 'DESC';
}

export interface GetApplicationAnalyticsRequestParams {
    applicationId: string;
    page?: number;
    size?: number;
    from?: number;
    to?: number;
    interval?: number;
    query?: string;
    field?: string;
    type?: 'GROUP_BY' | 'DATE_HISTO' | 'COUNT' | 'STATS';
    ranges?: string;
    aggs?: string;
    order?: string;
}

export interface GetApplicationLogByApplicationIdAndLogIdRequestParams {
    applicationId: string;
    logId: string;
    timestamp?: number;
}

export interface GetApplicationLogsRequestParams {
    applicationId: string;
    page?: number;
    size?: number;
    from?: number;
    to?: number;
    query?: string;
    field?: string;
    order?: 'ASC' | 'DESC';
}


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

    protected basePath = 'http://localhost:8083/portal/environments/DEFAULT';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    /**
     * Export application logs as CSV
     * Export application logs as CSV.  User must have the APPLICATION_LOG[READ] permission.
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public exportApplicationLogsByApplicationId(requestParameters: ExportApplicationLogsByApplicationIdRequestParams, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public exportApplicationLogsByApplicationId(requestParameters: ExportApplicationLogsByApplicationIdRequestParams, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public exportApplicationLogsByApplicationId(requestParameters: ExportApplicationLogsByApplicationIdRequestParams, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public exportApplicationLogsByApplicationId(requestParameters: ExportApplicationLogsByApplicationIdRequestParams, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling exportApplicationLogsByApplicationId.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        const from = requestParameters.from;
        const to = requestParameters.to;
        const query = requestParameters.query;
        const field = requestParameters.field;
        const order = requestParameters.order;

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', <any>size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', <any>from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', <any>to);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', <any>query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', <any>field);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', <any>order);
        }

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<string>(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/logs/_export`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Application analytics
     * Get the application analytics.  User must have the APPLICATION_ANALYTICS[READ] permission.
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getApplicationAnalytics(requestParameters: GetApplicationAnalyticsRequestParams, observe?: 'body', reportProgress?: boolean): Observable<DateHistoAnalytics | GroupByAnalytics | CountAnalytics>;
    public getApplicationAnalytics(requestParameters: GetApplicationAnalyticsRequestParams, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DateHistoAnalytics | GroupByAnalytics | CountAnalytics>>;
    public getApplicationAnalytics(requestParameters: GetApplicationAnalyticsRequestParams, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DateHistoAnalytics | GroupByAnalytics | CountAnalytics>>;
    public getApplicationAnalytics(requestParameters: GetApplicationAnalyticsRequestParams, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationAnalytics.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        const from = requestParameters.from;
        const to = requestParameters.to;
        const interval = requestParameters.interval;
        const query = requestParameters.query;
        const field = requestParameters.field;
        const type = requestParameters.type;
        const ranges = requestParameters.ranges;
        const aggs = requestParameters.aggs;
        const order = requestParameters.order;

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', <any>size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', <any>from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', <any>to);
        }
        if (interval !== undefined && interval !== null) {
            queryParameters = queryParameters.set('interval', <any>interval);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', <any>query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', <any>field);
        }
        if (type !== undefined && type !== null) {
            queryParameters = queryParameters.set('type', <any>type);
        }
        if (ranges !== undefined && ranges !== null) {
            queryParameters = queryParameters.set('ranges', <any>ranges);
        }
        if (aggs !== undefined && aggs !== null) {
            queryParameters = queryParameters.set('aggs', <any>aggs);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', <any>order);
        }

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<DateHistoAnalytics | GroupByAnalytics | CountAnalytics>(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/analytics`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a specific log of an application
     * Get a specific log of an application.  User must have the APPLICATION_LOG[READ] permission.
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getApplicationLogByApplicationIdAndLogId(requestParameters: GetApplicationLogByApplicationIdAndLogIdRequestParams, observe?: 'body', reportProgress?: boolean): Observable<Log>;
    public getApplicationLogByApplicationIdAndLogId(requestParameters: GetApplicationLogByApplicationIdAndLogIdRequestParams, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Log>>;
    public getApplicationLogByApplicationIdAndLogId(requestParameters: GetApplicationLogByApplicationIdAndLogIdRequestParams, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Log>>;
    public getApplicationLogByApplicationIdAndLogId(requestParameters: GetApplicationLogByApplicationIdAndLogIdRequestParams, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        const logId = requestParameters.logId;
        if (logId === null || logId === undefined) {
            throw new Error('Required parameter logId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        const timestamp = requestParameters.timestamp;

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (timestamp !== undefined && timestamp !== null) {
            queryParameters = queryParameters.set('timestamp', <any>timestamp);
        }

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<Log>(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/logs/${encodeURIComponent(String(logId))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Application logs
     * Get the application logs.  User must have the APPLICATION_LOG[READ] permission.
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getApplicationLogs(requestParameters: GetApplicationLogsRequestParams, observe?: 'body', reportProgress?: boolean): Observable<LogsResponse>;
    public getApplicationLogs(requestParameters: GetApplicationLogsRequestParams, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<LogsResponse>>;
    public getApplicationLogs(requestParameters: GetApplicationLogsRequestParams, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<LogsResponse>>;
    public getApplicationLogs(requestParameters: GetApplicationLogsRequestParams, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogs.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        const from = requestParameters.from;
        const to = requestParameters.to;
        const query = requestParameters.query;
        const field = requestParameters.field;
        const order = requestParameters.order;

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', <any>size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', <any>from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', <any>to);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', <any>query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', <any>field);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', <any>order);
        }

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<LogsResponse>(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/logs`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
