/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { CompleteTaskTO } from '../models';
import { TaskInfoTO } from '../models';
/**
 * TaskControllerApi - axios parameter creator
 * @export
 */
export const TaskControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CompleteTaskTO} body 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        completeTask: async (body: CompleteTaskTO, id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling completeTask.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling completeTask.');
            }
            const localVarPath = `/rest/task/{id}/complete`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllTasks: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/rest/task`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} processinstanceId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllTasksByProcessInstance: async (processinstanceId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'processinstanceId' is not null or undefined
            if (processinstanceId === null || processinstanceId === undefined) {
                throw new RequiredError('processinstanceId','Required parameter processinstanceId was null or undefined when calling getAllTasksByProcessInstance.');
            }
            const localVarPath = `/rest/task/{processinstanceId}`
                .replace(`{${"processinstanceId"}}`, encodeURIComponent(String(processinstanceId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TaskControllerApi - functional programming interface
 * @export
 */
export const TaskControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CompleteTaskTO} body 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async completeTask(body: CompleteTaskTO, id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await TaskControllerApiAxiosParamCreator(configuration).completeTask(body, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllTasks(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TaskInfoTO>>> {
            const localVarAxiosArgs = await TaskControllerApiAxiosParamCreator(configuration).getAllTasks(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {string} processinstanceId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllTasksByProcessInstance(processinstanceId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TaskInfoTO>>> {
            const localVarAxiosArgs = await TaskControllerApiAxiosParamCreator(configuration).getAllTasksByProcessInstance(processinstanceId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * TaskControllerApi - factory interface
 * @export
 */
export const TaskControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {CompleteTaskTO} body 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        completeTask(body: CompleteTaskTO, id: string, options?: any): AxiosPromise<void> {
            return TaskControllerApiFp(configuration).completeTask(body, id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllTasks(options?: any): AxiosPromise<Array<TaskInfoTO>> {
            return TaskControllerApiFp(configuration).getAllTasks(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} processinstanceId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllTasksByProcessInstance(processinstanceId: string, options?: any): AxiosPromise<Array<TaskInfoTO>> {
            return TaskControllerApiFp(configuration).getAllTasksByProcessInstance(processinstanceId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TaskControllerApi - object-oriented interface
 * @export
 * @class TaskControllerApi
 * @extends {BaseAPI}
 */
export class TaskControllerApi extends BaseAPI {
    /**
     * 
     * @param {CompleteTaskTO} body 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TaskControllerApi
     */
    public completeTask(body: CompleteTaskTO, id: string, options?: any) {
        return TaskControllerApiFp(this.configuration).completeTask(body, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TaskControllerApi
     */
    public getAllTasks(options?: any) {
        return TaskControllerApiFp(this.configuration).getAllTasks(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {string} processinstanceId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TaskControllerApi
     */
    public getAllTasksByProcessInstance(processinstanceId: string, options?: any) {
        return TaskControllerApiFp(this.configuration).getAllTasksByProcessInstance(processinstanceId, options).then((request) => request(this.axios, this.basePath));
    }
}