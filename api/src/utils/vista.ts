

const VistaClient: any = require('@vista.io/vista-api-client');

const VISTA_API_KEY = 'IZtgnWFVLMdpJ/4FL4JRDDjsNTmqN+7llhEEH8Vlh3I=';
const client = new VistaClient(VISTA_API_KEY, 'test', 'http://localhost:8080');

export default client
