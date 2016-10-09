cmd2app
=================

```js
/* Meta for cmd2app. */
window.metaJSON = {
    repository: 'https://github.com/gomeplusFED/meixin-h5-proxy',
    title: '美信H5 CDN代理模块',
    bin: ['proxy', 'test'],
    globalOptions: {
        dir: {
            desc: 'the catalog to be proxyed'
        },
        port: {
            desc: 'http portal, default 80'
        },
        ports: {
            desc: 'https portal, default 443'
        },
        foreign: {
            desc: 'public dependencies path'
        },
        path: {
            desc: 'middle path,default /m/app/src'
        },
        raw: {
            desc: 'raw path'
        }
    },
    command: {
        new: {
            params: [{
                desc: 'repo address'
            }, {
                desc: 'local path'
            }],
            options: {
                con: {
                    desc: 'con desc'
                },
                abc: {
                    desc: 'abc desc'
                }
            },
            desc: 'this is test cmd'
        },
        test: {
            params: [{
                desc: 'test params'
            }],
            options: {
                dir: 'the catalog to be proxyed'
            },
            desc: '# create a new app with an official repo'
        }
    }
};
```