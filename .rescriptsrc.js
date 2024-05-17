const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const { name, dependencies: deps } = require('./package.json')

const addPlugins = (config) => {
    config.plugins.unshift(
        new ModuleFederationPlugin({
            name,
            shared: {
                ...deps,
                react: {
                    eager:true,
                    requiredVersion: deps["react"],
                    singleton:true,
                },
                'react-router-dom': {
                    eager:true,
                    requiredVersion: deps["react"],
                    singleton:true,
                },
            },
            filename: 'remoteEntry.js',
            exposes: {
                "./messenger-component": "./src/components/Messenger/Messenger",
            },
            remotes: {},
        })
    )
    return config
}

module.exports = [
    (config) => {
        const mode = process.env.NODE_ENV || 'development'
        let publicPath = ''
        publicPath = `//${process.env.HOST}:${process.env.PORT}/`
        config.output.publicPath = publicPath
        config.mode = mode

        return addPlugins(config)
    },
]
