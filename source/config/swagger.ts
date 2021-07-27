export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST FULL',
            version: '1.0.0',
            description: 'Esqueleto basico de API REST FULL con TypeScript',
            contact: {
                name: 'ISC juan jesus castillo monjaraz'
            }
        },
        servers: [
            {
                url: 'https://localhost:1337'
            }
        ]
    },
    apis: ['./source/routes/*.ts']
};
