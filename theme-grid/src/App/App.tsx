import "./App.css";
import logo from "./logo.svg";
import myimg from "./myimg.png";
import { OidcProvider, useOidc, getKeycloakAccountUrl } from "./oidc";
import { Button, buttonVariants  } from './components/ui/button'
import { cn } from "./lib/utils"
export default function App() {
    return (
        // To integrate Keycloak to your React App you have many options such as:  
        // - https://www.npmjs.com/package/keycloak-js  
        // - https://github.com/authts/oidc-client-ts
        // - https://github.com/authts/react-oidc-context  
        // In this starter we use oidc-spa instead
        // It's a new library made by us, the Keycloakify team.  
        // Check it out: https://github.com/keycloakify/oidc-spa
        <OidcProvider>
            <ContextualizedApp />
        </OidcProvider>
    );
}

function ContextualizedApp() {

    const { isUserLoggedIn, login, logout, oidcTokens } = useOidc();

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <a
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8"
          )}
        >
          <>
            Back
          </>
        </a>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
          <div className={cn("grid gap-6")}>
      <form >
        <div className="grid gap-2">
          <div className="grid gap-1">
            {/* <Label className="sr-only" htmlFor="email">
              Email
            </Label> */}
          </div>
          <button className={cn(buttonVariants())} >
            Sign In with Email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        Github
      </button>
    </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <a
              href="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </a>
          </p>
        </div>
      </div>
    );

}

function Jwt(){

    const { oidcTokens } = useOidc({
        assertUserLoggedIn: true
    });

    // NOTE: Use `Bearer ${oidcTokens.accessToken}` as the Authorization header to call your backend
    // Here we just display the decoded id token

    return (
        <pre style={{ textAlign: "left" }}>
            {JSON.stringify(oidcTokens.decodedIdToken, null, 2)}
        </pre>
    );

}

