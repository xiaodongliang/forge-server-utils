import { Region } from './common';
import { ForgeClient, IAuthOptions } from './common';

const ReadTokenScopes = ['data:read', 'account:read'];
const WriteTokenScopes = ['data:write'];
const PageSize = 64;

interface IHub {
    id: string;

    name?: string;
    region?: string;
    extension?: object;
}

interface IProject {
    id: string;

    name?: string;
    scopes?: string[];
    extension?: object;
}

interface IFolder {
    id: string;

    name?: string; // The name of the folder.
    displayName?: string; // Note that this field is reserved for future releases and should not be used. Use attributes.name for the folder name.
    objectCount?: number; // The number of objects inside the folder.
    createTime?: string; // The time the folder was created, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    createUserId?: string; // The unique identifier of the user who created the folder.
    createUserName?: string; // The name of the user who created the folder.
    lastModifiedTime?: string; // The last time the folder was modified, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    lastModifiedUserId?: string; // The unique identifier of the user who last modified the folder.
    lastModifiedUserName?: string; // The name of the user who last modified the folder.
    hidden?: boolean; // The folder’s current visibility state.
    extension?: object; // The extension object of the data.
}

interface IItem {
    id: string;
    type: string;

    extension?: object;
}

interface IItemDetails {
    id: string;
    type: string;

    displayName?: string; // Displayable name of an item.
    createTime?: string; // The time the item was created, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    createUserId?: string; // The unique identifier of the user who created the item.
    createUserName?: string; // The name of the user who created the item.
    lastModifiedTime?: string; // The last time the item was modified, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    lastModifiedUserId?: string; // The unique identifier of the user who last modified the item.
    lastModifiedUserName?: string; // The name of the user who last modified the item.
    hidden?: boolean; // true if the file has been deleted. false if the file has not been deleted.
    reserved?: boolean; // Indicates the availability of the file. A reserved file can only be modified by the user that reserved it.
    reservedTime?: string; // The time the item was reserved.
    reservedUserId?: string; // The unique identifier of the user who reserved the item.
    reservedUserName?: string; // The name of the user who reserved the item.
    pathInProject?: string; // The relative path of the item starting from project’s root folder.
    extension?: object;
    derivative?: string; // URN of viewable
    storage?: string; // storage ID
}

interface IVersion {
    id: string;
    type: string;

    name?: string; // The filename used when synced to local disk.
    displayName?: string; // Displayable name of the version.
    derivative?: string; // URN of viewable for given version
    versionNumber?: number; // Version number of this versioned file.
    mimeType?: string; // Mimetype of the version’s content.
    fileType?: string; // File type, only present if this version represents a file.
    storage?: number; // Storage ID for given file verison.
    storageSize?: number; // File size in bytes, only present if this version represents a file.
    createTime?: string; // The time that the resource was created at.
    createUserId?: string; // The userId that created the resource.
    createUserName?: string; // The username that created the resource.
    lastModifiedTime?: string; // The time that the resource was last modifed.
    lastModifiedUserId?: string; // The userId that last modified the resource.
    lastModifiedUserName?: string; // The username that last modified the resource.
    extension?: object; // The extension object of the data.
}

interface IIssue {
    id: string; // Unique issue ID. Can be used in other API calls.
    answer?: string; // The suggested answer for the issue.
    answered_at?: string; // The date and time the issue was answered, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    answered_by?: string; // The user who suggested an answer for the issue.
    assigned_to_type?: string; // The type of subject this issue is assigned to. Possible values: user, company, role.
    assigned_to?: string; // The Autodesk ID of the user, role, or company the issue was assigned to.
    attachment_count?: number; // The number of attachments added to the issue.
    attachments_attributes?: any[];
    close_version?: string; // The version of the issue when it was closed.
    closed_at?: string; // The timestamp of the data and time the issue was closed, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    closed_by?: string; // The Autodesk ID of the user who closed the issue.
    collection_urn?: string;
    comment_count?: number; // The number of comments added to the issue.
    comments_attributes?: any[];
    created_at?: string; // The timestamp of the client when the issue was created, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    created_by?: string; // The Autodesk ID of the user who created the issue.
    custom_attributes?: any[];
    description?: string; // The description of the purpose of the issue.
    due_date?: string; // The timestamp of the issue’s specified due date, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    identifier?: number; // The identifier of the issue.
    issue_sub_type?: number;
    issue_type_id?: string;
    issue_type?: number;
    lbs_location?: string; // The ID of the location that relates to the issue.
    location_description?: string; // The location of the issue.
    markup_metadata?: string;
    ng_issue_subtype_id?: string; // The ID of the issue subtype. To find the issue subtype that corresponds to the ID, call GET ng-issue-types, with the include=subtypes query string parameter.
    ng_issue_type_id?: string; // The ID of the issue type. To find the issue type that corresponds to the ID, call GET ng-issue-types. (Note that issues that were created in the Document issues module prior to the release of the latest version of the Issues API, are automatically assigned the design issue type. For more details, see the changelog.)
    owner?: string; // The Autodesk ID of the user who owns this issue.
    permitted_attributes?: any[]; // A list of attributes accessible to the current user.
    permitted_statuses?: any[]; // A list of statuses accessible to the current user.
    pushpin_attributes?: object; // The type and location of the pushpin. Only relevant for pushpin issues. A pushpin is a visual marker that denotes the location of a issue in a document.
    quality_urns?: object; // The resource in the Checklists service that this issue is related to.
    resource_urns?: object;
    root_cause_id?: string; // The ID of the type of root cause for the issue. To verify the type of root cause, see GET root-causes.
    root_cause?: string;
    sheet_metadata?: object; // Information about the document associated with the pushpin issue. Only relevant for pushpin issues. A pushpin is a visual marker that denotes the location of a issue in a document.
    snapshot_urn?: string;
    starting_version?: number; // The first version of the issue.
    status?: string; // The current status of the issue. Possible values: draft, open, close.
    synced_at?: string; // The timestamp of the server when the issue was created, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    tags?: object
    target_urn_page?: string;
    target_urn?: string; // The item ID of the document associated with the issue. Identifies whether this is a pushpin issue or a project-related issue. A pushpin is a visual marker that denotes the location of an issue in a document. A project-related issue is assigned a null value, and a pushpin issue is assigned the item ID of the document associated with the pushpin.
    title?: string; // The title of the issue.
    trades?: any[];
    updated_at?: string; // The last time the issue’s attributes were updated, in the following format: YYYY-MM-DDThh:mm:ss.sz.
}

interface INewIssue {
    title: string; // The title of the issue.
    ng_issue_subtype_id: string; // The ID of the issue subtype. To find the issue subtype that corresponds to the ID, call GET ng-issue-types, with the include=subtypes query string parameter.
    ng_issue_type_id: string; // The ID of the issue type. To find the issue type that corresponds to the ID, call GET ng-issue-types. (Note that issues that were created in the Document issues module prior to the release of the latest version of the Issues API, are automatically assigned the design issue type. For more details, see the changelog.)

    description?: string; // The description of the purpose of the issue.
    status?: string; // The current status of the issue. Possible values: draft, open, close.
    starting_version?: number; // The first version of the issue.
    due_date?: string; // The timestamp of the issue’s specified due date, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    location_description?: string; // The location of the issue.
    created_at?: string; // The timestamp of the client when the issue was created, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    lbs_location?: string; // The ID of the location that relates to the issue.
    assigned_to_type?: string; // The type of subject this issue is assigned to. Possible values: user, company, role.
    assigned_to?: string; // The Autodesk ID of the user, role, or company the issue was assigned to.
    owner?: string; // The Autodesk ID of the user who owns this issue.
    root_cause_id?: string; // The ID of the type of root cause for the issue. To verify the type of root cause, see GET root-causes.
    quality_urns?: object; // The resource in the Checklists service that this issue is related to.
}

interface IUpdateIssue {
    title: string; // The title of the issue.

    ng_issue_subtype_id?: string; // The ID of the issue subtype. To find the issue subtype that corresponds to the ID, call GET ng-issue-types, with the include=subtypes query string parameter.
    ng_issue_type_id?: string; // The ID of the issue type. To find the issue type that corresponds to the ID, call GET ng-issue-types. (Note that issues that were created in the Document issues module prior to the release of the latest version of the Issues API, are automatically assigned the design issue type. For more details, see the changelog.)
    description?: string; // The description of the purpose of the issue.
    status?: string; // The current status of the issue. Possible values: draft, open, close.
    starting_version?: number; // The first version of the issue.
    due_date?: string; // The timestamp of the issue’s specified due date, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    location_description?: string; // The location of the issue.
    created_at?: string; // The timestamp of the client when the issue was created, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    lbs_location?: string; // The ID of the location that relates to the issue.
    assigned_to_type?: string; // The type of subject this issue is assigned to. Possible values: user, company, role.
    assigned_to?: string; // The Autodesk ID of the user, role, or company the issue was assigned to.
    owner?: string; // The Autodesk ID of the user who owns this issue.
    root_cause_id?: string; // The ID of the type of root cause for the issue. To verify the type of root cause, see GET root-causes.
    quality_urns?: object; // The resource in the Checklists service that this issue is related to.
}

interface IIssueComment {
    id: string;

    body?: string; // The content of the comment.
    created_at?: string; // The timestamp of the date and time the comment was created, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    created_by?: string;
    issue_id?: string; // The ID of the issue associated with the comment.
    synced_at?: string; // The date and time the comment was synced with BIM 360, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    updated_at?: string; // The last time the comment’s attributes were updated, in the following format: YYYY-MM-DDThh:mm:ss.sz.
}

interface IIssueAttachment {
    id: string;

    created_at?: string; // The timestamp of the date and time the attachment was created, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    synced_at?: string; // The date and time the attachment was synced with BIM 360, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    updated_at?: string; // The last time the attachment’s attributes were updated, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    attachment_type?: string; // The type of attachment; will always be document.
    created_by?: string; // The BIM 360 ID of the user who created the attachment.
    issue_id?: string; // The BIM 360 ID of the issue associated with the attachment.
    markup_metadata?: object;
    name?: string; // The name of the attachment.
    resource_urns?: any[];
    url?: string; // The URL of the storage location for the attachment.
    urn?: string; // The URN of the file that is attached to the issue.
    urn_page?: string; // The URN of the page that is attached to the issue. The default is null.
    urn_type?: string; // The type of attachment. Possible values: dm - a BIM 360 Document Management file, oss - a local file.
    urn_version?: number; // The URN of the version of the file that is attached to the issue.
    permitted_actions?: any[]; // A list of actions that are permitted for the current user.
}

interface INewIssueAttachment {
    name: string; // The name of the attachment.
    urn: string; // The URN of the file you are attaching to the issue.
    urn_type: string; // The type of attachment. Possible value: dm.
    issue_id: string; // The ID of the issue associated with the attachment.
}

interface IIssueRootCause {
    key: string; // The unique key of the root cause.
    title: string; // The name of the root cause.
}

interface IIssueType {
    id: string; // The ID of the issue type for the project.
    containerId?: string; // The ID of the container for the project.
    title?: string; // The name of the issue type.
    createdAt?: string; // The timestamp of the date and time the issue type was created, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    updatedAt?: string; // The last time the issue type was updated, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    deletedAt?: string; // The timestamp of the date and time the issue type was deleted, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    statusSet?: string; // The set of statuses available for the issue. Possible values: basic (Draft, Open Answered, Closed, Void), field (Draft, Open, Work completed, Ready to inspect, Not approved, In dispute, Closed, Void).
    isActive?: boolean; // True if the issue type is active. False if the issue type is not active.
    orderIndex?: number; // The order the issue type appears in the UI.
    isReadOnly?: boolean; // True if the issue type is read only. False if you can edit the issue type.
    permittedActions?: any[]; // A list of actions that are permitted for the issue type.
    permittedAttributes?: any[]; // A list of attributes accessible for the issue type.
    subtypes?: any[]; // An array of data about the issue subtypes associated with the issue type.
}

interface IIssueFilter {
    owner?: string; // ID of the owner of the issue
    target_urn?: string; // Retrieves pushpin issues associated with the specified file. Only relevant for pushpin issues. A pushpin is a visual marker that denotes the location of a issue in a document.
    due_date?: Date | [Date, Date]; // Retrieves issues due by the specified due date. Value can be either a Date object specifying the due date, or an array of two Date objects specifying the range.
    synced_after?: Date; // Retrieves issues updated after the specified date. Value is the timestamp of date.
    created_at?: Date | [Date, Date]; // Retrieves issues created after the specfied date. Value can be either a Date object specifying the due date, or an array of two Date objects specifying the range.
    created_by?: string; // Retrieves issues created by the user. Value is the unique identifier of the user who created the issue.
    ng_issue_type_id?: string; // Retrieves issues associated with the specified issue type. To verify the ID, call GET ng-issue-types. Separate multiple values with commas. (Note that issues that were created in the Document Management module prior to the release of the latest version of the Issues API are automatically assigned the design issue type. For more details, see the changelog.)
    ng_issue_subtype_id?: string; // Retrieves issues associated with the specified issue subtype. To verify the ID, call GET ng-issue-types, with the include=subtypes query string parameter.
}

interface IPage {
    offset: number; // Offset in the complete list of records.
    limit: number; // Number of records to return in the response payload. Acceptable values: 1-100. Default value: 10.
}

interface IUser {
    id: string; // User ID
    account_id?: string; // Account ID
    /*
    The role of the user in the account.
    Possible values
        account_admin: user has BIM 360 account administration access
        account_user : normal project user
        project_admin: user has Project administration privileges at a service level
    */
    role?: string;
    /*
    Status of the user in the system.
    Possible values:
        active: user is active and has logged into the system sucessfully
        inactive: user is disabled
        pending: user is invited and is yet to accept the invitation
        not_invited: user is not invited
    */
    status?: string;
    company_id?: string; // The user’s default company ID in BIM 360
    company_name?: string; // The name of the user’s default company name in BIM 360
    last_sign_in?: string; // Timestamp of the last sign in, YYYY-MM-DDThh:mm:ss.sssZ format
    email?: string; // User’s email (max length: 255)
    name?: string; // Default display name (max length: 255)
    nickname?: string; // Nick name for user (max length: 255)
    first_name?: string; // User’s first name (max length: 255)
    last_name?: string; // User’s last name (max length: 255)
    uid?: string; // User’s Autodesk ID
    image_url?: string; // URL for user’s profile image (max length: 255)
    address_line_1?: string; // User’s address line 1 (max length: 255)
    address_line_2?: string; // User’s address line 2 (max length: 255)
    city?: string; // City in which user is located (max length: 255)
    state_or_province?: string; // State or province in which user is located (max length: 255). Note that the state_or_province value depends on the selected country value; see the valid values in the state_or_province list in the Parameters guide.
    postal_code?: string; // Postal code for the user’s location (max length: 255)
    country?: string; // Country for this user. Refer to the country list in the Parameters guide.
    phone?: string; // Contact phone number for the user (max length: 255)
    company?: string; // Company information from the Autodesk user profile (max length: 255). Note that this is different from company in BIM 360.
    job_title?: string; // User’s job title (max length: 255)
    industry?: string; // Industry information for user (max length: 255)
    about_me?: string; // Short description about the user (max length: 255)
    created_at?: string; // YYYY-MM-DDThh:mm:ss.sssZ format
    updated_at?: string; // YYYY-MM-DDThh:mm:ss.sssZ format
}

interface IUserFilter {
    name?: string; // User name to match (max length: 255)
    email?: string; // User email to match (max length: 255)
    company_name?: string; // User company to match (max length: 255)
    operator?: string; // Boolean operator to use: OR (default) or AND
    partial?: boolean; // If true (default), perform a fuzzy match
}

interface ILocationNode {
    id: string; // Node id
    parentId?: string; // Parent node Id, null if this is the root node
    type?: string; // Not relevant
    name?: string; // Node name (max length: 255)
    description?: string; // Not relevant
    barcode?: string; // Not relevant
    order?: number; // Node order. This number represents the relative position of a node under its parent. A node with a smaller order value will be positioned in front of a node with a higher order value.
    documentCount?: number; // Node document count
    areaDefined?: boolean; // Flag that indicates if an area has been defined
    path?: string[]; // Path information from the root node to the current node. This information is only included if you use the filter[id] parameter
}


//*** RFI interface */

interface IRFI_PermittedActions {
    updateRfi: {
        [key: string]: IRFI_UpdateRfi
    }
}

interface IRFI_UpdateRfi {
    permittedStatuses: {
        [key: string]: IRFI_PermittedStatuses[]
    }
}

interface IRFI_PermittedStatuses {
    status: string;
    requiredAttributes: {
        [key: string]: IRFI_RequiredAttributes
    }
}

interface IRFI_RequiredAttributes {
    name: string;
    values: IRFI_RequiredAttributes_Value[];
}

interface IRFI_RequiredAttributes_Value {
    value: string;
    type: string;
}

interface IRfi {
    id: string; // Unique rfi ID. Can be used in other API calls.
    question: string; // the rfi question
    status: string;  //The status of the RFI. Note that the possible statuses of the RFI depends on the workflow type assigned to the RFI.
    assignedTo: string; //The Autodesk ID of the user.
    managerId: string;//The Autodesk ID of the manager.
    reviewerId: string;//The Autodesk ID of the reviewer.
    dueDate: string;//The timestamp of the due date for the RFI, in the following format: YYYY-MM-DDThh:mm:ss.sz.
    linkedDocument: string; //The document ID associated with the RFI. Identifies whether this RFI is a pushpin RFI or a project-related RFI. 
    linkedDocumentVersion: string; //The document’s version ID associated with the RFI. Only relevant for pushpin RFIs.
    attachmentsCount: number;//The number of attachments associated with the RFI.
    commentsCount: number;//The number of comments associated with the RFI.
    createdBy: string;//The Autodesk ID of the user who created the RFI. To check the name of the user, call GET projects/users.
    permittedActions?: {
        [key: string]: IRFI_PermittedActions;
    }// The list of actions that are permitted for the user. 
}

interface IRfiFilter {
    assignedTo?: string; // Retrieves RFIs in the project that were assigned to the specified user. Use the user’s Autodesk ID
    linkedDocument?: string; // Retrieves pushpin RFIs that are associated with the specified document. 
    dueDate?: Date | [Date, Date]; // Retrieves RFIs with the specified due date, in the following format: YYYY-MM-DDThh:mm:ss.sz, or a date range in the following format: YYYY-MM-DDThh:mm:ss.sz...YYYY-MM-DDThh:mm:ss.sz.
    status?: string; // Retrieves RFIs with the specified status. Possible values: draft, submitted, open, rejected, answered, closed & void. For example, filter[status]=open
}

interface IProjectUser {
    id:string;
    email:string;
    firstName:string;
    lastName:string;
    autodeskId:string;

}

/**
 * Client providing access to Autodesk Forge
 * {@link https://forge.autodesk.com/en/docs/bim360/v1|BIM360 APIs}.
 */
export class BIM360Client extends ForgeClient {
    /**
     * Initializes new client with specific authentication method.
     * @param {IAuthOptions} auth Authentication object,
     * containing either `client_id` and `client_secret` properties (for 2-legged authentication),
     * or a single `token` property (for 2-legged or 3-legged authentication with pre-generated access token).
     * @param {string} [host="https://developer.api.autodesk.com"] Forge API host.
     * @param {Region} [region="US"] Forge availability region ("US" or "EMEA").
     */
    constructor(auth: IAuthOptions, host?: string, region?: Region) {
        super('', auth, host, region);
    }

    // #region Hubs

    /**
     * Gets a list of all hubs accessible to given credentials
     * ({@link https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-GET}).
     * @async
     * @returns {Promise<IHub[]>} List of hubs.
     */
    async listHubs(xUserId?: string): Promise<IHub[]> {
        const headers: { [key: string]: string } = {};
        headers['Content-Type'] = 'application/vnd.api+json';
        if (!!xUserId) {
            headers['x-user-id'] = xUserId;
        }
        let response = await this.get(`project/v1/hubs`, headers, ReadTokenScopes);
        let results = response.data;
        while (response.links && response.links.next) {
            response = await this.get(response.links.next.href, headers, ReadTokenScopes);
            results = results.concat(response.data);
        }
        return results.map((result: any) => Object.assign(result.attributes, { id: result.id }));
    }

    /**
     * Gets details of specific hub
     * ({@link https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-GET}).
     * @async
     * @param {string} hubId Hub ID.
     * @returns {Promise<IHub>} Hub details or null if there isn't one.
     */
    async getHubDetails(hubId: string, xUserId?: string): Promise<IHub> {
        const headers: { [key: string]: string } = {};
        headers['Content-Type'] = 'application/vnd.api+json';
        if (!!xUserId) {
            headers['x-user-id'] = xUserId;
        }
        const response = await this.get(`project/v1/hubs/${encodeURIComponent(hubId)}`, headers, ReadTokenScopes);
        return Object.assign(response.data.attributes, { id: response.data.id })
    }

    // #endregion

    // #region Projects

    /**
     * Gets a list of all projects in a hub
     * ({@link https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-GET}).
     * @async
     * @param {string} hubId Hub ID.
     * @returns {Promise<IProject[]>} List of projects.
     */
    async listProjects(hubId: string, xUserId?: string): Promise<IProject[]> {
        const headers: { [key: string]: string } = {};
        headers['Content-Type'] = 'application/vnd.api+json';
        if (!!xUserId) {
            headers['x-user-id'] = xUserId;
        }
        let response = await this.get(`project/v1/hubs/${encodeURIComponent(hubId)}/projects`, headers, ReadTokenScopes);
        let results = response.data;
        while (response.links && response.links.next) {
            response = await this.get(response.links.next.href, headers, ReadTokenScopes);
            results = results.concat(response.data);
        }
        return results.map((result: any) => Object.assign(result.attributes, { id: result.id }));
    }

    /**
     * Gets details of specific project
     * ({@link https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-project_id-GET}).
     * @async
     * @param {string} hubId Hub ID.
     * @param {string} projectId Project ID.
     * @returns {Promise<IProject>} Hub details or null if there isn't one.
     */
    async getProjectDetails(hubId: string, projectId: string, xUserId?: string): Promise<IProject> {
        const headers: { [key: string]: string } = {};
        headers['Content-Type'] = 'application/vnd.api+json';
        if (!!xUserId) {
            headers['x-user-id'] = xUserId;
        }
        const response = await this.get(`project/v1/hubs/${encodeURIComponent(hubId)}/projects/${encodeURIComponent(projectId)}`, headers, ReadTokenScopes);
        return Object.assign(response.data.attributes, { id: response.data.id })
    }

    /**
     * Gets a list of top folders in a project
     * ({@link https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-project_id-topFolders-GET}).
     * @async
     * @param {string} hubId Hub ID.
     * @param {string} projectId Project ID.
     * @returns {Promise<IFolder[]>} List of folder records.
     */
    async listTopFolders(hubId: string, projectId: string, xUserId?: string): Promise<IFolder[]> {
        const headers: { [key: string]: string } = {};
        if (!!xUserId) {
            headers['x-user-id'] = xUserId;
        }
        let response = await this.get(`project/v1/hubs/${encodeURIComponent(hubId)}/projects/${encodeURIComponent(projectId)}/topFolders`, headers, ReadTokenScopes);
        let results = response.data;
        while (response.links && response.links.next) {
            response = await this.get(response.links.next.href, headers, ReadTokenScopes);
            results = results.concat(response.data);
        }
        return results.map((result: any) => Object.assign(result.attributes, { id: result.id }));
    }

    // #endregion

    // #region Folders

    /**
     * Gets contents of a folder
     * ({@link https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-contents-GET}).
     * @async
     * @param {string} projectId Project ID.
     * @param {string} folderId Folder ID.
     * @returns {Promise<IItem[]>} List of folder contents.
     */
    async listContents(projectId: string, folderId: string, xUserId?: string): Promise<IItem[]> {
        const headers: { [key: string]: string } = {};
        if (!!xUserId) {
            headers['x-user-id'] = xUserId;
        }
        let response = await this.get(`data/v1/projects/${encodeURIComponent(projectId)}/folders/${encodeURIComponent(folderId)}/contents`, headers, ReadTokenScopes);
        let results = response.data;
        while (response.links && response.links.next) {
            response = await this.get(response.links.next.href, headers, ReadTokenScopes);
            results = results.concat(response.data);
        }
        return results.map((result: any) => Object.assign(result.attributes, { id: result.id, type: result.type }));
    }

    // #endregion

    // #region Items

    /**
     * Gets details of an item
     * ({@link https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-items-item_id-GET}).
     * @async
     * @param {string} projectId Project ID.
     * @param {string} itemId Item ID.
     * @returns {Promise<IItemDetails>} Item details.
     */
    async getItemDetails(projectId: string, itemId: string, xUserId?: string): Promise<IItemDetails> {
        const headers: { [key: string]: string } = {};
        if (!!xUserId) {
            headers['x-user-id'] = xUserId;
        }
        let response = await this.get(`data/v1/projects/${encodeURIComponent(projectId)}/items/${encodeURIComponent(itemId)}`, headers, ReadTokenScopes);
        if (response.included && response.included.length > 0) {
            const included = response.included[0];
            return Object.assign(response.data.attributes, { id: response.data.id, type: response.data.type, derivative: included?.relationships?.derivatives?.data?.id, storage: included?.relationships?.storage?.data?.id });
        } else {
            return Object.assign(response.data.attributes, { id: response.data.id, type: response.data.type });
        }
    }

    /**
     * Gets versions of a folder item
     * ({@link https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-items-item_id-versions-GET}).
     * @async
     * @param {string} projectId Project ID.
     * @param {string} itemId Item ID.
     * @returns {Promise<IVersion[]>} List of item versions.
     */
    async listVersions(projectId: string, itemId: string, xUserId?: string): Promise<IVersion[]> {
        const headers: { [key: string]: string } = {};
        headers['Content-Type'] = 'application/vnd.api+json';
        if (!!xUserId) {
            headers['x-user-id'] = xUserId;
        }
        let response = await this.get(`data/v1/projects/${encodeURIComponent(projectId)}/items/${encodeURIComponent(itemId)}/versions`, headers, ReadTokenScopes);
        let results = response.data;
        while (response.links && response.links.next) {
            response = await this.get(response.links.next.href, headers, ReadTokenScopes);
            results = results.concat(response.data);
        }
        return results.map((result: any) => Object.assign(result.attributes, {
            id: result.id,
            type: result.type,
            derivative: result?.relationships?.derivatives?.data?.id,
            storage: result?.relationships?.storage?.data?.id
        }));
    }

    /**
     * Gets "tip" version of a folder item
     * ({@link https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-items-item_id-tip-GET}).
     * @async
     * @param {string} projectId Project ID.
     * @param {string} itemId Item ID.
     * @returns {Promise<IVersion>} Tip version of the item.
     */
    async getTipVersion(projectId: string, itemId: string, xUserId?: string): Promise<IVersion> {
        const headers: { [key: string]: string } = {};
        if (!!xUserId) {
            headers['x-user-id'] = xUserId;
        }
        const response = await this.get(`data/v1/projects/${encodeURIComponent(projectId)}/items/${encodeURIComponent(itemId)}/tip`, headers, ReadTokenScopes);
        return response.data;
    }

    // #endregion

    // #region Versions

    /**
     * Gets specific version of a folder item
     * ({@link https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-versions-version_id-GET}).
     * @async
     * @param {string} projectId Project ID.
     * @param {string} itemId Item ID (@deprecated, will be removed in next major version).
     * @param {string} versionId Version ID.
     * @returns {Promise<IVersion>} Specific version of folder item.
     */
    async getVersionDetails(projectId: string, itemId: string, versionId: string, xUserId?: string): Promise<IVersion> {
        const headers: { [key: string]: string } = {};
        if (!!xUserId) {
            headers['x-user-id'] = xUserId;
        }
        const response = await this.get(`data/v1/projects/${encodeURIComponent(projectId)}/versions/${encodeURIComponent(versionId)}`, headers, ReadTokenScopes);
        return response.data;
    }

    // #endregion

    // #region Issues

    /**
     * Retrieves ID of container for issues of specific BIM360 project.
     * @async
     * @param {string} hubId Hub ID.
     * @param {string} projectId Project ID.
     * @returns {Promise<string|null>} Issue container ID if there is one, otherwise null.
     */
    async getIssueContainerID(hubId: string, projectId: string): Promise<string | null> {
        const headers = { 'Content-Type': 'application/vnd.api+json' };
        const response = await this.get(`project/v1/hubs/${encodeURIComponent(hubId)}/projects/${encodeURIComponent(projectId)}`, headers, ReadTokenScopes);
        return response.data?.relationships?.issues?.data?.id;
    }


    /**
     * Lists all issues in a BIM360 project.
     * Requires 3-legged token.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/field-issues-GET}.
     * @async
     * @param {string} containerId ID of container storing all issues for a specific projects.
     * @param {IIssueFilter} [filter] Optional set of filters.
     * @param {IPage} [page] Optional page of issues to retrieve. If not defined, *all* issues will be listed.
     * @returns {Promise<IIssue[]>} List of matching issues.
     */
    async listIssues(containerId: string, filter?: IIssueFilter, page?: IPage): Promise<IIssue[]> {
        // TODO: 'include', and 'fields' params
        const headers = { 'Content-Type': 'application/vnd.api+json' };
        let url = page
            ? `issues/v1/containers/${encodeURIComponent(containerId)}/quality-issues?page[limit]=${page.limit}&page[offset]=${page.offset}`
            : `issues/v1/containers/${encodeURIComponent(containerId)}/quality-issues?page[limit]=${PageSize}`;
        if (filter) {
            if (filter.owner) {
                url += '&filter[owner]=' + filter.owner;
            }
            if (filter.target_urn) {
                url += '&filter[target_urn]=' + filter.target_urn;
            }
            if (filter.due_date) {
                url += '&filter[due_date]=' + (
                    Array.isArray(filter.due_date)
                        ? filter.due_date[0].toISOString() + '...' + filter.due_date[1].toISOString()
                        : filter.due_date.toISOString()
                );
            }
            if (filter.synced_after) {
                url += '&filter[synced_after]=' + filter.synced_after.toISOString();
            }
            if (filter.created_at) {
                url += '&filter[created_at]=' + (
                    Array.isArray(filter.created_at)
                        ? filter.created_at[0].toISOString() + '...' + filter.created_at[1].toISOString()
                        : filter.created_at.toISOString()
                );
            }
            if (filter.created_by) {
                url += '&filter[created_by]=' + filter.created_by;
            }
            if (filter.ng_issue_type_id) {
                url += '&filter[ng_issue_type_id]=' + filter.ng_issue_type_id;
            }
            if (filter.ng_issue_subtype_id) {
                url += '&filter[ng_issue_subtype_id]=' + filter.ng_issue_subtype_id;
            }
        }
        let response = await this.get(url, headers, ReadTokenScopes);
        let results = response.data;
        if (!page) {
            while (response.links && response.links.next) {
                response = await this.get(response.links.next.href, headers, ReadTokenScopes);
                results = results.concat(response.data);
            }
        }
        return results.map((result: any) => Object.assign(result.attributes, { id: result.id }));
    }

    /**
     * Obtains detail information about BIM360 issue.
     * Requires 3-legged token.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/field-issues-:id-GET}.
     * @async
     * @param {string} containerId ID of container storing all issues for a specific projects.
     * @param {string} issueId Issue ID.
     * @returns {Promise<IIssue>} Issue details.
    */
    async getIssueDetails(containerId: string, issueId: string): Promise<IIssue> {
        // TODO: support 'include', and 'fields' params
        const headers = { 'Content-Type': 'application/vnd.api+json' };
        const response = await this.get(`issues/v1/containers/${encodeURIComponent(containerId)}/quality-issues/${encodeURIComponent(issueId)}`, headers, ReadTokenScopes);
        return Object.assign(response.data.attributes, { id: response.data.id });
    }

    /**
     * Creates new BIM360 issue.
     * Requires 3-legged token.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/field-issues-POST}.
     * @async
     * @param {string} containerId ID of container storing all issues for a specific projects.
     * @param {INewIssue} attributes New issue attributes.
     * @returns {Promise<IIssue>} New issue details.
     */
    async createIssue(containerId: string, attributes: INewIssue): Promise<IIssue> {
        // TODO: support 'fields' param
        const headers = { 'Content-Type': 'application/vnd.api+json' };
        const params = {
            data: {
                type: 'quality_issues',
                attributes
            }
        };
        const response = await this.post(`issues/v1/containers/${encodeURIComponent(containerId)}/quality-issues`, params, headers, WriteTokenScopes);
        return Object.assign(response.data.attributes, { id: response.data.id });
    }

    /**
     * Updates existing BIM360 issue.
     * Requires 3-legged token.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/field-issues-:id-PATCH}.
     * @async
     * @param {string} containerId ID of container storing all issues for a specific projects.
     * @param {string} issueId ID of updated issue.
     * @param {IUpdateIssue} attributes Issue attributes to update.
     * @returns {Promise<IIssue>} Updated issue details.
     */
    async updateIssue(containerId: string, issueId: string, attributes: IUpdateIssue): Promise<IIssue> {
        const headers = { 'Content-Type': 'application/vnd.api+json' };
        const params = {
            data: {
                type: 'quality_issues',
                id: issueId,
                attributes
            }
        };
        const response = await this.patch(`issues/v1/containers/${encodeURIComponent(containerId)}/quality-issues/${encodeURIComponent(issueId)}`, params, headers, WriteTokenScopes);
        return Object.assign(response.data.attributes, { id: response.data.id });
    }

    /**
     * Lists all comments associated with a BIM360 issue.
     * Requires 3-legged token.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/field-issues-:id-comments-GET}.
     * @async
     * @param {string} containerId ID of container storing all issues for a specific projects.
     * @param {string} issueId Issue ID.
     * @param {IPage} [page] Optional page of issue comments. If not defined, *all* comments will be listed.
     * @returns {Promise<IIssueComment[]>} Issue comments.
     */
    async listIssueComments(containerId: string, issueId: string, page?: IPage): Promise<IIssueComment[]> {
        // TODO: support 'filter', 'include', or 'fields' params
        const headers = { 'Content-Type': 'application/vnd.api+json' };
        const url = page
            ? `issues/v1/containers/${encodeURIComponent(containerId)}/quality-issues/${encodeURIComponent(issueId)}/comments?page[limit]=${page.limit}&page[offset]=${page.offset}`
            : `issues/v1/containers/${encodeURIComponent(containerId)}/quality-issues/${encodeURIComponent(issueId)}/comments?page[limit]=${PageSize}`;
        let response = await this.get(url, headers, ReadTokenScopes);
        let results = response.data;
        if (!page) {
            while (response.links && response.links.next) {
                response = await this.get(response.links.next.href, headers, ReadTokenScopes);
                results = results.concat(response.data);
            }
        }
        return results.map((result: any) => Object.assign(result.attributes, { id: result.id }));
    }

    /**
     * Creates new comment associated with a BIM360 issue.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/field-issues-comments-POST}.
     * @async
     * @param {string} containerId ID of container storing all issues for a specific projects.
     * @param {string} issueId Issue ID.
     * @returns {Promise<IIssueComment>} New issue comment.
     */
    async createIssueComment(containerId: string, issueId: string, body: string): Promise<IIssueComment> {
        // TODO: support 'fields' param
        const headers = { 'Content-Type': 'application/vnd.api+json' };
        const params = {
            data: {
                type: 'comments',
                attributes: {
                    issue_id: issueId,
                    body
                }
            }
        };
        const response = await this.post(`issues/v1/containers/${encodeURIComponent(containerId)}/comments`, params, headers, WriteTokenScopes);
        return Object.assign(response.data.attributes, { id: response.data.id });
    }

    /**
     * Lists all attachments associated with a BIM360 issue.
     * Requires 3-legged token.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/field-issues-attachments-GET}.
     * @async
     * @param {string} containerId ID of container storing all issues for a specific projects.
     * @param {string} issueId Issue ID.
     * @param {IPage} [page] Optional page of issue attachments. If not defined, *all* attachments will be listed.
     * @returns {Promise<IIssueAttachment[]>} Issue attachments.
     */
    async listIssueAttachments(containerId: string, issueId: string, page?: IPage): Promise<IIssueAttachment[]> {
        // TODO: support 'filter', 'include', or 'fields' params
        const headers = { 'Content-Type': 'application/vnd.api+json' };
        const url = page
            ? `issues/v1/containers/${encodeURIComponent(containerId)}/quality-issues/${encodeURIComponent(issueId)}/attachments?page[limit]=${page.limit}&page[offset]=${page.offset}`
            : `issues/v1/containers/${encodeURIComponent(containerId)}/quality-issues/${encodeURIComponent(issueId)}/attachments?page[limit]=${PageSize}`;
        let response = await this.get(url, headers, ReadTokenScopes);
        let results = response.data;
        if (!page) {
            while (response.links && response.links.next) {
                response = await this.get(response.links.next.href, headers, ReadTokenScopes);
                results = results.concat(response.data);
            }
        }
        return results.map((result: any) => Object.assign(result.attributes, { id: result.id }));
    }

    /**
     * Creates new attachment associated with a BIM360 issue.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/field-issues-attachments-POST}.
     * @async
     * @param {string} containerId ID of container storing all issues for a specific projects.
     * @returns {Promise<IIssueAttachment>} New issue attachment.
     */
    async createIssueAttachment(containerId: string, attributes: INewIssueAttachment): Promise<IIssueAttachment> {
        // TODO: support 'fields' param
        const headers = { 'Content-Type': 'application/vnd.api+json' };
        const params = {
            data: {
                type: 'attachments',
                attributes
            }
        };
        const response = await this.post(`issues/v1/containers/${encodeURIComponent(containerId)}/attachments`, params, headers, WriteTokenScopes);
        return Object.assign(response.data.attributes, { id: response.data.id });
    }

    /**
     * Retrieves a list of supported root causes that you can allocate to an issue.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/root-causes-GET}.
     * @async
     * @param {string} containerId ID of container storing all issues for a specific projects.
     * @param {IPage} [page] Optional page of records. If not defined, *all* records will be listed.
     * @returns {Promise<IIssueRootCause[]>} Issue root causes.
     */
    async listIssueRootCauses(containerId: string, page?: IPage): Promise<IIssueRootCause[]> {
        // TODO: support 'filter', 'include', or 'fields' params
        const headers = { 'Content-Type': 'application/vnd.api+json' };
        const url = page
            ? `issues/v1/containers/${encodeURIComponent(containerId)}/root-causes?page[limit]=${page.limit}&page[offset]=${page.offset}`
            : `issues/v1/containers/${encodeURIComponent(containerId)}/root-causes?page[limit]=${PageSize}`;
        let response = await this.get(url, headers, ReadTokenScopes);
        let results = response.data;
        return results.map((result: any) => Object.assign(result.attributes, { id: result.id }));
    }

    /**
     * Lists issue types in specific container.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/ng-issue-types-GET}.
     * @async
     * @param {string} containerId ID of container storing all issues for a specific projects.
     * @returns {Promise<IIssueType[]>} List of issues types.
     */
    async listIssueTypes(containerId: string, includeSubtypes?: boolean): Promise<IIssueType[]> {
        // TODO: support 'filter', 'include', or 'fields' params
        const headers = { 'Content-Type': 'application/vnd.api+json' };
        let response = await this.get(`issues/v1/containers/${encodeURIComponent(containerId)}/ng-issue-types?limit=${PageSize}${includeSubtypes ? '&include=subtypes' : ''}`, headers, ReadTokenScopes);
        let results = response.results;
        while (response.pagination && response.pagination.offset + response.pagination.limit < response.pagination.totalResults) {
            response = await this.get(`issues/v1/containers/${encodeURIComponent(containerId)}/ng-issue-types?offset=${response.pagination.offset + response.pagination.limit}&limit=${PageSize}${includeSubtypes ? '&include=subtypes' : ''}`, headers, ReadTokenScopes);
            results = results.concat(response.results);
        }
        return results;
    }

    async listIssueAttributeDefinitions(containerId: string): Promise<any[]> {
        // TODO: support 'filter', 'include', or 'fields' params
        const headers = {};
        let response = await this.get(`issues/v2/containers/${encodeURIComponent(containerId)}/issue-attribute-definitions?limit=${PageSize}`, headers, ReadTokenScopes);
        let results = response.results;
        while (response.pagination && response.pagination.offset + response.pagination.limit < response.pagination.totalResults) {
            response = await this.get(`issues/v2/containers/${encodeURIComponent(containerId)}/issue-attribute-definitions?offset=${response.pagination.offset + response.pagination.limit}&limit=${PageSize}`, headers, ReadTokenScopes);
            results = results.concat(response.results);
        }
        return results;
    }

    async listIssueAttributeMappings(containerId: string): Promise<any[]> {
        // TODO: support 'filter', 'include', or 'fields' params
        const headers = {};
        let response = await this.get(`issues/v2/containers/${encodeURIComponent(containerId)}/issue-attribute-mappings?limit=${PageSize}`, headers, ReadTokenScopes);
        let results = response.results;
        while (response.pagination && response.pagination.offset + response.pagination.limit < response.pagination.totalResults) {
            response = await this.get(`issues/v2/containers/${encodeURIComponent(containerId)}/issue-attribute-mappings?offset=${response.pagination.offset + response.pagination.limit}&limit=${PageSize}`, headers, ReadTokenScopes);
            results = results.concat(response.results);
        }
        return results;
    }

    // #endregion

    // #region Account Admin

    /**
     * Lists all users in BIM 360 account, or just users matching specific criteria.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/users-GET}.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/users-search-GET}.
     * @async
     * @param {string} accountId The account ID of the users. This corresponds to hub ID in the Data Management API. To convert a hub ID into an account ID you need to remove the “b.” prefix. For example, a hub ID of b.c8b0c73d-3ae9 translates to an account ID of c8b0c73d-3ae9.
     * @returns {Promise<IUser[]>} List of users.
     */
    async listUsers(accountId: string, filter?: IUserFilter): Promise<IUser[]> {
        let url = this.region === Region.US
            ? `hq/v1/accounts/${encodeURIComponent(accountId)}/users`
            : `hq/v1/regions/eu/accounts/${encodeURIComponent(accountId)}/users`;
        if (filter) {
            url += `/search?limit=${PageSize}`;
            for (const key of Object.keys(filter)) {
                url += `&${key}=${(filter as any)[key]}`;
            }
        } else {
            url += `?limit=${PageSize}`;
        }

        let results: IUser[] = [];
        let offset = 0;
        let response = await this.get(url, {}, ReadTokenScopes);
        while (response.length) {
            results = results.concat(response);
            offset += PageSize;
            response = await this.get(url + `&offset=${offset}`, {}, ReadTokenScopes);
        }
        return results;
    }

    /**
     * Query the details of a specific user.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/users-:user_id-GET}.
     * @param {string} accountId The account ID of the users. This corresponds to hub ID in the Data Management API. To convert a hub ID into an account ID you need to remove the “b.” prefix. For example, a hub ID of b.c8b0c73d-3ae9 translates to an account ID of c8b0c73d-3ae9.
     * @param {string} userId User ID.
     * @returns {Promise<IUser>} User details.
    */
    async getUserDetails(accountId: string, userId: string): Promise<IUser> {
        const url = this.region === Region.US
            ? `hq/v1/accounts/${encodeURIComponent(accountId)}/users/${encodeURIComponent(userId)}`
            : `hq/v1/regions/eu/accounts/${encodeURIComponent(accountId)}/users/${encodeURIComponent(userId)}`;
        const response = await this.get(url, {}, ReadTokenScopes);
        return response;
    }

    // #endregion

    // #region Locations

    /**
     * Retrieves ID of container for locations of specific BIM360 project.
     * Note: this API is not yet officially documented and supported!
     * @async
     * @param {string} hubId Hub ID.
     * @param {string} projectId Project ID.
     * @returns {Promise<string|null>} Location container ID if there is one, otherwise null.
     */
    async getLocationContainerID(hubId: string, projectId: string): Promise<string | null> {
        const headers = { 'Content-Type': 'application/vnd.api+json' };
        const response = await this.get(`project/v1/hubs/${encodeURIComponent(hubId)}/projects/${encodeURIComponent(projectId)}`, headers, ReadTokenScopes);
        return response.data?.relationships?.locations?.data?.id;
    }

    /**
     * Retrieves details about the locations (nodes) for a project.
     * Note: this API is not yet officially documented and supported!
     * @async
     * @param {string} containerId Location container ID retrieved using {@link getLocationContainerID}.
     * @param {IPage} [page] Optional page of locations to retrieve. If not defined, *all* issues will be listed.
     * @returns {Promise<ILocationNode[]>} Location nodes.
     */
    async listLocationNodes(containerId: string, page?: IPage): Promise<ILocationNode[]> {
        const headers = {};
        const treeId = 'default';
        const url = page
            ? `bim360/locations/v2/containers/${encodeURIComponent(containerId)}/trees/${encodeURIComponent(treeId)}/nodes?offset=${page.offset}&limit=${page.limit}`
            : `bim360/locations/v2/containers/${encodeURIComponent(containerId)}/trees/${encodeURIComponent(treeId)}/nodes?limit=${PageSize}`;
        let response = await this.get(url, headers, ReadTokenScopes);
        let results = response.results;
        if (!page) {
            while (response.pagination && response.pagination.offset + response.pagination.limit < response.pagination.totalResults) {
                response = await this.get(`bim360/locations/v2/containers/${encodeURIComponent(containerId)}/trees/${encodeURIComponent(treeId)}/nodes?offset=${response.pagination.offset + response.pagination.limit}&limit=${PageSize}`, headers, ReadTokenScopes);
                results = results.concat(response.results);
            }
        }
        return results;
    }



    /**
     * Retrieves ID of container for rfis of specific BIM360 project.
     * @async
     * @param {string} hubId Hub ID.
     * @param {string} projectId Project ID.
     * @returns {Promise<string|null>} Rfi container ID if there is one, otherwise null.
     */
    async getRfiContainerID(hubId: string, projectId: string): Promise<string | null> {
        const headers = { 'Content-Type': 'application/vnd.api+json' };
        const response = await this.get(`project/v1/hubs/${encodeURIComponent(hubId)}/projects/${encodeURIComponent(projectId)}`, headers, ReadTokenScopes);
        return response.data?.relationships?.rfis?.data?.id;
    }

    /**
     * Lists all rfis in a BIM360 project.
     * Requires 3-legged token.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/rfis-v2-rfis-GET/}.
     * @async
     * @param {string} containerId ID of container storing all rfis for a specific projects.
     * @param {IRfiFilter} [filter] Optional set of filters.
     * @param {IPage} [page] Optional page of issues to retrieve. If not defined, *all* rfis will be listed.
     * @returns {Promise<IRfi[]>} List of matching rfis.
     */
    async listRfis(containerId: string, filter?: IRfiFilter, page?: IPage): Promise<IRfi[]> {
        // TODO: 'include', and 'fields' params
        const headers = { 'Content-Type': 'application/json' };
        let url = page
            ? `bim360/rfis/v2/containers/${encodeURIComponent(containerId)}/rfis?limit=${page.limit}&offset=${page.offset}`
            : `bim360/rfis/v2/containers/${encodeURIComponent(containerId)}/rfis?limit=${PageSize}`;

        if (filter) {
            if (filter.status) {
                url += '&filter[status]=' + filter.status;
            }
            if (filter.linkedDocument) {
                url += '&filter[linkedDocument]=' + filter.linkedDocument;
            }
            if (filter.dueDate) {
                url += '&filter[dueDate]=' + (
                    Array.isArray(filter.dueDate)
                        ? filter.dueDate[0].toISOString() + '...' + filter.dueDate[1].toISOString()
                        : filter.dueDate.toISOString()
                );
            }
            if (filter.assignedTo) {
                url += '&filter[assignedTo]=' + filter.assignedTo;
            }
        }
        console.log('rfi:' + url);
        let response = await this.get(url, headers, ReadTokenScopes);
        let results = response.results;
        // if (!page) {
        //     while (response.links && response.links.next) {
        //         response = await this.get(response.links.next.href, headers, ReadTokenScopes);
        //         results = results.concat(response.data);
        //     }
        // }
        //console.log(results);

        return results.map((result: any) => Object.assign(result, { id: result.id }));
    }

    /**
     * Obtains detail information about BIM360 rfi.
     * Requires 3-legged token.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/rfis-v2-rfis-id-GET/}.
     * @async
     * @param {string} containerId ID of container storing all rfis for a specific projects.
     * @param {string} rfiId RFI ID.
     * @returns {Promise<IRfi>} Rfi details.
    */
    async getRfiDetails(containerId: string, rifId: string): Promise<IRfi> {
        // TODO: support 'include', and 'fields' params
        const headers = { 'Content-Type': 'application/json' };
        const response = await this.get(`bim360/rfis/v2/containers/${encodeURIComponent(containerId)}/rfis/${encodeURIComponent(rifId)}`, headers, ReadTokenScopes);
        return response;
    }


    /**
     * Obtains comments of  BIM360 rfi.
     * Requires 3-legged token.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/rfis-v2-comments-GET/}.
     * @async
     * @param {string} containerId ID of container storing all rfis for a specific projects.
     * @param {string} rfiId RFI ID.
     * @returns {Promise<IRfi>} Rfi details.
    */
    async getRfiComments(containerId: string, rifId: string): Promise<IRfi> {
        const headers = { 'Content-Type': 'application/json' };
        const response = await this.get(`bim360/rfis/v2/containers/${encodeURIComponent(containerId)}/rfis/${encodeURIComponent(rifId)}/comments`, headers, ReadTokenScopes);
        return response.results;
    }

    /**
     * Obtains attachments of  BIM360 rfi.
     * Requires 3-legged token.
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/rfis-v2-attachments-GET/}.
     * @async
     * @param {string} containerId ID of container storing all rfis for a specific projects.
     * @param {string} rfiId RFI ID.
     * @returns {Promise<IRfi>} Rfi details.
    */
    async getRfiAttachments(containerId: string, rifId: string): Promise<IRfi> {
        const headers = { 'Content-Type': 'application/json' };
        const response = await this.get(`bim360/rfis/v2/containers/${encodeURIComponent(containerId)}/rfis/${encodeURIComponent(rifId)}/attachments`, headers, ReadTokenScopes);
        return response.results;
    }


    
/**
     * Lists all users in BIM 360 project, or just users matching specific criteria. 3LO is supported
     * {@link https://forge.autodesk.com/en/docs/bim360/v1/reference/http/admin-v1-projects-projectId-users-GET/}.
     * @async
     * @param {string} projectId The account ID of the users. This corresponds to project ID in the Data Management API. To convert a project ID into an prject ID you need to remove the “b.” prefix. For example, a project ID of b.c8b0c73d-3ae9 translates to an project ID of c8b0c73d-3ae9.
     * @returns {Promise<IUser[]>} List of users.
     */
    async listProjectUsers(projectId: string, filter?: IUserFilter): Promise<IProjectUser[]> {
        let url = `bim360/admin/v1/projects/${encodeURIComponent(projectId)}/users`
        if (filter) {
            url += `?limit=${PageSize}`;
            for (const key of Object.keys(filter)) {
                url += `&${key}=${(filter as any)[key]}`;
            }
        } else {
            url += `?limit=${PageSize}`;
        }
        let results: IProjectUser[] = [];
        let offset = 0;
        let response = await this.get(url, {}, ReadTokenScopes);
        while (response.results.length) {
            console.log(response.results.length);
            results = results.concat(response.results);
            offset += PageSize;
            response = await this.get(url + `&offset=${offset}`, {}, ReadTokenScopes);
        }
        return results.map((result: any) => Object.assign(result, { email: result.email }));

         //return results;
    }

    // #endregion
}
