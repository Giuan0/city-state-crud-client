interface EnvironmentConfigurations {
    production: boolean;
    apiEndpoint: string;
}
export const environment: EnvironmentConfigurations = {
    apiEndpoint: 'http://192.168.1.8:3000',
    production: false
};
