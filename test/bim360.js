const assert = require('assert');
const { BIM360Client } = require('..');
const { FORGE_3LEGGED_ACCESS_TOKEN, FORGE_HUB_ID, FORGE_PROJECT_ID } = process.env;

/*

Due to the 3-legged token requirement, this test is NOT included in the CI/CD pipeline.
In order to run this test manually, run it from command line with the env. variables
listed at the top of this file.

For example:

```
export FORGE_3LEGGED_ACCESS_TOKEN=<your 3-legged token>
export FORGE_HUB_ID=<your hub ID>
export FORGE_PROJECT_ID=<your project ID>
npx mocha test/bim360.js
```

*/

if (FORGE_3LEGGED_ACCESS_TOKEN && FORGE_HUB_ID && FORGE_PROJECT_ID) {
    describe('BIM360Client', function() {
        beforeEach(function() {
            this.client = new BIM360Client({ token: FORGE_3LEGGED_ACCESS_TOKEN });
        });

        describe('listHubs()', function() {
            it('should return a list of hubs', async function() {
                const hubs = await this.client.listHubs();
                assert(hubs.length > 0);
            });
        });

        describe('getHubDetails()', function() {
            it('should return hub details', async function() {
                const details = await this.client.getHubDetails(FORGE_HUB_ID);
                assert(details);
            });
        });

        describe('listProjects()', function() {
            it('should return a list of projects', async function() {
                const projects = await this.client.listProjects(FORGE_HUB_ID);
                assert(projects.length > 0);
            });
        });

        describe('getProjectDetails()', function() {
            it('should return a list of projects', async function() {
                const details = await this.client.getProjectDetails(FORGE_HUB_ID, FORGE_PROJECT_ID);
                assert(details);
            });
        });

        var rfi_container_id = null;
        describe('getRfiContainerID()', function() {
            it('should return a rfi containter id of project', async function() {
                rfi_container_id = await this.client.getRfiContainerID(FORGE_HUB_ID,FORGE_PROJECT_ID);
                console.log(rfi_container_id);
                assert(rfi_container_id!=null);
            });
        });


        var project_id_without_b = FORGE_PROJECT_ID.split('b.')[1];
        describe('listProjectUsers()', function() {
            it('should return a list of project users', async function() {
                const users = await this.client.listProjectUsers(project_id_without_b);
                console(users);
                console(users[0].email);


                assert(users.length>0);
            });
        });

        var rfiId = null;
        describe('listRfis()', function() {
            it('should return a list of rfis', async function() {
                const rfis = await this.client.listRfis(rfi_container_id);
                rfiId = rfis[0].id;
                console.log(rfiId); 
                console.log(rfis.length); 

                assert(rfis.length>0);
            });
        });

        describe('getRfiDetails()', function() {
            it('should return detail of a rfi', async function() {
                const rfi_detail = await this.client.getRfiDetails(rfi_container_id,rfiId);
                console.log(rfi_detail.status);
                console.log(rfi_detail.assignedTo);
                console.log(rfi_detail.linkedDocument);
                console.log(rfi_detail.attachmentsCount);
                console.log(rfi_detail.commentsCount);
                console.log(rfi_detail.permittedActions.updateRfi.permittedStatuses[0].status);


                assert(rfi_detail.status !=null);
            });
        });

        describe('getRfiComments()', function() {
            it('should return comments of a rfi', async function() {
                const rfi_comments = await this.client.getRfiComments(rfi_container_id,rfiId);
                console.log(rfi_comments.length);   
                assert(rfi_comments.length==0 || rfi_comments.length>0);
            });
        });

        describe('getRfiAttachments()', function() {
            it('should return attachments of a rfi', async function() {
                const rfi_attachments = await this.client.getRfiAttachments(rfi_container_id,rfiId);
                console.log(rfi_attachments.length);   
                assert(rfi_attachments.length==0 || rfi_attachments.length>0);
            });
        });

    });
}
