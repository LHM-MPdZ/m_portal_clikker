const apiUtils = {
    getClientConfig: function () {
        return {
            basePath: process.env.API_BASE_BATH
            // baseOptions: {
            //     "headers": {
            //         'Authorization': `Bearer ${token}`,
            //     }
            // }
        }
    }
}


export default apiUtils