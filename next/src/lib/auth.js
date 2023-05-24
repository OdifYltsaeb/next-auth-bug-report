import CredentialsProvider from "next-auth/providers/credentials";
import axios from "../utils/axios";

const signIn = async function({ email, password }) {
    console.log('do we get here?!', email, password, process.env.STRAPI_URL);
    // const res = await axios.post(`${process.env.STRAPI_URL}/api/auth/local`, {
    //     identifier: email,
    //     password
    // }).then((r) => {
    //     return r.data;
    // }).catch((error) => {
    //     console.log('in CATCH', Object.keys(error), error.response.data.error);
    //     return
    // }).then((resp) => {
    //     console.log('finally')
    // });
    const res = await axios.post(`${process.env.STRAPI_URL}/api/auth/local`, {
        identifier: email,
        password
    });
    console.log('in signIn, returning RES');
    return res;
};

const authOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "Sign in with Email",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                /**
                 * This function is used to define if the user is authenticated or not.
                 * If authenticated, the function should return an object contains the user data.
                 * If not, the function should return `null`.
                 */
                if (credentials == null) return null;
                /**
                 * credentials is defined in the config above.
                 * We can expect it contains two properties: `email` and `password`
                 */
                console.log('IN authorize credentials', credentials);
                try {
                    console.log('Trying')
                    const { user, jwt } = await signIn({
                        email: credentials.email,
                        password: credentials.password
                    });
                    return { ...user, jwt };
                } catch (error) {
                    console.log('FAIL!', Object.keys(error));
                    // Sign In Fail
                    return null;
                }
            }
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            console.log('in Session callback', session, token);
            session.id = token.id;
            session.jwt = token.jwt;
            return Promise.resolve(session);
        },
        jwt: async ({ token, user }) => {
            console.log('In JWT callback', token, user);
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.id = user.id;
                token.jwt = user.jwt;
            }
            return Promise.resolve(token);
        }
    }
};

export { authOptions, signIn };
