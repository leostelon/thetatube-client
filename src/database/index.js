const { Polybase } = require("@polybase/client");

export const db = new Polybase({
	defaultNamespace: process.env.REACT_APP_POLYBASE_NAMESPACE,
});
