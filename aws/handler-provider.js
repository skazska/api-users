module.exports.apiGwProxy = function (methods) {
    return async function handler (event, context, callback) {
        //console.log('Received event:', JSON.stringify(event, null, 2));

        const done = (err, res) => callback(null, {
            statusCode: err ? (err.code || '500') : '200',
            body: err ? err.message : JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let result = null;

        try {
            result = await methods.list();
        } catch (e) {
            return done(e);
        }

        done(null, result);
    };
};