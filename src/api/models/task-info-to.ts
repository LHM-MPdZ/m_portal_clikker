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
/**
 * 
 * @export
 * @interface TaskInfoTO
 */
export interface TaskInfoTO {
    /**
     * 
     * @type {string}
     * @memberof TaskInfoTO
     */
    id: any;
    /**
     * 
     * @type {string}
     * @memberof TaskInfoTO
     */
    name: any;
    /**
     * 
     * @type {string}
     * @memberof TaskInfoTO
     */
    assignee: any;
    /**
     * 
     * @type {string}
     * @memberof TaskInfoTO
     */
    processInstanceId: any;
    /**
     * 
     * @type {string}
     * @memberof TaskInfoTO
     */
    status: TaskInfoTOStatusEnum;
    /**
     * 
     * @type {{ [key, string]: string;}}
     * @memberof TaskInfoTO
     */
    data?: any;
    /**
     * 
     * @type {string}
     * @memberof TaskInfoTO
     */
    description?: any;
    /**
     * 
     * @type {string}
     * @memberof TaskInfoTO
     */
    formKey?: any;
    /**
     * 
     * @type {Date}
     * @memberof TaskInfoTO
     */
    creationTime?: any;
}

/**
    * @export
    * @enum {string}
    */
export enum TaskInfoTOStatusEnum {
    AVAILABLE = 'AVAILABLE',
    PENDING = 'PENDING'
}
